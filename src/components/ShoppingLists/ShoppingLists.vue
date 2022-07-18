<template>
  <div>
    <Filters :selected-filters="selectedFilter" @select="selectFilterHandler" />
    <Loader :is-loading="isLoading">
      <ul class="flex flex-col gap-3 overflow-auto animate-fade-out">
        <ShoppingListItem
          v-for="shoppingList in filteredLists"
          :id="shoppingList.id"
          :key="shoppingList.id"
          :shopping-list="shoppingList"
        />
      </ul>
    </Loader>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, toRefs } from 'vue';
import ShoppingListItem from '@/components/ShoppingLists/ShoppingListItem/ShoppingListsItem.vue';
import Filters from '@/components/Filters/Filters.vue';
import { FiltersTypes, ShoppingList } from '@/types';
import Loader from '@/components/Loader/Loader.vue';

interface Props {
  shoppingLists: ShoppingList[];
  isLoading: boolean;
}

const props = defineProps<Props>();

const { shoppingLists } = toRefs(props);

const selectedFilter = ref(FiltersTypes.COMPLETED);

const selectFilterHandler = (filter: FiltersTypes) => (selectedFilter.value = filter);

const filteredLists = computed(() => {
  if (selectedFilter.value === FiltersTypes.ALL) {
    return shoppingLists.value;
  }

  if (selectedFilter.value === FiltersTypes.COMPLETED) {
    return shoppingLists.value.filter(({ attributes: { completed } }) => completed);
  }

  return shoppingLists.value.filter(({ attributes: { completed } }) => !completed);
});
</script>
