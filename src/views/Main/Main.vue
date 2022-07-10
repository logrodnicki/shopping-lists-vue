<template>
  <div class="w-full">
    <ShoppingLists :shopping-lists="shoppingLists" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getShoppingLists } from '@/api';
import ShoppingLists from '@/components/ShoppingLists/ShoppingLists.vue';
import { ShoppingList } from '@/types';

const shoppingLists = ref<ShoppingList[]>([]);
const isLoading = ref<boolean>(false);

onMounted(async () => {
  isLoading.value = true;

  try {
    const response = await getShoppingLists();

    if (!response) {
      return;
    }

    const {
      data: { data }
    } = response;

    shoppingLists.value = data;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});
</script>
