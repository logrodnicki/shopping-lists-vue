<template>
  <div :class="[$style.wrapper]">
    <Header />
    <main :class="[$style.main]">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
import useDarkMode from '@/hooks/useDarkMode';
import Header from '@/components/Header/Header.vue';

const { isDarkMode } = useDarkMode();
</script>

<style module>
.wrapper {
  @apply h-full min-h-screen flex justify-start items-center flex-col bg-gray-50 dark:bg-dark-mode;
}

.main {
  @apply w-full max-w-screen-md h-main flex justify-center flex-grow relative overflow-x-hidden;
}
</style>
