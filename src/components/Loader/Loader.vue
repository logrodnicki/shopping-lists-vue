<template>
  <div v-if="isLoading" :class="[$style.wrapper, colors[color]]">
    <span class="animate-spin">
      <font-awesome-icon icon="arrows-rotate" size="xl" />
    </span>
  </div>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { LoaderColors } from '@/types/loader';

const colors: Record<LoaderColors, string> = {
  [LoaderColors.ORANGE]: 'text-orange-400',
  [LoaderColors.GRAY]: 'text-gray-800'
};

interface Props {
  isLoading: boolean;
  color?: LoaderColors;
}

withDefaults(defineProps<Props>(), {
  color: LoaderColors.ORANGE
});
</script>

<style module>
.wrapper {
  @apply flex justify-center animate-fade-out;
}
</style>
