<template>
  <Box :classes="classes">
    <Button
      :classes="$style['filters-button']"
      icon="filter"
      label="Filters"
      @click="toggleFilterHandler"
    />
    <Modal :visible="areFiltersVisible">
      <template #content>
        <div :class="$style['filters-modal']">
          <h3 :class="$style['filters-modal-header']">
            <span>Filters</span>
            <button @click="closeModalHandler">
              <font-awesome-icon icon="xmark" size="md" />
            </button>
          </h3>
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
          <Button
            :classes="$style['apply-button']"
            icon="search"
            label="Apply"
            @click="applyFiltersHandler"
          />
        </div>
      </template>
    </Modal>
  </Box>
</template>

<script lang="ts" setup>
import Button from '@/components/Button/Button.vue';
import Box from '@/components/Box/Box.vue';
import { defineEmits, defineProps, ref, toRefs, watchEffect } from 'vue';
import Modal from '@/components/Modal/Modal.vue';
import { FiltersType, SortingOrder, TextInputTypes } from '@/types';
import { SelectItem } from '@/types/select';
import useDarkMode from '@/hooks/useDarkMode';
import TextInput from '@/components/Form/TextInput/TextInput.vue';
import Select from '@/components/Form/Select/Select.vue';

interface Props {
  type: FiltersType;
  sortingOrder: SortingOrder;
  searchText: string;
  classes?: string;
}

interface Emits {
  (e: 'select', filter: FiltersType): void;

  (
    e: 'update',
    {
      type,
      sortingOrder,
      searchText
    }: { type: FiltersType; sortingOrder: SortingOrder; searchText: string }
  ): void;
}

const props = defineProps<Props>();

const {
  type: initType,
  sortingOrder: initSortingOrder,
  searchText: initSearchText,
  classes
} = toRefs(props);

const emit = defineEmits<Emits>();

const searchText = ref(initSearchText.value);
const sortingOrder = ref(initSortingOrder.value);
const type = ref(initType.value);
const areFiltersVisible = ref(false);

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
    value: FiltersType.UNCOMPLETED
  },
  {
    label: 'Completed',
    value: FiltersType.COMPLETED
  },
  {
    label: 'All',
    value: FiltersType.ALL
  }
];

const { isDarkMode } = useDarkMode();

watchEffect(() => {});

const toggleFilterHandler = () => {
  areFiltersVisible.value = !areFiltersVisible.value;
};

const applyFiltersHandler = () => {
  areFiltersVisible.value = false;

  emit('update', {
    sortingOrder: sortingOrder.value,
    searchText: searchText.value,
    type: type.value
  });
};

const closeModalHandler = () => {
  areFiltersVisible.value = false;
};
</script>

<style module>
@keyframes showModal {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

.filters-button {
  @apply w-full;
}

.filters-modal {
  @apply bg-white w-full h-2/4 p-4 flex flex-col gap-4 rounded-t-lg;
  animation: showModal 300ms linear forwards;
}

.filters-modal-header {
  @apply flex justify-between items-center w-full;
}

.apply-button {
  @apply mt-auto;
}
</style>
