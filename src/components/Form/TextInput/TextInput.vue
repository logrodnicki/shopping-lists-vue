<template>
  <div :class="[$style.wrapper]">
    <label v-if="label" :class="[$style.label]" :for="id">{{ label }}</label>
    <input
      :id="id"
      :class="[$style.input, { [$style['empty-input']]: isEmpty }]"
      :disabled="disabled"
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
import { computed, defineEmits, defineProps, toRefs, withDefaults } from 'vue';
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
  highlightIfEmpty?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  error: '',
  highlightIfEmpty: false
});

const { highlightIfEmpty, disabled } = toRefs(props);

const emit = defineEmits<Emits>();

const { isDarkMode } = useDarkMode();

const isEmpty = computed(() => {
  return highlightIfEmpty.value && !props.modelValue;
});

const changeHandler = (event: Event) =>
  emit('update:modelValue', (event.target as HTMLInputElement).value);
</script>

<style module>
.wrapper {
  @apply w-full flex flex-col gap-2;
}

.label {
  @apply text-sm font-bold text-gray-900 dark:text-white;
}

.input {
  @apply border-2 w-full rounded-xl focus:border-lime-400 text-sm py-1 px-2 placeholder-gray-500 outline-none transition duration-300 disabled:bg-gray-400 disabled:border-gray-600 disabled:text-gray-700 bg-white text-gray-900 border-gray-300 dark:bg-dark-mode dark:text-white dark:border-gray-cod;
}

.error {
  @apply transition duration-300 text-red-500 text-xs h-4;
}

.empty-input {
  @apply border-red-500;
}
</style>
