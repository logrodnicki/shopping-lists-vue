<template>
  <button
    :class="[
      $style.wrapper,
      classes,
      {
        [$style['light-mode']]: !isDarkMode,
        [$style['dark-mode']]: isDarkMode,
        [$style.outline]: outline,
        [$style['outline-dark-mode']]: isDarkMode && outline,
        [$style['click-animation']]: clickAnimation
      }
    ]"
    :disabled="disabled"
    label="label"
    @click="clickHandler"
  >
    <div v-if="!showLoader" :class="[$style.loader]">
      <font-awesome-icon v-if="icon" :icon="icon" size="lg" />
      <span v-if="label">{{ label }}</span>
    </div>
    <Loader v-else :is-loading="showLoader" :color="LoaderColors.GRAY" />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, withDefaults, ref, onUnmounted } from 'vue';
import Loader from '@/components/Loader/Loader.vue';
import { LoaderColors } from '@/types/loader';
import useDarkMode from '@/hooks/useDarkMode';

interface Props {
  label?: string;
  showLoader?: boolean;
  icon?: string;
  disabled?: boolean;
  classes?: string;
  outline?: boolean;
}

interface Emits {
  (e: 'click'): void;
}

const clickAnimation = ref(false);

withDefaults(defineProps<Props>(), {
  showLoader: false,
  icon: '',
  disabled: false,
  label: '',
  classes: '',
  outline: false
});

const emit = defineEmits<Emits>();

const { isDarkMode } = useDarkMode();

let timeoutId: number;

const clickHandler = () => {
  emit('click');

  clickAnimation.value = true;

  timeoutId = setTimeout(() => {
    clickAnimation.value = false;
  }, 300);
};

onUnmounted(() => {
  clearInterval(timeoutId);
});
</script>

<style module>
.wrapper {
  @apply h-8 min-w-150 px-4 py-2 flex justify-center items-center border-2 rounded-md transition duration-300 disabled:bg-gray-400 disabled:border-gray-600;
}

.click-animation {
  @apply animate-click;
}

.light-mode {
  @apply text-gray-900 bg-orange-400 border-orange-400 shadow-sm shadow-orange-300 disabled:shadow-gray-600;
}

.dark-mode {
  @apply text-gray-900 bg-orange-400 border-orange-400 shadow-sm;
}

.outline {
  @apply text-gray-900 bg-orange-400;
}

.outline-dark-mode {
  @apply text-gray-900 bg-dark-mode text-orange-400;
}

.loader {
  @apply flex items-center gap-2;
}
</style>
