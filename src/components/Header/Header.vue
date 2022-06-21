<template>
  <nav
    class="w-full border-b-2 border-b-orange-400 box-border py-2 px-4 sticky top-0 justify-between flex items-center"
    :class="[isDarkMode ? 'bg-dark-mode' : 'bg-white']"
  >
    <ThemeSwitcher />
    <div>
      <ul class="flex flex-row gap-4">
        <li>
          <Link label="List" to="/" />
        </li>
        <li>
          <Link label="New" to="/create" :icon-type="LINK_ICONS.CREATE" />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import useDarkMode from '@/hooks/useDarkMode';
import { ThemeSwitcher, Link } from '@/components';
import { LINK_ICONS } from '@/constants/link';

export default {
  components: {
    ThemeSwitcher,
    Link
  },
  setup() {
    return {
      ...useDarkMode(),
      LINK_ICONS
    };
  }
};
</script>
