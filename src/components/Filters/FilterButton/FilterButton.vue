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

<script setup>
import { defineProps, defineEmits } from 'vue';
import useDarkMode from '@/hooks/useDarkMode';
import { FILTERS_TYPES } from '@/constants/filters';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  selected: {
    type: Boolean,
    required: true
  },
  type: {
    validator(value) {
      return Object.values(FILTERS_TYPES).includes(value);
    },
    required: true
  }
});

const emit = defineEmits(['select']);

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
