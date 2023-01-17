<template>
  <div :class="[$style.wrapper]">
    <div :class="[$style.header]">
      <button :class="[$style['back-button']]" @click="backHandler">
        <span class="">
          <font-awesome-icon icon="circle-arrow-left" size="lg" />
        </span>
      </button>
      <h1 class="text-xl">{{ shoppingList?.attributes?.name }}</h1>
      <Button
        icon="pen"
        classes="w-8 ml-auto"
        @click="navigateToUpdateHandler"
      />
    </div>
    <Loader :is-loading="isLoading">
      <ul :class="[$style['products-list']]">
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
import { defineProps, onMounted, ref } from 'vue';
import router from '@/router';
import { getShoppingList, updateShoppingList, updateProduct } from '@/api';
import { cloneDeep as _cloneDeep } from 'lodash';
import Product from '@/components/Product/Product.vue';
import Loader from '@/components/Loader/Loader.vue';
import {
  Product as ProductModel,
  ProductAttributes,
  ShoppingList
} from '@/types';
import Button from '@/components/Button/Button.vue';

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

const navigateToUpdateHandler = (): void => {
  router.push({
    name: 'Update',
    params: {
      id: shoppingList.value?.id
    }
  });
};

const setLoadingMap = (id: number, isLoading: boolean) =>
  (loadingMap.value[id] = isLoading);

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

  await updateProduct(productId, updatedProduct);

  const updatedProducts: ProductModel[] =
    shoppingList.value.attributes.products.data.map(product => {
      if (product.id !== productId) {
        return product;
      }

      return {
        id: productId,
        attributes: { ...updatedProduct }
      };
    });

  const isShoppingListCompleted =
    updatedProducts.filter(p => p.attributes.completed).length ===
    updatedProducts.length;

  const shoppingListCopy = _cloneDeep(shoppingList.value);
  shoppingListCopy.attributes.products.data = updatedProducts;

  shoppingList.value = shoppingListCopy;

  if (isShoppingListCompleted !== shoppingListCopy?.attributes.completed) {
    shoppingListCopy.attributes.completed = isShoppingListCompleted;
    await updateShoppingList(shoppingListCopy.id, {
      completed: isShoppingListCompleted
    });
  }

  setLoadingMap(productId, false);
};
</script>

<style module>
.wrapper {
  @apply text-orange-400 w-full;
}

.header {
  @apply flex items-center gap-6 mb-8 px-1;
}

.back-button {
  @apply flex items-center justify-center cursor-pointer;
}

.products-list {
  @apply flex flex-col gap-4 overflow-auto animate-fade-out pb-1 px-1;
}
</style>
