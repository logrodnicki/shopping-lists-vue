<template>
  <router-link
    :active-class="$style.active"
    :class="[$style.wrapper, classes]"
    :to="to"
  >
    <div :class="[$style.icon]">
      <font-awesome-icon :icon="iconsMap[iconType]" size="md" />
    </div>
    <div v-if="!!label" :class="[$style.label]">
      {{ label }}
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from 'vue';
import { LinkIcons } from '@/types/link';
import useDarkMode from '@/hooks/useDarkMode';

interface Props {
  label?: string;
  to: string;
  iconType: LinkIcons;
  classes?: string;
}

const props = defineProps<Props>();

const { iconType, classes } = toRefs(props);

const { isDarkMode } = useDarkMode();

const iconsMap: Record<LinkIcons, string> = {
  [LinkIcons.LIST]: 'list',
  [LinkIcons.CREATE]: 'plus',
  [LinkIcons.UPDATE]: 'pen',
  [LinkIcons.LOGOUT]: 'arrow-right-from-bracket'
};
</script>

<style lang="scss" module>
.wrapper {
  @apply border-2 border-gray-300 rounded-xl p-2 flex items-center flex items-center gap-2 transition duration-300;
}

.icon {
  @apply flex text-dark-mode dark:text-lime-400;
}

.label {
  @apply leading-4 text-base text-dark-mode dark:text-lime-400;
}

.active {
  @apply bg-lime-300 border-lime-400;

  .icon,
  .label {
    @apply text-dark-mode;
  }
}
</style>
