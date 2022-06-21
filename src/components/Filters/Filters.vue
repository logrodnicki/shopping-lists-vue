<template>
  <div class="flex gap-4 items-center mb-4">
    <FilterButton
      label="All"
      :selected="selectedFilters === FILTERS_TYPES.ALL"
      :type="FILTERS_TYPES.ALL"
      @select="selectFilterHandler"
    />
    <FilterButton
      label="Completed"
      :selected="selectedFilters === FILTERS_TYPES.COMPLETED"
      :type="FILTERS_TYPES.COMPLETED"
      @select="selectFilterHandler"
    />
    <FilterButton
      label="Uncompleted"
      :selected="selectedFilters === FILTERS_TYPES.UNCOMPLETED"
      :type="FILTERS_TYPES.UNCOMPLETED"
      @select="selectFilterHandler"
    />
  </div>
</template>

<script>
import useDarkMode from '@/hooks/useDarkMode';
import { FilterButton } from '@/components';
import { FILTERS_TYPES } from '@/constants/filters';

export default {
  components: { FilterButton },
  props: {
    selectedFilters: {
      validator(value) {
        return Object.values(FILTERS_TYPES).includes(value);
      },
      required: true
    }
  },
  emits: ['select'],
  setup(props, { emit }) {
    const { isDarkMode } = useDarkMode();

    const selectFilterHandler = filter => emit('select', filter);

    return {
      isDarkMode,
      FILTERS_TYPES,
      selectFilterHandler
    };
  }
};
</script>
