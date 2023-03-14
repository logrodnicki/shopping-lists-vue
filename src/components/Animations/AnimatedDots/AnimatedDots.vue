<template>
  <div :class="$style.wrapper">
    <div
      v-for="{ classes, id } in dots"
      :key="id"
      :class="[
        $style.dot,
        isDarkMode ? $style['dot-dark-mode'] : $style['dot-dark-mode'],
        $style[classes],
        { [$style['dot-disabled']]: disabled }
      ]"
    />
  </div>
</template>

<script lang="ts" setup>
import useDarkMode from '@/hooks/useDarkMode';
import { toRefs, defineProps } from 'vue';

interface Props {
  disabled?: boolean;
}

interface Dot {
  classes: string | string[];
  id: number;
}

const props = defineProps<Props>();

const { disabled } = toRefs(props);

const { isDarkMode } = useDarkMode();

const dots: Dot[] = [
  {
    classes: 'first-dot',
    id: 1
  },
  {
    classes: 'second-dot',
    id: 2
  },
  {
    classes: 'third-dot',
    id: 3
  }
];
</script>

<style module>
@keyframes dotMove {
  25% {
    transform: translateY(-5px);
  }

  75% {
    transform: translateY(5px);
  }

  100% {
    transform: translateY(0);
  }
}

.wrapper {
  @apply flex gap-1 animate-fade-out;
}

.dot {
  @apply h-2 w-2 rounded;
}

.dot-light-mode {
  @apply bg-gray-900;
}

.dot-dark-mode {
  @apply bg-lime-400;
}

.dot-disabled {
  @apply bg-gray-900;
}

.first-dot {
  animation: dotMove 600ms linear infinite;
}

.second-dot {
  animation: dotMove 600ms 200ms linear infinite;
}

.third-dot {
  animation: dotMove 600ms 400ms linear infinite;
}
</style>
