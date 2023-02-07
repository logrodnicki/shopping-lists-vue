<template>
  <div :class="[$style.wrapper, isDarkMode ? 'bg-dark-mode' : 'bg-gray-50']">
    <Header />
    <main :class="[$style.main]">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import useDarkMode from '@/hooks/useDarkMode';
import Header from '@/components/Header/Header.vue';

const { isDarkMode } = useDarkMode();
</script>

<style module>
.wrapper {
  @apply w-screen h-full min-h-screen flex justify-start items-center flex-col;
}

.main {
  @apply w-full max-w-screen-md h-main p-6 flex justify-center;
}
</style>
