<template>
  <button
    :class="[
      $style.wrapper,
      classes,
      {
        [$style['light-mode']]: !isDarkMode,
        [$style['dark-mode']]: isDarkMode,
        [$style.outline]: outline,
        [$style['outline-dark-mode']]: isDarkMode && outline,
        [$style['click-animation']]: clickAnimation
      }
    ]"
    :disabled="disabled"
    @click="clickHandler"
  >
    <div v-if="!showLoader && !isPending" :class="[$style.content]">
      <AnimatedText :disabled="disabledAnimation" :text="label">
        <template #icon>
          <font-awesome-icon v-if="icon" :icon="icon" size="lg" />
        </template>
      </AnimatedText>
    </div>
    <div v-if="!showLoader && isPending" :class="[$style.content]">
      <AnimatedText text="Done">
        <template #icon>
          <font-awesome-icon icon="check" size="lg" />
        </template>
      </AnimatedText>
    </div>
    <Loader
      v-else
      :color="LoaderColors.GRAY"
      :icon="LoaderIcon.DOTS"
      :is-loading="showLoader"
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
}

interface Emits {
  (e: 'click'): void;
}

const clickAnimation = ref(false);

const props = withDefaults(defineProps<Props>(), {
  showLoader: false,
  icon: '',
  disabled: false,
  label: '',
  classes: '',
  outline: false
});

const emit = defineEmits<Emits>();

const { showLoader } = toRefs(props);

const isPending = ref(false);
const disabledAnimation = ref(true);

const { isDarkMode } = useDarkMode();

watch(showLoader, value => {
  if (value || disabledAnimation.value) {
    return;
  }

  isPending.value = true;

  setTimeout(() => {
    isPending.value = false;
  }, 2000);
});

let timeoutId: number;

const clickHandler = () => {
  disabledAnimation.value = false;
  clickAnimation.value = true;

  emit('click');

  timeoutId = setTimeout(() => {
    clickAnimation.value = false;
  }, 300);
};

onUnmounted(() => {
  clearInterval(timeoutId);
});
</script>

<style module>
.wrapper {
  @apply h-8 min-w-150 px-4 py-2 flex justify-center items-center border-2 rounded-xl transition duration-300 disabled:bg-gray-400 disabled:border-gray-600;
}

.click-animation {
  @apply animate-click;
}

.light-mode {
  @apply text-gray-900 bg-orange-400 border-orange-400 shadow-sm shadow-orange-300 disabled:shadow-gray-600;
}

.dark-mode {
  @apply text-gray-900 bg-orange-400 border-orange-400 shadow-sm;
}

.outline {
  @apply text-gray-900 bg-orange-400;
}

.outline-dark-mode {
  @apply text-gray-900 bg-dark-mode text-orange-400;
}

.content {
  @apply flex items-center justify-center gap-2;
}
</style>
