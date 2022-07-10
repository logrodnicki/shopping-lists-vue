<template>
  <router-link
    class="h-8 border-2 border-orange-400 rounded-md px-3 flex items-center flex items-center gap-2 shadow-sm shadow-orange-300"
    :to="to"
  >
    <div class="text-orange-400 flex">
      <font-awesome-icon class="h-4" :icon="getIconClassBasedOnType()" size="6x" />
    </div>
    <span v-if="!!label" class="text-orange-400">{{ label }}</span>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import { LinkIcons } from '@/types/link';

interface Props {
  label?: string;
  to: string;
  iconType: LinkIcons;
}

const props = defineProps<Props>();

const { iconType } = toRefs(props);

const getIconClassBasedOnType = () => {
  switch (iconType.value) {
    default:
    case LinkIcons.LIST: {
      return 'list';
    }
    case LinkIcons.CREATE: {
      return 'plus';
    }
  }
};
</script>
