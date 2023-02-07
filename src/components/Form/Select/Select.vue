<template>
  <div ref="wrapperRef" v-click-outside="closeHandler" class="relative">
    <div
      :class="[
        $style['value-wrapper'],
        isDarkMode
          ? $style['value-wrapper-dark-mode']
          : $style['value-wrapper-light-mode']
      ]"
      @click="toggleMenuHandler"
    >
      <span v-if="modelValue" class="animate-fade-out">{{ modelValue }}</span>
      <input
        type="text"
        :value="searchValue"
        :class="[
          $style.input,
          isDarkMode ? $style['input-dark-mode'] : $style['input-light-mode']
        ]"
        :disabled="props.disabled"
        @change="setSearchValueHandler"
      />
    </div>
    <Teleport to="#modals">
      <ul
        v-if="isMenuDisplayed"
        :class="[
          $style.menu,
          isDarkMode ? $style['menu-dark-mode'] : $style['menu-light-mode']
        ]"
        :style="menuStyles"
      >
        <li
          v-for="{ label, value } in filteredItems"
          :key="value"
          :class="[$style['menu-item']]"
          @click="selectValueHandler(value)"
        >
          {{ label }}
        </li>
        <li v-if="filteredItems.length === 0" class="animate-fade-out">
          No matches
        </li>
      </ul>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, onMounted, ref } from 'vue';
import { SelectItem } from '@/types/select';
import useDarkMode from '@/hooks/useDarkMode';

interface Props {
  items: SelectItem[];
  modelValue: string | number;
  disabled?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void;
}

interface MenuStyles {
  width: string;
  top: string;
  left: string;
}

const defaultMenuStyles: MenuStyles = {
  left: '0px',
  top: '0px',
  width: '0px'
};

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const { isDarkMode } = useDarkMode();

const searchValue = ref<string>('');
const isMenuDisplayed = ref(false);
const wrapperRef = ref(null);
const menuStyles = ref(defaultMenuStyles);

onMounted(() => {
  menuStyles.value = {
    ...menuStyles.value,
    width: `${Number(wrapperRef?.value?.clientWidth)}px`
  };
});

const filteredItems = computed((): SelectItem[] => {
  if (!searchValue.value) {
    return props.items;
  }

  return props.items.filter(item => item.label.includes(String(searchValue)));
});

const toggleMenuHandler = () => {
  if (props.disabled) {
    isMenuDisplayed.value = false;
    return;
  }

  isMenuDisplayed.value = !isMenuDisplayed.value;

  const wrapperDimensions = wrapperRef?.value?.getBoundingClientRect();

  menuStyles.value = {
    ...menuStyles.value,
    top: `${
      Number(wrapperDimensions.top) + Number(wrapperDimensions.height)
    }px`,
    left: `${Number(wrapperDimensions.left)}px`
  };
};

const selectValueHandler = (value: string | number): void => {
  isMenuDisplayed.value = false;
  emit('update:modelValue', value);
};

const setSearchValueHandler = (event: any): void => {
  searchValue.value = (event.target as HTMLInputElement).value;
};

const closeHandler = (): void => {
  isMenuDisplayed.value = false;
};
</script>

<style module>
.value-wrapper {
  @apply flex items-center gap-2 border-2 rounded-md focus:border-orange-400 text-sm px-2 py-1.5 h-8 transition duration-300;
}

.value-wrapper-light-mode {
  @apply bg-white text-gray-800;
}

.value-wrapper-dark-mode {
  @apply bg-dark-mode text-white border-gray-cod;
}

.input {
  @apply outline-none text-gray-500 max-w-full w-0 flex-grow transition duration-300 disabled:bg-gray-400 disabled:border-gray-600 disabled:text-gray-700;
}

.input-dark-mode {
  @apply bg-dark-mode text-orange-400;
}

.input-light-mode {
  @apply bg-white text-gray-800;
}

.menu {
  @apply fixed z-10 top-0 w-full mt-1 rounded-md border-2 border-gray-500 animate-fade-out shadow-md;
}

.menu-dark-mode {
  @apply bg-mine-shaft text-white border-gray-cod;
}

.menu-light-mode {
  @apply bg-white text-gray-800 border-gray-200;
}

.menu-item {
  @apply cursor-pointer p-1.5 hover:bg-gray-cod;
}
</style>
