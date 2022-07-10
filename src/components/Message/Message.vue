<template>
  <div
    class="p-1 rounded w-full animate-fade-out text-xs"
    :class="{
      'bg-red-200 border-2 border-red-400': type === MessageTypes.ERROR,
      'bg-periwinkle-blue border-2 border-cornflower-blue': type === MessageTypes.INFO
    }"
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
