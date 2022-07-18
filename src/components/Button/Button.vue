<template>
  <button
    class="text-white h-8 w-full bg-orange-400 border-orange-500 rounded-md shadow-sm shadow-orange-300 transition duration-300 hover:bg-orange-500"
    @click="clickHandler"
  >
    <span v-if="!showLoader">{{ label }}</span>
    <Loader v-else :is-loading="showLoader" :color="LoaderColors.GRAY" />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue';
import Loader from '@/components/Loader/Loader.vue';
import { LoaderColors } from '@/types/loader';

interface Props {
  label: string;
  showLoader?: boolean;
}

interface Emits {
  (e: 'click'): void;
}

withDefaults(defineProps<Props>(), {
  showLoader: false
});

const emit = defineEmits<Emits>();

const clickHandler = () => emit('click');
</script>
