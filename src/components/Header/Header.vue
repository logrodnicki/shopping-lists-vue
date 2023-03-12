<template>
  <header :class="[$style.wrapper]">
    <nav :class="[$style.nav]">
      <ThemeSwitcher />
      <div v-if="!isLogin">
        <ul :class="[$style.menu]">
          <li>
            <Link :icon-type="LinkIcons.LIST" to="/" />
          </li>
          <li>
            <Link :icon-type="LinkIcons.CREATE" to="/create" />
          </li>
          <li>
            <Link :icon-type="LinkIcons.LOGOUT" to="/login" />
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import useDarkMode from '@/hooks/useDarkMode';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher.vue';
import Link from '@/components/Link/Link.vue';
import { LinkIcons } from '@/types/link';
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
  @apply w-full border-b-2 border-b-gray-400 box-border flex justify-center;
}

.nav {
  @apply max-w-screen-md w-full py-2 px-6 sticky top-0 justify-between flex items-center;
}

.menu {
  @apply flex flex-row gap-4;
}
</style>
