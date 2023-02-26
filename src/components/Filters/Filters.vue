<template>
  <Box :classes="$style.wrapper">
    <div :class="$style['input-wrapper']">
      <TextInput
        id="search-query"
        v-model="searchText"
        :type="TextInputTypes.TEXT"
        label="Search text"
        placeholder="eg. potato"
      />
    </div>
    <Select
      v-model="sortingOrder"
      :items="sortingOrderItems"
      :wrapper-classes="$style['sorting-order-wrapper']"
      label="Order"
    />
    <Select
      v-model="type"
      :items="typesItems"
      :wrapper-classes="$style['type-wrapper']"
      label="Type"
    />
    <Button :classes="$style['search-button']" icon="search" />
  </Box>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, toRefs, watchEffect } from 'vue';
import useDarkMode from '@/hooks/useDarkMode';
import { FiltersTypes, SortingOrder, TextInputTypes } from '@/types';
import TextInput from '@/components/Form/TextInput/TextInput.vue';
import Box from '@/components/Box/Box.vue';
import Select from '@/components/Form/Select/Select.vue';
import { SelectItem } from '@/types/select';
import Button from '@/components/Button/Button.vue';

interface Props {
  type: FiltersTypes;
  sortingOrder: SortingOrder;
  searchText: string;
}

interface Emits {
  (e: 'select', filter: FiltersTypes): void;

  (
    e: 'update',
    {
      type,
      sortingOrder,
      searchText
    }: { type: FiltersTypes; sortingOrder: SortingOrder; searchText: string }
  ): void;
}

const props = defineProps<Props>();

const {
  type: initType,
  sortingOrder: initSortingOrder,
  searchText: initSearchText
} = toRefs(props);

const emit = defineEmits<Emits>();

const searchText = ref(initType.value);
const sortingOrder = ref(initSortingOrder.value);
const type = ref(initType.value);

const sortingOrderItems: SelectItem[] = [
  {
    label: 'ASC',
    value: SortingOrder.ASC
  },
  {
    label: 'DESC',
    value: SortingOrder.DESC
  }
];
const typesItems: SelectItem[] = [
  {
    label: 'Uncompleted',
    value: FiltersTypes.UNCOMPLETED
  },
  {
    label: 'Completed',
    value: FiltersTypes.COMPLETED
  },
  {
    label: 'All',
    value: FiltersTypes.ALL
  }
];

const { isDarkMode } = useDarkMode();

watchEffect(() => {
  emit('update', {
    sortingOrder: sortingOrder.value,
    searchText: searchText.value,
    type: type.value
  });
});
</script>

<style module>
.wrapper {
  @apply flex items-center flex-row gap-3;
}

.input-wrapper {
  @apply flex flex-grow;
}

.sorting-order-wrapper,
.type-wrapper {
  @apply w-28;
}

.search-button {
  @apply w-12 min-w-0 mb-4 self-end;
}
</style>
