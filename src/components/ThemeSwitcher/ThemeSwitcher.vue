<template>
  <button :class="[$style.button]" @click="toggleDarkMode">
    <span :class="[$style.icon, $style['left-icon']]">
      <font-awesome-icon icon="sun" size="md" />
    </span>
    <span :class="[$style.icon, $style['right-icon']]">
      <font-awesome-icon icon="moon" size="md" />
    </span>
    <span :class="[$style.dot, { 'translate-x-full': isDarkMode }]" />
  </button>
</template>

<script setup lang="ts">
import useDarkMode from '@/hooks/useDarkMode';

const { isDarkMode, toggleDarkMode } = useDarkMode();
</script>

<style module>
.button {
  @apply border-2 border-orange-400 rounded-3xl h-8 w-14 p-0.5 relative flex;
}

.icon {
  @apply text-orange-400 absolute;
}

.left-icon {
  @apply left-2;
}

.right-icon {
  @apply right-2;
}

.dot {
  @apply rounded-full h-6 w-6 bg-orange-400 transition duration-300;
}
</style>
