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
      class="border-2 w-full rounded-md border-gray-500 focus:border-orange-400 text-sm py-1 px-2 placeholder-gray-500 outline-none transition duration-300"
      :class="[isDarkMode ? 'bg-dark-mode text-orange-400' : 'bg-white text-gray-800']"
      :placeholder="placeholder"
      @change="changeHandler"
    />
    <div v-if="error" class="transition duration-300 text-red-500 text-xs h-4">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, withDefaults } from 'vue';
import useDarkMode from '@/hooks/useDarkMode';
import { TextInputTypes } from '@/types';

interface Props {
  id: string;
  modelValue: string;
  type: TextInputTypes;
  placeholder: string;
  label?: string;
  error?: string;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

withDefaults(defineProps<Props>(), { label: '', error: '' });

const emit = defineEmits<Emits>();

const { isDarkMode } = useDarkMode();

const changeHandler = (event: Event) =>
  emit('update:modelValue', (event.target as HTMLInputElement).value);
</script>
