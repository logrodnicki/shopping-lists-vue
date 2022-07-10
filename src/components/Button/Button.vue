<template>
  <button
    class="text-white h-8 w-full bg-orange-400 border-orange-500 rounded-md shadow-sm shadow-orange-300 transition duration-300 hover:bg-orange-500"
    @click="clickHandler"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  label: string;
}

interface Emits {
  (e: 'click'): void;
}

defineProps<Props>();

const emit = defineEmits<Emits>();

const clickHandler = () => emit('click');
</script>
