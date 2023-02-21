<template>
  <div :class="$style.wrapper">
    <span :class="$style.icon">
      <font-awesome-icon icon="arrows-rotate" size="xl" />
    </span>
  </div>
</template>

<style module>
.wrapper {
  @apply animate-fade-out;
}

.icon {
  @apply animate-spin;
}
</style>
