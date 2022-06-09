<template>
  <nav
    class="w-full border-b-2 py-2 px-4 fixed top-0 justify-between flex items-center"
    :class="{ 'bg-black': isDarkMode }"
  >
    <ThemeSwitcher />
    <ul class="flex flex-row gap-4">
      <li>
        <Link label="List" to="/" />
      </li>
      <li>
        <Link label="New" to="/create" :icon-type="LinkIconTypes.Create" />
      </li>
    </ul>
  </nav>
</template>

<script>
import useDarkMode from '@/hooks/useDarkMode';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher.vue';
import Link, { LinkIconTypes } from '@/components/Link/Link.vue';

export default {
  components: {
    ThemeSwitcher,
    Link
  },
  setup() {
    return {
      ...useDarkMode(),
      LinkIconTypes
    };
  }
};
</script>
