<template>
  <div :class="[$style.wrapper]">
    <div :class="$style.content">
      <div :class="[$style['header-wrapper']]">
        <h1
          :class="[
            $style.header,
            isDarkMode
              ? $style['header-dark-mode']
              : $style['header-light-mode']
          ]"
        >
          {{ shoppingList?.attributes?.name }}
        </h1>
        <div :class="$style['buttons-wrapper']">
          <Button
            :classes="$style['back-button']"
            icon="chevron-left"
            @click="backHandler"
          />
          <Button
            :classes="$style['update-button']"
            icon="pen"
            @click="navigateToUpdateHandler"
          />
        </div>
      </div>
      <Loader :is-loading="isLoading">
        <ul :class="[$style['products-list']]">
          <Product
            v-for="(product, index) in shoppingList?.attributes?.products
              ?.data || []"
            :key="product.id"
            :is-loading="loadingMap[product.id]"
            :product="product"
            :visible="index <= counter"
            @toggle-select="toggleSelectProductHandler"
          />
        </ul>
      </Loader>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, onUnmounted, ref } from 'vue';
import router, { RoutesNames } from '@/router';
import { getShoppingList, updateProduct, updateShoppingList } from '@/api';
import { cloneDeep as _cloneDeep } from 'lodash';
import Product from '@/components/Product/Product.vue';
import Loader from '@/components/Loader/Loader.vue';
import {
  Product as ProductModel,
  ProductAttributes,
  ShoppingList
} from '@/types';
import Button from '@/components/Button/Button.vue';
import useDarkMode from '@/hooks/useDarkMode';

const SHOW_ITEM_DELAY = 100;

interface Props {
  id: number;
}

const props = defineProps<Props>();

const shoppingList = ref<ShoppingList | null>(null);
const isLoading = ref(false);
const loadingMap = ref<Record<string, boolean>>({});
const counter = ref(0);

let interval: number;

const { isDarkMode } = useDarkMode();

onMounted(() => {
  fetchShoppingList();

  counter.value = 0;

  interval = setInterval(() => {
    counter.value++;

    if (
      !shoppingList.value?.attributes?.products?.data?.length ||
      counter.value > shoppingList.value?.attributes?.products?.data?.length
    ) {
      clearInterval(interval);
    }
  }, SHOW_ITEM_DELAY);
});

onUnmounted(() => {
  clearInterval(interval);
});

const fetchShoppingList = async (): Promise<void> => {
  isLoading.value = true;

  const response = await getShoppingList(props.id);

  if (!response) {
    return;
  }

  const { data } = response;

  shoppingList.value = data.data;
  isLoading.value = false;
};

const backHandler = () => router.push({ name: RoutesNames.HOME });

const navigateToUpdateHandler = (): void => {
  router.push({
    name: RoutesNames.UPDATE,
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
  @apply w-full max-w-screen-md h-full p-6;
}

.content {
  @apply flex flex-col;
}

.header-wrapper {
  @apply flex items-center justify-between gap-6 mb-8 px-1 animate-show-item;
}

.header {
  @apply text-xl;
}

.header-light-mode {
  @apply text-gray-800;
}

.header-dark-mode {
  @apply text-lime-400;
}

.products-list {
  @apply h-full flex flex-col gap-4 animate-fade-out pb-1 px-1;
}

.buttons-wrapper {
  @apply flex gap-2;
}

.update-button,
.back-button {
  @apply w-8 min-w-0;
}
</style>
