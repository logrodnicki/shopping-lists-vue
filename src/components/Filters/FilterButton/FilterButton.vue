<template>
  <button
    :class="[
      $style.wrapper,
      {
        [$style.selected]: selected,
        [$style['dark-mode']]: isDarkMode,
        [$style['selected-dark-mode']]: selected && isDarkMode
      }
    ]"
    @click="selectHandler"
  >
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import useDarkMode from '@/hooks/useDarkMode';
import { FiltersType } from '@/types';

interface Props {
  label: string;
  selected: boolean;
  type: FiltersType;
}

interface Emits {
  (e: 'select', type: FiltersType): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const { isDarkMode } = useDarkMode();

const selectHandler = () => emit('select', props.type);
</script>

<style module>
.wrapper {
  @apply border-2 border-orange-400 rounded-xl px-4 text-orange-400 transition duration-300 bg-white;
}

.selected {
  @apply bg-orange-400 text-white;
}

.dark-mode {
  @apply bg-dark-mode border-gray-500 text-gray-500;
}

.selected-dark-mode {
  @apply border-orange-400 bg-orange-400 text-dark-mode;
}
</style>
