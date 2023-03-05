<template>
  <div
    v-if="!props.listElement"
    :class="[
      $style.wrapper,
      props.classes,
      isDarkMode ? $style['dark-mode'] : $style['light-mode']
    ]"
  >
    <slot></slot>
  </div>
  <li
    v-else
    :class="[
      $style.wrapper,
      props.classes,
      isDarkMode ? $style['dark-mode'] : $style['light-mode']
    ]"
    class="list-none"
  >
    <slot></slot>
  </li>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
import useDarkMode from '@/hooks/useDarkMode';

interface Props {
  listElement?: boolean;
  classes?: string | string[];
}

const props = withDefaults(defineProps<Props>(), {
  listElement: false,
  classes: ''
});

const { isDarkMode } = useDarkMode();
</script>

<style module>
.wrapper {
  @apply rounded-xl p-4 transition duration-300;
}

.light-mode {
  @apply bg-white shadow-md;
}

.dark-mode {
  @apply bg-mine-shaft;
}
</style>
