<template>
  <div :class="[$style.wrapper]">
    <FilterButton
      label="Uncompleted"
      :selected="selectedFilters === FiltersTypes.UNCOMPLETED"
      :type="FiltersTypes.UNCOMPLETED"
      @select="selectFilterHandler"
    />
    <FilterButton
      label="Completed"
      :selected="selectedFilters === FiltersTypes.COMPLETED"
      :type="FiltersTypes.COMPLETED"
      @select="selectFilterHandler"
    />
    <FilterButton
      label="All"
      :selected="selectedFilters === FiltersTypes.ALL"
      :type="FiltersTypes.ALL"
      @select="selectFilterHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import useDarkMode from '@/hooks/useDarkMode';
import FilterButton from '@/components/Filters/FilterButton/FilterButton.vue';
import { FiltersTypes } from '@/types';

interface Props {
  selectedFilters: FiltersTypes;
}

interface Emits {
  (e: 'select', filter: FiltersTypes): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const { isDarkMode } = useDarkMode();

const selectFilterHandler = (filter: FiltersTypes) => emit('select', filter);
</script>

<style module>
.wrapper {
  @apply flex justify-center gap-4 items-center mb-4;
}
</style>
