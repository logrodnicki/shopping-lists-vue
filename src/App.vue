<template>
  <Layout>
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/Layout/Layout.vue';
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 300ms ease-out;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 300ms ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-right-enter-active {
  transition: opacity 300ms ease-out, transform 300ms ease-out;
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-leave-active {
  transition: opacity 300ms ease-out, transform 300ms ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-left-enter-active {
  transition: opacity 300ms ease-out, transform 300ms ease-out;
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-active {
  transition: opacity 300ms ease-out, transform 300ms ease-out;
}
</style>
