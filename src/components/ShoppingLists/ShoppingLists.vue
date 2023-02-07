<template>
  <div :class="[$style.wrapper]">
    <Filters :selected-filters="selectedFilter" @select="selectFilterHandler" />
    <Loader :is-loading="isLoading">
      <ul :class="[$style.list]">
        <ShoppingListItem
          v-for="(shoppingList, index) in filteredLists"
          :id="shoppingList.id"
          :key="shoppingList.id"
          :shopping-list="shoppingList"
          :visible="index <= counter"
        />
      </ul>
    </Loader>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, toRefs, onMounted, watch } from 'vue';
import ShoppingListItem from '@/components/ShoppingLists/ShoppingListItem/ShoppingListsItem.vue';
import Filters from '@/components/Filters/Filters.vue';
import { FiltersTypes, ShoppingList } from '@/types';
import Loader from '@/components/Loader/Loader.vue';

const SHOW_ITEM_DELAY = 100;

interface Props {
  shoppingLists: ShoppingList[];
  isLoading: boolean;
}

const props = defineProps<Props>();

const { shoppingLists } = toRefs(props);

const selectedFilter = ref(FiltersTypes.UNCOMPLETED);
const counter = ref(0);

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

const selectFilterHandler = (filter: FiltersTypes) =>
  (selectedFilter.value = filter);

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
</script>

<style module>
.wrapper {
  @apply h-full flex flex-col;
}

.list {
  @apply flex flex-col gap-3 pb-1 px-1 h-full;
}
</style>
