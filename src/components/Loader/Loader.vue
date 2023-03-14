<template>
  <div v-if="isLoading" :class="[$style.wrapper, colors[color]]">
    <AnimatedArrows v-if="icon === LoaderIcon.ARROWS" />
    <AnimatedDots v-if="icon === LoaderIcon.DOTS" :disabled="disabled" />
  </div>
  <template v-else>
    <slot />
  </template>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
import { LoaderColors, LoaderIcon } from '@/types/loader';
import AnimatedDots from '@/components/Animations/AnimatedDots/AnimatedDots.vue';
import AnimatedArrows from '@/components/Animations/AnimatedArrows/AnimatedArrows.vue';

const colors: Record<LoaderColors, string> = {
  [LoaderColors.ORANGE]: 'text-orange-400',
  [LoaderColors.GRAY]: 'text-gray-800'
};

interface Props {
  isLoading: boolean;
  color?: LoaderColors;
  icon?: LoaderIcon;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  color: LoaderColors.ORANGE,
  icon: LoaderIcon.ARROWS,
  disabled: false
});
</script>

<style module>
.wrapper {
  @apply flex justify-center animate-fade-out;
}
</style>
