<template>
  <div
    :class="[
      $style.wrapper,
      {
        [$style.error]: type === MessageTypes.ERROR,
        [$style.info]: type === MessageTypes.INFO
      }
    ]"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { MessageTypes } from '@/types';

interface Props {
  message: string;
  type: MessageTypes;
}

const props = defineProps<Props>();
</script>

<style module>
.wrapper {
  @apply p-1 rounded w-full animate-fade-out text-xs;
}

.error {
  @apply bg-red-200 border-2 border-red-400;
}

.info {
  @apply bg-periwinkle-blue border-2 border-cornflower-blue;
}
</style>
