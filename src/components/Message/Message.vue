<template>
  <div
    class="p-1 rounded w-full animate-fade-out text-xs"
    :class="{
      'bg-red-200 border-2 border-red-400': type === MESSAGE_TYPES.error,
      'bg-periwinkle-blue border-2 border-cornflower-blue': type === MESSAGE_TYPES.info
    }"
  >
    {{ message }}
  </div>
</template>

<script>
import { MESSAGE_TYPES } from '@/constants/message';

export default {
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      validator: value => {
        return Object.values(MESSAGE_TYPES).includes(value);
      },
      required: true
    }
  },
  setup() {
    return {
      MESSAGE_TYPES
    };
  }
};
</script>
