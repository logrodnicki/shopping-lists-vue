<template>
  <div class="w-full">
    <Header />
    <slot></slot>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';

export default {
  components: {
    Header
  }
};
</script>
