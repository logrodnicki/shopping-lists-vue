<template>
  <div
    class="w-screen h-screen flex justify-center items-center flex-col"
    :class="[isDarkMode ? 'bg-dark-mode' : 'bg-gray-100']"
  >
    <Header />
    <main class="w-full max-w-screen-xl h-full p-6 flex justify-center">
      <slot></slot>
    </main>
  </div>
</template>

<script>
import { Header } from '@/components';
import useDarkMode from '@/hooks/useDarkMode';

export default {
  components: {
    Header
  },
  setup() {
    const { isDarkMode } = useDarkMode();

    return {
      isDarkMode
    };
  }
};
</script>
