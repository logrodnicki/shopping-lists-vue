<template>
  <div :class="$style.wrapper">
    <ShoppingLists
      :is-loading="isLoading"
      :page="page"
      :page-size="pageSize"
      :selected-filters="selectedFilters"
      :shopping-lists="shoppingLists"
      :total="total"
      @update-filters="updateFiltersHandler"
      @update-page="updatePageHandler"
      @update-page-size="updatePageSizeHandler"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue';
import { getShoppingLists } from '@/api';
import ShoppingLists from '@/components/ShoppingLists/ShoppingLists.vue';
import {
  FiltersType,
  Meta,
  SelectedFilters,
  ShoppingList,
  SortingOrder
} from '@/types';

const ITEMS_PER_PAGE = 8;

const shoppingLists = ref<ShoppingList[]>([]);
const isLoading = ref<boolean>(false);
const selectedFilters = reactive<SelectedFilters>({
  searchText: '',
  sortingOrder: SortingOrder.ASC,
  type: FiltersType.UNCOMPLETED
});
const page = ref(1);
const pageSize = ref(ITEMS_PER_PAGE);
const total = ref(ITEMS_PER_PAGE);

const fetchShoppingLists = async (
  filters: SelectedFilters,
  page: number,
  pageSize: number
) => {
  isLoading.value = true;

  try {
    const response = await getShoppingLists<{
      data: ShoppingList[];
      meta: Meta;
    }>(filters, page, pageSize);

    if (!response) {
      return;
    }

    const {
      data: { data, meta }
    } = response;

    shoppingLists.value = data;
    total.value = meta.pagination.total;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

watchEffect(async () => {
  await fetchShoppingLists(selectedFilters, page.value, pageSize.value);
});

const updateFiltersHandler = (updatedFilters: SelectedFilters): void => {
  Object.entries(updatedFilters).forEach(([key, value]) => {
    selectedFilters[key] = value;
  });
};

const updatePageHandler = (value: number): void => {
  page.value = value;
};

const updatePageSizeHandler = (value: number): void => {
  pageSize.value = value;
};
</script>

<style module>
.wrapper {
  @apply w-full h-full max-w-screen-md p-6 absolute top-0 left-0;
}
</style>
