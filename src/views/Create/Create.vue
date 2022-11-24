<template>
  <div class="w-full max-w-2xl">
    <h1 class="text-2xl" :class="[isDarkMode ? 'text-white' : 'text-gray-800']">
      New shopping list ({{ products.length }})
    </h1>
    <div>
      <TextInput
        id="name"
        v-model="shoppingListName"
        placeholder="dinner"
        :type="TextInputTypes.TEXT"
        label="Name"
      />
    </div>
    <ul>
      <NewProduct
        v-for="product in products"
        :key="product.id"
        :product="product"
        @update="updateProductHandler"
        @delete="deleteProductHandler"
      />
    </ul>
    <div class="w-full flex flex-column gap-2 mt-8">
      <Button label="New product" :icon="'circle-plus'" @click="addNewProductHandler" />
      <Button
        label="Save"
        :icon="'floppy-disk'"
        :show-loader="isSaving"
        :disabled="isSaveDisabled"
        @click="saveShoppingListHandler"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Button from '@/components/Button/Button.vue';
import TextInput from '@/components/Form/TextInput/TextInput.vue';
import { NewProduct as NewProductModel, TextInputTypes, Units } from '@/types';
import useDarkMode from '@/hooks/useDarkMode';
import NewProduct from '@/components/NewProduct/NewProduct.vue';
import { uuid } from '@/utils/common';
import { saveProduct, saveShoppingList } from '@/api';

const shoppingListName = ref('');
const products = ref<NewProductModel[]>([]);
const isSaving = ref(false);

const { isDarkMode } = useDarkMode();

const isSaveDisabled = computed(() => {
  if (!shoppingListName.value || products.value.length === 0) {
    return true;
  }

  let isAnyProductEmpty = false;

  products.value.forEach(product => {
    isAnyProductEmpty = Number(product.amount) < 1 || !product.name;
  });

  return isAnyProductEmpty;
});

const addNewProductHandler = (): void => {
  products.value.push({
    id: uuid(),
    name: '',
    amount: 0,
    unit: Units.PC,
    completed: false
  });
};

const updateProductHandler = (updatedProduct: NewProductModel): void => {
  products.value = products.value.map(product => {
    if (product.id !== updatedProduct.id) {
      return product;
    }

    return updatedProduct;
  });
};

const deleteProductHandler = (deletedProductId: string): void => {
  products.value = products.value.filter(product => product.id !== deletedProductId);
};

const saveShoppingListHandler = async (): Promise<void> => {
  if (isSaveDisabled.value) {
    return;
  }

  isSaving.value = true;

  try {
    const response = await saveShoppingList({ name: shoppingListName.value, completed: false });

    if (!response) {
      return;
    }

    const {
      data: {
        data: { id: newShoppingListId }
      }
    } = response;

    for (const product of products.value) {
      const { name: productName, unit: productUnit, amount: productAmount } = product;

      await saveProduct(
        {
          completed: false,
          amount: Number(productAmount),
          name: productName,
          unit: productUnit
        },
        newShoppingListId
      );
    }
  } finally {
    isSaving.value = false;
  }
};
</script>
