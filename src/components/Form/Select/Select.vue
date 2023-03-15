<template>
  <div ref="wrapperRef" :class="[$style.wrapper, wrapperClasses]">
    <label v-if="label" :class="[$style.label]">
      {{ label }}
    </label>
    <div ref="inputWrapperRef" :class="[$style['value-wrapper']]">
      <span
        v-if="!isMenuDisplayed"
        :class="[$style['displayed-value']]"
        @click="toggleMenuHandler"
        >{{ modelValue }}</span
      >
      <input
        ref="inputRef"
        :class="[$style.input]"
        :disabled="props.disabled"
        :value="searchValue"
        type="text"
        @input="setSearchValueHandler"
      />
    </div>
    <Teleport to="#modals">
      <ul
        v-if="isMenuDisplayed"
        ref="menuRef"
        :class="[$style.menu]"
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
  nextTick,
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
const inputWrapperRef = ref<HTMLInputElement>();
const menuRef = ref<HTMLUListElement>();

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

  nextTick(() => {
    const wrapperDimensions = inputWrapperRef?.value?.getBoundingClientRect();
    const menuDimensions = menuRef?.value?.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (!wrapperDimensions) {
      return;
    }

    let topPosition =
      Number(wrapperDimensions.top) + Number(wrapperDimensions.height);

    if (menuDimensions && topPosition + menuDimensions.height > windowHeight) {
      topPosition = wrapperDimensions.top - menuDimensions.height - 10;
    }

    menuStyles.value = {
      ...menuStyles.value,
      top: `${topPosition}px`,
      left: `${Number(wrapperDimensions.left)}px`
    };
  });
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
  @apply w-full flex items-center gap-2 text-sm rounded-xl transition duration-300 bg-white text-gray-800 dark:bg-dark-mode dark:text-white;
}

.input {
  @apply outline-none text-gray-500 max-w-full w-0 flex-grow transition duration-300 px-2 py-1.5 h-8 border-2 rounded-xl focus:border-lime-400 disabled:bg-gray-400 disabled:border-gray-600 disabled:text-gray-700 bg-white text-gray-800  dark:bg-dark-mode dark:text-lime-400 dark:border-gray-cod;
}

.menu {
  @apply p-1 fixed z-10 top-0 w-full mt-1 rounded-xl border-2 border-lime-400 animate-fade-out shadow-md bg-white text-gray-800 dark:bg-mine-shaft dark:text-white dark:border-gray-cod;
}

.menu-item {
  @apply text-sm cursor-pointer rounded-xl p-1.5 hover:bg-lime-400;
}

.displayed-value {
  @apply animate-fade-out transition duration-300 text-center w-full h-full flex-grow flex items-center justify-center absolute left-0 capitalize rounded-xl h-8 border-2 truncate bg-white text-gray-900 border-gray-300 dark:bg-dark-mode dark:text-white dark:border-gray-cod;
}

.empty-list {
  @apply text-xs animate-fade-out text-center py-2;
}

.label {
  @apply text-sm font-bold transition duration-300 text-gray-900 dark:text-white;
}
</style>
