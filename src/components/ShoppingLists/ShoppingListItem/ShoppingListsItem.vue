<template>
  <li
    v-if="visible"
    :class="[
      $style.wrapper,
      isDarkMode ? 'bg-mine-shaft' : 'bg-white shadow-md'
    ]"
    @click="selectHandler"
  >
    <div class="flex flex-col mr-auto">
      <span
        :class="[
          isDarkMode ? $style['dark-mode'] : $style['light-mode'],
          {
            [$style['completed-dark-mode']]: completed && isDarkMode,
            [$style['completed-light-mode']]: completed && !isDarkMode
          }
        ]"
        >{{ name }}</span
      >
      <span :class="[$style['products-count']]"
        >{{ productsCount }} products</span
      >
    </div>
    <div class="text-gray-500">
      <font-awesome-icon icon="chevron-right" size="xs" />
    </div>
  </li>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from 'vue';
import useDarkMode from '@/hooks/useDarkMode';
import router, { RoutesNames } from '@/router';
import { ShoppingList } from '@/types';

interface Props {
  shoppingList: ShoppingList;
  visible: boolean;
}

const props = defineProps<Props>();

const {
  shoppingList: {
    value: {
      id,
      attributes: {
        name,
        completed,
        products: { data: listProducts }
      }
    }
  },
  visible
} = toRefs(props);

const { isDarkMode } = useDarkMode();

const productsCount = listProducts.length;

const selectHandler = () =>
  router.push({ name: RoutesNames.SHOPPING_LIST, params: { id } });
</script>

<style module>
.wrapper {
  @apply rounded-xl shadow-gray-300 px-4 py-2 box-border flex items-center gap-4 cursor-pointer animate-show-item;
}

.light-mode {
  @apply text-gray-800;
}

.dark-mode {
  @apply text-white;
}

.completed-light-mode {
  @apply text-gray-500 line-through;
}

.completed-dark-mode {
  @apply text-gray-700 line-through;
}

.products-count {
  @apply text-xs text-gray-500;
}
</style>
