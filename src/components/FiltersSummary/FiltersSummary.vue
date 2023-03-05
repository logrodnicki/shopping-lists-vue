<template>
  <div>asdsa</div>
</template>

<script lang="ts" setup>
import { FiltersType, SortingOrder } from '@/types';

interface Props {
  filters: {
    searchText: string;
    sortingOrder: SortingOrder;
    type: FiltersType;
  };
}
</script>

<style module></style>
