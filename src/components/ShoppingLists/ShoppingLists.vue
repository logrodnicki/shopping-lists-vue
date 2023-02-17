<template>
  <div :class="[$style.wrapper]">
    <Filters :selected-filters="selectedFilter" @select="selectFilterHandler" />
    <Loader :is-loading="isLoading">
      <ul :class="[$style.list]">
        <ShoppingListItem
          v-for="(shoppingList, index) in paginatedLists"
          :id="shoppingList.id"
          :key="shoppingList.id"
          :shopping-list="shoppingList"
          :visible="index <= counter"
        />
      </ul>
      <div
        v-if="filteredLists.length > ITEMS_PER_PAGE"
        :class="[$style.pagination]"
      >
        <Pagination
          :amount-per-page="pageSize"
          :current-page="page"
          all-items-count="75"
          @change-page="changePageHandler"
        />
      </div>
    </Loader>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, onMounted, ref, toRefs, watch } from 'vue';
import ShoppingListItem from '@/components/ShoppingLists/ShoppingListItem/ShoppingListsItem.vue';
import Filters from '@/components/Filters/Filters.vue';
import { FiltersTypes, ShoppingList } from '@/types';
import Loader from '@/components/Loader/Loader.vue';
import { chunk as _chunk } from 'lodash';
import Pagination from '@/components/Pagination/Pagination.vue';

const SHOW_ITEM_DELAY = 100;
const ITEMS_PER_PAGE = 10;

interface Props {
  shoppingLists: ShoppingList[];
  isLoading: boolean;
}

const props = defineProps<Props>();

const { shoppingLists } = toRefs(props);

const selectedFilter = ref(FiltersTypes.UNCOMPLETED);
const counter = ref(0);
const page = ref(1);
const pageSize = ref(ITEMS_PER_PAGE);

onMounted(() => {
  const interval = setInterval(() => {
    counter.value++;

    if (counter.value > shoppingLists.value.length) {
      clearInterval(interval);
    }
  }, SHOW_ITEM_DELAY);
});

watch(selectedFilter, () => {
  counter.value = 0;

  const interval = setInterval(() => {
    counter.value++;

    if (counter.value > shoppingLists.value.length) {
      clearInterval(interval);
    }
  }, SHOW_ITEM_DELAY);
});

const filteredLists = computed(() => {
  if (selectedFilter.value === FiltersTypes.ALL) {
    return shoppingLists.value;
  }

  if (selectedFilter.value === FiltersTypes.COMPLETED) {
    return shoppingLists.value.filter(
      ({ attributes: { completed } }) => completed
    );
  }

  return shoppingLists.value.filter(
    ({ attributes: { completed } }) => !completed
  );
});

const chunkedLists = computed(() => {
  return _chunk<ShoppingList>(filteredLists.value, pageSize.value);
});

const paginatedLists = computed(() => {
  return chunkedLists.value[page.value - 1];
});

const selectFilterHandler = (filter: FiltersTypes) =>
  (selectedFilter.value = filter);

const changePageHandler = (value: number) => {
  page.value = value;
};
</script>

<style module>
.wrapper {
  @apply h-full flex flex-col;
}

.list {
  @apply flex flex-col gap-3 pb-1 px-1 h-full;
}

.pagination {
  @apply mt-4 animate-show-item;
}
</style>
