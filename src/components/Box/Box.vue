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
    class="list-none"
    :class="[
      $style.wrapper,
      props.classes,
      isDarkMode ? $style['dark-mode'] : $style['light-mode']
    ]"
  >
    <slot></slot>
  </li>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';
import useDarkMode from '@/hooks/useDarkMode';

interface Props {
  listElement?: boolean;
  classes?: string;
}

const props = withDefaults(defineProps<Props>(), {
  listElement: false,
  classes: ''
});

const { isDarkMode } = useDarkMode();
</script>

<style module>
.wrapper {
  @apply rounded-md px-3 animate-fade-out;
}

.light-mode {
  @apply bg-white shadow-md;
}

.dark-mode {
  @apply bg-mine-shaft;
}
</style>
