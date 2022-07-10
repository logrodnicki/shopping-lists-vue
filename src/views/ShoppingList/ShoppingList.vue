<template>
  <div class="text-orange-400 w-full">
    <div class="flex items-center gap-6 mb-8">
      <button class="flex items-center justify-center cursor-pointer" @click="backHandler">
        <span>
          <font-awesome-icon icon="arrow-left" size="md" />
        </span>
      </button>
      <h1 class="text-xl">{{ shoppingList?.attributes?.name }}</h1>
    </div>
    <ul class="flex flex-col gap-4">
      <Product
        v-for="product in shoppingList?.attributes?.products?.data || []"
        :key="product.id"
        :product="product"
        @toggle-select="toggleSelectProductHandler"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import router from '@/router';
import { getShoppingList, updateShoppingListProduct } from '@/api';
import { cloneDeep as _cloneDeep } from 'lodash';
import Product from '@/components/Product/Product.vue';
import { ProductAttributes, ShoppingList } from '@/types';

interface Props {
  id: number;
}

const props = defineProps<Props>();

const shoppingList = ref<ShoppingList>(null);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;

  const response = await getShoppingList(props.id);

  if (!response) {
    return;
  }

  const { data } = response;

  shoppingList.value = data.data;
  isLoading.value = false;
});

const backHandler = () => router.push({ name: 'Main' });

const toggleSelectProductHandler = async ({
  id: productId,
  updatedProduct
}: {
  id: number;
  updatedProduct: ProductAttributes;
}): Promise<void> => {
  await updateShoppingListProduct(productId, updatedProduct);

  const updatedProducts = shoppingList.value.attributes.products.data.map(product => {
    if (product.id !== productId) {
      return product;
    }

    return {
      id: productId,
      attributes: { ...updatedProduct }
    };
  });

  const shoppingListCopy = _cloneDeep(shoppingList.value);
  shoppingListCopy.products.data = updatedProducts;

  shoppingList.value = shoppingListCopy;
};
</script>
