<template>
  <button
    class="text-white h-8 w-full px-4 py-2 flex justify-center items-center bg-orange-400 border-orange-500 rounded-md transition duration-300 hover:bg-orange-500 disabled:bg-gray-400 disabled:border-gray-600"
    :class="[isDarkMode ? '' : 'shadow-sm shadow-orange-300 disabled:shadow-gray-600']"
    :disabled="disabled"
    label="label"
    @click="clickHandler"
  >
    <div
      v-if="!showLoader"
      class="flex items-center gap-2"
      :class="[isDarkMode ? 'text-gray-800' : 'text-white']"
    >
      <font-awesome-icon v-if="icon" :icon="icon" size="lg" />
      <span>{{ label }}</span>
    </div>
    <Loader v-else :is-loading="showLoader" :color="LoaderColors.GRAY" />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue';
import Loader from '@/components/Loader/Loader.vue';
import { LoaderColors } from '@/types/loader';
import useDarkMode from '@/hooks/useDarkMode';

interface Props {
  label: string;
  showLoader?: boolean;
  icon?: string;
  disabled?: boolean;
}

interface Emits {
  (e: 'click'): void;
}

withDefaults(defineProps<Props>(), {
  showLoader: false,
  icon: '',
  disabled: false
});

const emit = defineEmits<Emits>();

const { isDarkMode } = useDarkMode();

const clickHandler = () => emit('click');
</script>
