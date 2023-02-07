<template>
  <router-link :class="[$style.wrapper, classes]" :to="to">
    <div :class="[$style.icon]">
      <font-awesome-icon class="h-4" :icon="iconsMap[iconType]" size="6x" />
    </div>
    <span v-if="!!label" class="text-orange-400">{{ label }}</span>
  </router-link>
</template>

<script setup lang="ts">
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
  [LinkIcons.UPDATE]: 'pen'
};
</script>

<style module>
.wrapper {
  @apply h-8 border-2 border-orange-400 rounded-md px-3 flex items-center flex items-center gap-2;
}

.icon {
  @apply text-orange-400 flex;
}
</style>
