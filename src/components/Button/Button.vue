<template>
  <button
    :class="[
      $style.wrapper,
      classes,
      {
        [$style.outline]: outline,
        [$style['click-animation']]: clickAnimation,
        [$style.disabled]: disabled
      }
    ]"
    @click="clickHandler"
  >
    <div v-if="!showLoader && !isPending" :class="[$style.content]">
      <AnimatedText :disabled="disabledPendingAnimation" :text="label">
        <template #icon>
          <font-awesome-icon v-if="icon" :icon="icon" size="md" />
        </template>
      </AnimatedText>
    </div>
    <div v-if="!showLoader && isPending" :class="[$style.content]">
      <AnimatedText text="Done">
        <template #icon>
          <font-awesome-icon icon="check" size="md" />
        </template>
      </AnimatedText>
    </div>
    <Loader
      v-if="showLoader"
      :color="LoaderColors.GRAY"
      :icon="LoaderIcon.DOTS"
      :is-loading="showLoader"
      :disabled="disabled"
    />
  </button>
</template>

<script lang="ts" setup>
import {
  defineEmits,
  defineProps,
  onUnmounted,
  ref,
  toRefs,
  watch,
  withDefaults
} from 'vue';
import Loader from '@/components/Loader/Loader.vue';
import { LoaderColors, LoaderIcon } from '@/types/loader';
import useDarkMode from '@/hooks/useDarkMode';
import AnimatedText from '@/components/Animations/AnimatedText/AnimatedText.vue';

interface Props {
  label?: string;
  showLoader?: boolean;
  icon?: string;
  disabled?: boolean;
  classes?: string;
  outline?: boolean;
  usePendingAnimation?: boolean;
}

interface Emits {
  (e: 'click'): void;
  (e: 'afterPending'): void;
}

const clickAnimation = ref(false);

const props = withDefaults(defineProps<Props>(), {
  showLoader: false,
  icon: '',
  disabled: false,
  label: '',
  classes: '',
  outline: false,
  usePendingAnimation: true
});

const emit = defineEmits<Emits>();

const { showLoader, usePendingAnimation, disabled } = toRefs(props);

const isPending = ref(false);
const disabledPendingAnimation = ref(true);

const { isDarkMode } = useDarkMode();

watch(showLoader, value => {
  if (value || disabledPendingAnimation.value) {
    return;
  }

  isPending.value = true;

  setTimeout(() => {
    isPending.value = false;
    emit('afterPending');
  }, 2000);
});

let timeoutId: number;

const clickHandler = () => {
  clickAnimation.value = true;

  emit('click');

  timeoutId = setTimeout(() => {
    if (usePendingAnimation.value) {
      disabledPendingAnimation.value = false;
    }

    clickAnimation.value = false;
  }, 300);
};

onUnmounted(() => {
  clearInterval(timeoutId);
});
</script>

<style module>
.wrapper {
  @apply h-8 min-w-150 px-4 py-2 flex justify-center items-center border-2 rounded-xl transition duration-300 text-gray-900 bg-lime-400 border-lime-400 shadow-sm shadow-lime-300 dark:text-gray-900 dark:bg-lime-400 dark:border-lime-400 dark:shadow-none;
}

.click-animation {
  @apply animate-click;
}

.outline {
  @apply text-gray-900 border-gray-300 shadow-gray-200 bg-white dark:text-gray-900 dark:bg-dark-mode dark:text-lime-400 dark:border-white;
}

.content {
  @apply flex items-center justify-center gap-2;
}

.disabled {
  @apply bg-gray-300 border-gray-400 dark:text-gray-900 dark:bg-gray-300 dark:border-gray-400;
}
</style>
