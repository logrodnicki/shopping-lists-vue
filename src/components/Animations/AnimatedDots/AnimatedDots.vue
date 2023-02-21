<template>
  <div :class="$style.wrapper">
    <div :class="[$style.dot, $style['first-dot']]" />
    <div :class="[$style.dot, $style['second-dot']]" />
    <div :class="[$style.dot, $style['third-dot']]" />
  </div>
</template>

<script lang="ts" setup></script>

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
  @apply h-2 w-2 bg-gray-900 rounded;
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
