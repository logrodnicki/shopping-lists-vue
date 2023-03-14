<template>
  <Teleport v-if="visible" to="#modals">
    <div :class="$style['modal-overlay']">
      <div :class="$style['modal-overlay-background']" />
      <slot name="content" />
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from 'vue';

interface Props {
  visible: boolean;
}

const props = defineProps<Props>();

const { visible } = toRefs(props);
</script>

<style module>
.modal-overlay {
  @apply fixed bottom-0 left-0 w-full h-full transition duration-300 flex items-end;
}

.modal-overlay-background {
  @apply bg-gray-900 opacity-50 w-full h-full absolute -z-10;
}
</style>
