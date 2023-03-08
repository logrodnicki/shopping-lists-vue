<template>
  <div :class="[$style.wrapper]">
    <label
      v-if="label"
      :class="[$style.label, isDarkMode ? 'text-white' : 'text-gray-900']"
      :for="id"
      >{{ label }}</label
    >
    <input
      :id="id"
      :class="[
        $style.input,
        isDarkMode ? $style['input-dark-mode'] : $style['input-light-mode']
      ]"
      :disabled="props.disabled"
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      autocomplete="off"
      @change="changeHandler"
    />
    <div v-if="error" :class="[$style.error]">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, withDefaults } from 'vue';
import useDarkMode from '@/hooks/useDarkMode';
import { TextInputTypes } from '@/types';

interface Props {
  id: string;
  modelValue: string | number;
  type: TextInputTypes;
  placeholder: string;
  label?: string;
  error?: string;
  disabled?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

const props = withDefaults(defineProps<Props>(), { label: '', error: '' });

const emit = defineEmits<Emits>();

const { isDarkMode } = useDarkMode();

const changeHandler = (event: Event) =>
  emit('update:modelValue', (event.target as HTMLInputElement).value);
</script>

<style module>
.wrapper {
  @apply w-full flex flex-col gap-2;
}

.label {
  @apply text-sm font-bold;
}

.input {
  @apply border-2 w-full rounded-xl focus:border-lime-400 text-sm py-1 px-2 placeholder-gray-500 outline-none transition duration-300 disabled:bg-gray-400 disabled:border-gray-600 disabled:text-gray-700;
}

.input-dark-mode {
  @apply bg-dark-mode text-white border-gray-cod;
}

.input-light-mode {
  @apply bg-white text-gray-900 border-gray-300;
}

.error {
  @apply transition duration-300 text-red-500 text-xs h-4;
}
</style>
