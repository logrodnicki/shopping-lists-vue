<template>
  <div
    class="w-screen h-screen flex justify-center items-center flex-col"
    :class="[isDarkMode ? 'bg-dark-mode' : 'bg-gray-50']"
  >
    <Header />
    <main class="w-full max-w-screen-xl h-full p-6 flex justify-center">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import useDarkMode from '@/hooks/useDarkMode';
import Header from '@/components/Header/Header.vue';

const { isDarkMode } = useDarkMode();
</script>
