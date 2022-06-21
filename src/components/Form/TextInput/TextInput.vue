<template>
  <div class="my-4">
    <label
      v-if="label"
      :for="id"
      class="text-sm font-bold mb-4"
      :class="[isDarkMode ? 'text-orange-400' : 'text-gray-800']"
      >{{ label }}</label
    >
    <input
      :id="id"
      :value="modelValue"
      :type="type"
      class="border-2 w-full rounded-md border-gray-500 focus:border-orange-400 text-sm py-1 px-2 placeholder-gray-300 outline-none transition duration-300"
      :class="[isDarkMode ? 'bg-dark-mode text-orange-400' : 'bg-white text-gray-800']"
      :placeholder="placeholder"
      @change="changeHandler"
    />
    <div v-if="error" class="transition duration-300 text-red-500 text-xs h-4">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import useDarkMode from '@/hooks/useDarkMode';

defineProps({
  id: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  },
  type: {
    validator(value) {
      return ['text', 'password'].includes(value);
    },
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const { isDarkMode } = useDarkMode();

const changeHandler = event => emit('update:modelValue', event.target.value);
</script>
