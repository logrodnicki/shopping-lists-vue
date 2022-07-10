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

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import useDarkMode from '@/hooks/useDarkMode';
import { FiltersTypes } from '@/types';

interface Props {
  label: string;
  selected: boolean;
  type: FiltersTypes;
}

interface Emits {
  (e: 'select', type: FiltersTypes): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const { isDarkMode } = useDarkMode();

const selectHandler = () => emit('select', props.type);
</script>

<style module>
.wrapper {
  @apply border-2 border-orange-400 rounded-md px-4 text-orange-400 transition duration-300 bg-white;
}

.selected {
  @apply bg-orange-400 text-white;
}

.dark-mode {
  @apply bg-dark-mode border-gray-500 text-gray-500;
}

.selected-dark-mode {
  @apply border-orange-400 text-orange-400;
}
</style>
