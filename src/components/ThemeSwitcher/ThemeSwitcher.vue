<template>
  <button
    class="border-2 border-orange-400 rounded-3xl h-8 w-14 p-0.5 relative flex"
    @click="toggleDarkMode"
  >
    <span class="text-orange-400 absolute left-2">
      <font-awesome-icon icon="sun" size="md" />
    </span>
    <span class="text-orange-400 absolute right-2">
      <font-awesome-icon icon="moon" size="md" />
    </span>
    <span
      class="rounded-full h-6 w-6 bg-orange-400 transition duration-300"
      :class="{ 'translate-x-full': isDarkMode }"
    />
  </button>
</template>

<script>
import useDarkMode from '@/hooks/useDarkMode';

export default {
  setup() {
    return {
      ...useDarkMode()
    };
  }
};
</script>
