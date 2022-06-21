<template>
  <button
    class="text-white h-8 w-full bg-orange-400 border-orange-500 rounded-md shadow-sm shadow-orange-300 transition duration-300 hover:bg-orange-500"
    @click="clickHandler"
  >
    {{ label }}
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  label: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['click']);

const clickHandler = () => emit('click');
</script>
