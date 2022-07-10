<template>
  <label class="cursor-pointer relative h-5 w-5 flex items-center justify-center">
    <input type="checkbox" :checked="checked" class="invisible" />
    <div
      class="h-5 w-5 border-2 border-orange-400 rounded-full absolute top-0 flex items-center justify-center"
      :class="[checked ? 'bg-orange-400' : 'bg-white']"
    >
      <div class="flex items-center" :class="[isDarkMode ? 'text-black' : 'text-white']">
        <font-awesome-icon icon="check" size="xs" />
      </div>
    </div>
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
