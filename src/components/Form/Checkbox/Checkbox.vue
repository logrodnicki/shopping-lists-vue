<template>
  <label :class="[$style.label]">
    <input type="checkbox" :checked="checked" class="invisible" />
    <span :class="[$style.wrapper, checked ? 'bg-orange-400' : 'bg-white']">
      <span
        v-if="checked"
        class=""
        :class="[isDarkMode ? 'text-black' : 'text-white']"
      >
        <font-awesome-icon icon="check" size="xs" />
      </span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import useDarkMode from '@/hooks/useDarkMode';

interface Props {
  checked: boolean;
}

defineProps<Props>();

const { isDarkMode } = useDarkMode();
</script>

<style module>
.label {
  @apply cursor-pointer relative h-5 w-5 flex items-center justify-center;
}

.wrapper {
  @apply h-5 w-5 border-2 border-orange-400 rounded-full absolute top-0 flex items-center justify-center transition duration-300;
}

.content {
  @apply flex items-center animate-scale;
}
</style>
