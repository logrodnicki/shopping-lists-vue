<template>
  <nav
    class="w-full border-b-2 border-b-orange-400 box-border py-2 px-4 sticky top-0 justify-between flex items-center"
    :class="[isDarkMode ? 'bg-dark-mode' : 'bg-white']"
  >
    <ThemeSwitcher />
    <div>
      <ul class="flex flex-row gap-4">
        <li>
          <Link label="List" to="/" :icon-type="LinkIcons.LIST" />
        </li>
        <li>
          <Link label="New" to="/create" :icon-type="LinkIcons.CREATE" />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import useDarkMode from '@/hooks/useDarkMode';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher.vue';
import Link from '@/components/Link/Link.vue';
import { LinkIcons } from '@/types/link';

const { isDarkMode } = useDarkMode();
</script>
