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

<script>
import { toRefs } from 'vue';
import { LINK_ICONS } from '@/constants/link';

export default {
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    to: {
      type: String,
      required: true
    },
    iconType: {
      validator(value) {
        return Object.values(LINK_ICONS).includes(value);
      },
      default: LINK_ICONS.LIST
    }
  },
  setup(props) {
    const { iconType } = toRefs(props);

    const getIconClassBasedOnType = () => {
      switch (iconType.value) {
        default:
        case LINK_ICONS.LIST: {
          return 'list';
        }
        case LINK_ICONS.CREATE: {
          return 'plus';
        }
      }
    };

    return {
      getIconClassBasedOnType
    };
  }
};
</script>
