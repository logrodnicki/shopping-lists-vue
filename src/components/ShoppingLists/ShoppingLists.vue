<template>
  <div :class="[$style.wrapper]">
    <Filters
      :search-text="selectedFilters.searchText"
      :sorting-order="selectedFilters.sortingOrder"
      :type="selectedFilters.type"
      @update="updateFiltersHandler"
    />
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
      <div v-if="shoppingLists.length > total" :class="[$style.pagination]">
        <Pagination
          :page="page"
          :page-size="pageSize"
          :total="total"
          @change-page="changePageHandler"
        />
      </div>
    </Loader>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  defineEmits,
  defineProps,
  onMounted,
  ref,
  toRefs,
  watch,
  watchEffect
} from 'vue';
import ShoppingListItem from '@/components/ShoppingLists/ShoppingListItem/ShoppingListsItem.vue';
import Filters from '@/components/Filters/Filters.vue';
import { FiltersTypes, SelectedFilters, ShoppingList } from '@/types';
import Loader from '@/components/Loader/Loader.vue';
import { chunk as _chunk } from 'lodash';
import Pagination from '@/components/Pagination/Pagination.vue';

const SHOW_ITEM_DELAY = 100;

interface Props {
  shoppingLists: ShoppingList[];
  selectedFilters: SelectedFilters;
  page: number;
  pageSize: number;
  total: number;
  isLoading: boolean;
}

interface Emits {
  (e: 'updateFilters', value: SelectedFilters): void;

  (e: 'updatePage', value: number): void;

  (e: 'updatePageSize', value: number): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const {
  shoppingLists,
  selectedFilters,
  page: initPage,
  pageSize: initPageSize,
  total
} = toRefs(props);

const type = ref(FiltersTypes.UNCOMPLETED);
const counter = ref(0);
const page = ref(initPage.value);
const pageSize = ref(initPageSize.value);

onMounted(() => {
  const interval = setInterval(() => {
    counter.value++;

    if (counter.value > shoppingLists.value.length) {
      clearInterval(interval);
    }
  }, SHOW_ITEM_DELAY);
});

watch(page, () => {
  counter.value = 0;

  const interval = setInterval(() => {
    counter.value++;

    if (counter.value > shoppingLists.value.length) {
      clearInterval(interval);
    }
  }, SHOW_ITEM_DELAY);
});

watchEffect(() => {
  emit('updatePage', page.value);
  emit('updatePageSize', pageSize.value);
});

const chunkedLists = computed(() => {
  return _chunk<ShoppingList>(shoppingLists.value, pageSize.value);
});

const paginatedLists = computed(() => {
  return chunkedLists.value[page.value - 1];
});

const changePageHandler = (value: number) => {
  page.value = value;
};

const updateFiltersHandler = (updatedFilters: SelectedFilters): void => {
  emit('updateFilters', updatedFilters);
};
</script>

<style module>
.wrapper {
  @apply h-full flex flex-col gap-8;
}

.list {
  @apply flex flex-col gap-3 pb-1 h-full;
}

.pagination {
  @apply mt-4 animate-show-item;
}
</style>
