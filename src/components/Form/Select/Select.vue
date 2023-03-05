<template>
  <div ref="wrapperRef" :class="[$style.wrapper, wrapperClasses]">
    <label
      v-if="label"
      :class="[
        $style.label,
        isDarkMode ? $style['label-dark-mode'] : $style['label-light-mode']
      ]"
    >
      {{ label }}
    </label>
    <div
      :class="[
        $style['value-wrapper'],
        isDarkMode
          ? $style['value-wrapper-dark-mode']
          : $style['value-wrapper-light-mode']
      ]"
    >
      <span
        v-if="!isMenuDisplayed"
        :class="[
          $style['displayed-value'],
          isDarkMode
            ? $style['displayed-value-dark-mode']
            : $style['displayed-value-light-mode']
        ]"
        @click="toggleMenuHandler"
        >{{ modelValue }}</span
      >
      <input
        ref="inputRef"
        :class="[
          $style.input,
          isDarkMode ? $style['input-dark-mode'] : $style['input-light-mode']
        ]"
        :disabled="props.disabled"
        :value="searchValue"
        type="text"
        @input="setSearchValueHandler"
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
          v-for="{ label: itemLabel, value } in filteredItems"
          :key="value"
          :class="[$style['menu-item']]"
          @click="selectValueHandler(value)"
        >
          {{ itemLabel }}
        </li>
        <li v-if="filteredItems.length === 0" :class="$style['empty-list']">
          No matches
        </li>
      </ul>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  defineEmits,
  defineProps,
  onMounted,
  ref,
  toRefs,
  watch
} from 'vue';
import { SelectItem } from '@/types/select';
import useDarkMode from '@/hooks/useDarkMode';
import { onClickOutside } from '@vueuse/core';

interface Props {
  items: SelectItem[];
  modelValue: string | number;
  disabled?: boolean;
  wrapperClasses?: string;
  label?: string;
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

const { disabled, items, wrapperClasses, label } = toRefs(props);

const { isDarkMode } = useDarkMode();

const searchValue = ref<string>('');
const isMenuDisplayed = ref(false);
const menuStyles = ref(defaultMenuStyles);
const wrapperRef = ref<HTMLDivElement>();
const inputRef = ref<HTMLInputElement>();

onMounted(() => {
  menuStyles.value = {
    ...menuStyles.value,
    width: `${Number(wrapperRef?.value?.clientWidth)}px`
  };
});

watch(isMenuDisplayed, (value: boolean) => {
  if (!value) {
    return;
  }

  inputRef.value?.focus();
});

const filteredItems = computed((): SelectItem[] => {
  if (!searchValue.value) {
    return items.value;
  }

  return items.value.filter(item =>
    item.label.toUpperCase().includes(String(searchValue).toUpperCase())
  );
});

const toggleMenuHandler = () => {
  if (disabled?.value) {
    isMenuDisplayed.value = false;
    return;
  }

  searchValue.value = '';
  isMenuDisplayed.value = true;

  const wrapperDimensions = wrapperRef?.value?.getBoundingClientRect();

  if (!wrapperDimensions) {
    return;
  }

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

onClickOutside(wrapperRef, () => closeHandler());
</script>

<style module>
.wrapper {
  @apply relative flex flex-col gap-2;
}

.value-wrapper {
  @apply w-full flex items-center gap-2 text-sm rounded-xl transition duration-300;
}

.value-wrapper-light-mode {
  @apply bg-white text-gray-800;
}

.value-wrapper-dark-mode {
  @apply bg-dark-mode text-white;
}

.input {
  @apply outline-none text-gray-500 max-w-full w-0 flex-grow transition duration-300 px-2 py-1.5 h-8 border-2 rounded-xl focus:border-orange-400 disabled:bg-gray-400 disabled:border-gray-600 disabled:text-gray-700;
}

.input-dark-mode {
  @apply bg-dark-mode text-orange-400 border-gray-cod;
}

.input-light-mode {
  @apply bg-white text-gray-800;
}

.menu {
  @apply fixed z-10 top-0 w-full mt-1 rounded-xl border-2 border-gray-500 animate-fade-out shadow-md;
}

.menu-dark-mode {
  @apply bg-mine-shaft text-white border-gray-cod;
}

.menu-light-mode {
  @apply bg-white text-gray-800 border-gray-200;
}

.menu-item {
  @apply text-sm cursor-pointer p-1.5 hover:bg-gray-cod;
}

.displayed-value {
  @apply animate-fade-out text-center w-full h-full flex-grow flex items-center justify-center absolute left-0 capitalize rounded-xl h-8 border-2 truncate;
}

.displayed-value-light-mode {
  @apply bg-white text-gray-900 border-gray-300;
}

.displayed-value-dark-mode {
  @apply bg-dark-mode text-white border-gray-cod;
}

.empty-list {
  @apply text-xs animate-fade-out text-center py-2;
}

.label {
  @apply text-sm font-bold;
}

.label-light-mode {
  @apply text-gray-900;
}

.label-dark-mode {
  @apply text-white;
}
</style>
