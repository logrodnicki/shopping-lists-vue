<template>
  <button
    :class="[
      $style.button,
      isDarkMode ? $style['dark-mode'] : $style['light-mode']
    ]"
    aria-label="Theme Switcher"
    @click="toggleDarkMode"
  >
    <span :class="[$style.icon, $style['left-icon']]">
      <font-awesome-icon icon="sun" size="md" />
    </span>
    <span :class="[$style.icon, $style['right-icon']]">
      <font-awesome-icon icon="moon" size="md" />
    </span>
    <span :class="[$style.dot, { 'translate-x-full': isDarkMode }]" />
  </button>
</template>

<script lang="ts" setup>
import useDarkMode from '@/hooks/useDarkMode';

const { isDarkMode, toggleDarkMode } = useDarkMode();
</script>

<style module>
.button {
  @apply border-2 border-lime-500 rounded-3xl h-8 w-14 p-0.5 relative flex;
}

.light-mode {
  @apply bg-white;
}

.dark-mode {
  @apply bg-dark-mode;
}

.icon {
  @apply text-lime-500 absolute;
}

.left-icon {
  @apply left-2;
}

.right-icon {
  @apply right-2;
}

.dot {
  @apply rounded-full h-6 w-6 bg-lime-500 transition duration-300;
}
</style>
