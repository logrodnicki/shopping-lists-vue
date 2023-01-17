<template>
  <div class="w-full max-w-2xl">
    <ShoppingListForm
      v-if="!isLoading"
      :name="name"
      :products="products"
      apply-button-label="Update"
      :is-loading="isLoading || isUpdating"
      :is-disabled="isDisabled || isUpdating"
      @update="updateHandler"
      @cancel="cancelHandler"
      @apply="applyHandler"
    />
    <div v-else>Loading...</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, onMounted, ref } from 'vue';
import { Product, ProductForm, ShoppingList } from '@/types';
import {
  deleteProduct,
  getShoppingList,
  saveProduct,
  updateProduct,
  updateShoppingList
} from '@/api';
import ShoppingListForm from '@/components/ShoppingListForm/ShoppingListForm.vue';
import router from '@/router';
import { isEqual as _isEqual } from 'lodash';

interface Props {
  id: string;
}

const props = defineProps<Props>();

const shoppingList = ref<ShoppingList | null>(null);
const isLoading = ref(false);
const isUpdating = ref(false);

const products = ref<ProductForm[]>([]);
const name = ref('');

onMounted(async () => {
  isLoading.value = true;

  try {
    const response = await getShoppingList(Number(props.id));

    if (!response?.data) {
      return null;
    }

    shoppingList.value = response.data.data;

    const {
      attributes: { name: shoppingListName, products: shoppingListProducts }
    } = response.data.data;

    name.value = shoppingListName;
    products.value = (shoppingListProducts.data as Product[]).map(product => ({
      id: product.id,
      isNew: false,
      ...product.attributes
    }));
  } finally {
    isLoading.value = false;
  }
});

const isDisabled = computed(() => {
  return (
    !name.value ||
    products.value.length === 0 ||
    products.value.some(product => !product.name || Number(product.amount) < 1)
  );
});

const updateHandler = ({
  name: updatedName,
  products: updatedProducts
}: {
  name: string;
  products: ProductForm[];
}): void => {
  products.value = updatedProducts;
  name.value = updatedName;
};

const cancelHandler = (): void => {
  router.back();
};

const applyHandler = async (): Promise<void> => {
  if (!shoppingList?.value?.id || isUpdating.value || isLoading.value) {
    return;
  }

  isUpdating.value = true;

  try {
    if (shoppingList.value.attributes.name !== name.value) {
      await updateShoppingList(Number(shoppingList.value.id), {
        name: name.value,
        completed: false
      });
    }

    const mappedOldProducts = (
      shoppingList.value.attributes.products.data as Product[]
    ).map(product => ({
      id: product.id,
      isNew: false,
      ...product.attributes
    }));

    if (_isEqual(products.value, mappedOldProducts)) {
      return;
    }

    const updatedProductsIds = products.value
      .map(product => {
        return product.isNew ? null : product.id;
      })
      .filter(productId => productId);

    const addedProducts = products.value.filter(product => product.isNew);
    const updatedProducts = products.value.filter(product => !product.isNew);
    const deletedProducts = shoppingList.value?.attributes.products.data.filter(
      product => !updatedProductsIds.includes(product.id)
    );

    for (const product of addedProducts) {
      const {
        name: productName,
        unit: productUnit,
        amount: productAmount
      } = product;

      await saveProduct(
        {
          completed: false,
          amount: Number(productAmount),
          name: productName,
          unit: productUnit
        },
        shoppingList.value.id
      );
    }

    for (const product of updatedProducts) {
      const {
        name: productName,
        unit: productUnit,
        amount: productAmount,
        id: productId
      } = product;

      await updateProduct(productId, {
        completed: false,
        amount: Number(productAmount),
        name: productName,
        unit: productUnit
      });
    }

    for (const product of deletedProducts) {
      await deleteProduct(product.id);
    }
  } finally {
    isUpdating.value = false;
  }
};
</script>
