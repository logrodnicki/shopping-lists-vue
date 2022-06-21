<template>
  <div>
    <Filters :selected-filters="selectedFilter" @select="selectFilterHandler" />
    <ul class="flex flex-col gap-3">
      <ListItem v-for="{ id, attributes } in filteredLists" :key="id" :list="attributes" />
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { ListItem, Filters } from '@/components';
import { FILTERS_TYPES } from '@/constants/filters';

export default {
  components: {
    ListItem,
    Filters
  },
  props: {
    lists: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const selectedFilter = ref(FILTERS_TYPES.COMPLETED);

    const selectFilterHandler = filter => (selectedFilter.value = filter);

    const filteredLists = computed(() => {
      if (selectedFilter.value === FILTERS_TYPES.ALL) {
        return props.lists;
      }

      if (selectedFilter.value === FILTERS_TYPES.COMPLETED) {
        return props.lists.filter(({ attributes: { completed } }) => completed);
      }

      return props.lists.filter(({ attributes: { completed } }) => !completed);
    });

    return {
      selectedFilter,
      selectFilterHandler,
      filteredLists
    };
  }
};
</script>
