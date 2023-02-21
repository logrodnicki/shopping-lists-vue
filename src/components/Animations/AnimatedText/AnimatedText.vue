<template>
  <div :class="[$style.wrapper]">
    <slot v-if="$slots.icon" :styles="disabled ? '' : $style.icon" name="icon">
    </slot>
    <div :class="$style['text-wrapper']">
      <span
        v-for="(char, index) in text"
        :key="index"
        :class="[{ [$style.char]: !disabled }]"
        :style="{ animationDelay: `${index * 50}ms` }"
      >
        {{ char }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, toRefs, withDefaults } from 'vue';

interface Props {
  text: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), { disabled: false });

const { text, disabled } = toRefs(props);
</script>

<style module>
@keyframes showItem {
  0% {
    opacity: 0;
    transform: translateY(5px);
  }

  50% {
    opacity: 0.5;
    transform: translateY(-5px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes showIcon {
  0% {
    opacity: 0;
    transform: translateY(5px) scale(0.85);
  }

  50% {
    opacity: 0.5;
    transform: translateY(-5px) scale(1.15);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.wrapper {
  @apply flex items-center gap-2 animate-fade-out;
}

.text-wrapper {
  @apply flex;
}

.char {
  animation: showItem 400ms linear forwards;
}

.icon {
  animation: showIcon 400ms linear forwards;
}
</style>
