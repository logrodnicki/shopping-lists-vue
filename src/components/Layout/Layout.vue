<template>
  <div :class="[$style.wrapper, isDarkMode ? 'bg-dark-mode' : 'bg-gray-50']">
    <Header v-if="!isLogin" />
    <main :class="[$style.main]">
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts" setup>
import useDarkMode from '@/hooks/useDarkMode';
import Header from '@/components/Header/Header.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { RoutesNames } from '@/router';

const { isDarkMode } = useDarkMode();
const route = useRoute();

const isLogin = computed(() => {
  return route.name === RoutesNames.LOGIN;
});
</script>

<style module>
.wrapper {
  @apply w-screen h-full min-h-screen flex justify-start items-center flex-col;
}

.main {
  @apply w-full max-w-screen-md h-main p-6 flex justify-center flex-grow;
}
</style>
