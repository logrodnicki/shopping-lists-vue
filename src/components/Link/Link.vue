<template>
  <router-link
    class="h-8 border-2 border-orange-400 rounded-3xl px-3 flex items-center flex items-center gap-2 shadow-sm shadow-orange-300"
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

export const LinkIconTypes = {
  List: 'list',
  Create: 'create'
};

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
        return Object.values(LinkIconTypes).includes(value);
      },
      default: LinkIconTypes.List
    }
  },
  setup(props) {
    const { iconType } = toRefs(props);

    const getIconClassBasedOnType = () => {
      switch (iconType.value) {
        default:
        case LinkIconTypes.List: {
          return 'list';
        }
        case LinkIconTypes.Create: {
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
