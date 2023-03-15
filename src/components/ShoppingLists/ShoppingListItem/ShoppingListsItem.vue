<template>
  <li v-if="visible" :class="[$style.wrapper]" @click="selectHandler">
    <div class="flex flex-col mr-auto">
      <span
        :class="[
          $style.name,
          {
            [$style['name-completed']]: completed
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
  @apply rounded-xl shadow-gray-300 px-4 py-2 box-border flex items-center gap-4 cursor-pointer animate-show-item bg-white shadow-md dark:bg-mine-shaft dark:shadow-none;
}

.name {
  @apply text-gray-800 dark:text-white;
}

.name-completed {
  @apply text-gray-500 line-through dark:text-gray-700;
}

.products-count {
  @apply text-xs text-gray-500;
}
</style>
