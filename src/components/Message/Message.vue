<template>
  <div class="p-1 rounded w-full animate-fade-out text-xs" :class="{ 'bg-red-200 border-2 border-red-400': type === types.error, 'bg-periwinkle-blue border-2 border-cornflower-blue': type === types.info }">
    {{ message }}
  </div>
</template>

<script>
export const types = {
  info: 'info',
  error: 'error'
};

export default {
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      validator: (value) => {
        return Object.values(types).includes(value);
      },
      required: true
    }
  },
  setup() {
    return {
      types
    };
  }
};
</script>