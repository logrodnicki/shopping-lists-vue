<template>
  <label :class="[$style.label]">
    <input :checked="checked" class="invisible" type="checkbox" />
    <span
      :class="[
        $style.wrapper,
        checked ? $style.checked : 'bg-white',
        { [$style.unchecked]: hidingAnimation }
      ]"
    >
      <span
        v-if="showContent"
        :class="[$style.content, isDarkMode ? 'text-black' : 'text-white']"
      >
        <font-awesome-icon icon="check" size="xs" />
      </span>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { defineProps, ref, toRefs, watch } from 'vue';
import useDarkMode from '@/hooks/useDarkMode';

interface Props {
  checked: boolean;
}

const props = defineProps<Props>();

const { checked } = toRefs(props);

const showContent = ref(props.checked);
const hidingAnimation = ref(false);

const { isDarkMode } = useDarkMode();

watch(checked, value => {
  if (value) {
    showContent.value = true;
    return;
  }

  hidingAnimation.value = true;

  setTimeout(() => {
    showContent.value = false;
    hidingAnimation.value = false;
  }, 500);
});
</script>

<style module>
@keyframes check {
  50% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
  }
}

.label {
  @apply cursor-pointer relative h-5 w-5 flex items-center justify-center;
}

.wrapper {
  @apply h-5 w-5 border-2 border-lime-400 rounded-full absolute top-0 flex items-center justify-center transition duration-300;
}

.checked {
  @apply bg-lime-400 animate-checked;
}

.unchecked {
  @apply animate-unchecked;
}

.content {
  @apply flex items-center;
}
</style>
