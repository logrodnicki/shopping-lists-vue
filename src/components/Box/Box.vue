<template>
  <div v-if="!props.listElement" :class="[$style.wrapper, props.classes]">
    <slot />
  </div>
  <li v-else :class="[$style.wrapper, props.classes]" class="list-none">
    <slot />
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
  @apply rounded-xl p-4 transition duration-300 bg-white shadow-md dark:bg-mine-shaft dark:shadow-none;
}
</style>
