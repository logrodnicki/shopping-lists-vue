<template>
  <header :class="[$style.wrapper]">
    <nav :class="[$style.nav]">
      <ThemeSwitcher />
      <div>
        <ul :class="[$style.menu]">
          <li>
            <Link label="List" to="/" :icon-type="LinkIcons.LIST" />
          </li>
          <li>
            <Link label="New" to="/create" :icon-type="LinkIcons.CREATE" />
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import useDarkMode from '@/hooks/useDarkMode';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher.vue';
import Link from '@/components/Link/Link.vue';
import { LinkIcons } from '@/types/link';

const { isDarkMode } = useDarkMode();
</script>

<style module>
.wrapper {
  @apply w-full border-b-2 border-b-orange-400 box-border flex justify-center;
}

.nav {
  @apply max-w-screen-md w-full py-2 px-4 sticky top-0 justify-between flex items-center;
}

.menu {
  @apply flex flex-row gap-4;
}
</style>
