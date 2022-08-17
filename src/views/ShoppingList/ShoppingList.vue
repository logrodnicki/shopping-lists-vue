<template>
  <div class="text-orange-400 w-full">
    <div class="flex items-center gap-6 mb-8">
      <button class="flex items-center justify-center cursor-pointer" @click="backHandler">
        <span class="">
          <font-awesome-icon icon="circle-arrow-left" size="lg" />
        </span>
      </button>
      <h1 class="text-xl">{{ shoppingList?.attributes?.name }}</h1>
    </div>
    <Loader :is-loading="isLoading">
      <ul class="flex flex-col gap-4 overflow-auto animate-fade-out">
        <Product
          v-for="product in shoppingList?.attributes?.products?.data || []"
          :key="product.id"
          :product="product"
          :is-loading="loadingMap[product.id]"
          @toggle-select="toggleSelectProductHandler"
        />
      </ul>
    </Loader>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import router from '@/router';
import { getShoppingList, updateShoppingList, updateShoppingListProduct } from '@/api';
import { cloneDeep as _cloneDeep } from 'lodash';
import Product from '@/components/Product/Product.vue';
import Loader from '@/components/Loader/Loader.vue';
import { ProductAttributes, ShoppingList, Product as ProductModel } from '@/types';

interface Props {
  id: number;
}

const props = defineProps<Props>();

const shoppingList = ref<ShoppingList | null>(null);
const isLoading = ref(false);
const loadingMap = ref<Record<string, boolean>>({});

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

const setLoadingMap = (id: number, isLoading: boolean) => (loadingMap.value[id] = isLoading);

const toggleSelectProductHandler = async ({
  id: productId,
  updatedProduct
}: {
  id: number;
  updatedProduct: ProductAttributes;
}): Promise<void> => {
  if (!shoppingList.value) {
    return;
  }

  setLoadingMap(productId, true);

  await updateShoppingListProduct(productId, updatedProduct);

  const updatedProducts: ProductModel[] = shoppingList.value.attributes.products.data.map(
    product => {
      if (product.id !== productId) {
        return product;
      }

      return {
        id: productId,
        attributes: { ...updatedProduct }
      };
    }
  );

  const isShoppingListCompleted =
    updatedProducts.filter(p => p.attributes.completed).length === updatedProducts.length;

  const shoppingListCopy = _cloneDeep(shoppingList.value);
  shoppingListCopy.attributes.products.data = updatedProducts;

  shoppingList.value = shoppingListCopy;

  if (isShoppingListCompleted !== shoppingListCopy?.attributes.completed) {
    shoppingListCopy.attributes.completed = isShoppingListCompleted;
    await updateShoppingList(shoppingListCopy.id, { completed: isShoppingListCompleted });
  }

  setLoadingMap(productId, false);
};
</script>
