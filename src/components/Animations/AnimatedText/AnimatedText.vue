<template>
  <div :class="[$style.wrapper]">
    <slot
      v-if="$slots.icon"
      :styles="
        disabled
          ? ''
          : [
              $style.icon,
              isDarkMode ? $style['icon-dark-mode'] : $style['icon-light-mode']
            ]
      "
      name="icon"
    />
    <div v-if="text" :class="$style['text-wrapper']">
      <span
        v-for="(char, index) in splitedText"
        :key="index"
        :class="[
          { [$style.char]: !disabled, [$style['empty-char']]: char === ' ' }
        ]"
        :style="{ animationDelay: `${index * 50}ms` }"
      >
        {{ char }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, toRefs, withDefaults } from 'vue';
import useDarkMode from '@/hooks/useDarkMode';

interface Props {
  text: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), { disabled: false });

const { text, disabled } = toRefs(props);

const { isDarkMode } = useDarkMode();

const splitedText = computed(() => {
  return text.value.split('');
});
</script>

<style lang="scss" module>
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
  @apply flex items-center justify-center animate-fade-out;
}

.only-one-element {
  @apply gap-0;
}

.text-wrapper {
  @apply flex ml-2;
}

.char {
  animation: showItem 400ms linear forwards;
}

.empty-char {
  @apply w-1;
}

.icon {
  animation: showIcon 400ms linear forwards;

  + div {
    @apply ml-2;
  }
}

.icon-light-mode {
  @apply text-gray-900;
}

.icon-dark-mode {
  @apply text-gray-900;
}
</style>
