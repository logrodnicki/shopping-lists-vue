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

<script lang="ts" setup>
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
  @apply p-1 rounded-xl w-full animate-fade-out text-xs border-2 transition duration-300;
}

.error {
  @apply bg-red-200 border-red-500 text-red-500;
}

.info {
  @apply bg-periwinkle-blue border-cornflower-blue;
}
</style>
