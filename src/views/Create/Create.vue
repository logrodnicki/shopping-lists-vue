<template>
  <div :class="[$style.wrapper]">
    <ShoppingListForm
      v-if="!isSaving"
      :name="shoppingListName"
      :products="products"
      apply-button-label="Update"
      :is-loading="isSaving"
      :is-disabled="isSaving"
      @update="updateHandler"
      @cancel="cancelHandler"
      @apply="saveShoppingListHandler"
    />
    <div v-else>Loading...</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ProductForm as ProductFormModel } from '@/types';
import useDarkMode from '@/hooks/useDarkMode';
import { saveProduct, saveShoppingList } from '@/api';
import router from '@/router';
import ShoppingListForm from '@/components/ShoppingListForm/ShoppingListForm.vue';

const shoppingListName = ref('');
const products = ref<ProductFormModel[]>([]);
const isSaving = ref(false);

const { isDarkMode } = useDarkMode();

const isSaveDisabled = computed(() => {
  return (
    !shoppingListName.value ||
    products.value.length === 0 ||
    products.value.some(product => Number(product.amount) < 1 || !product.name)
  );
});

const updateHandler = ({
  name: updatedName,
  products: updatedProducts
}: {
  name: string;
  products: ProductFormModel[];
}): void => {
  products.value = updatedProducts;
  shoppingListName.value = updatedName;
};

const cancelHandler = (): void => {
  router.back();
};

const saveShoppingListHandler = async (): Promise<void> => {
  if (isSaveDisabled.value) {
    return;
  }

  isSaving.value = true;

  try {
    const response = await saveShoppingList({
      name: shoppingListName.value,
      completed: false
    });

    if (!response) {
      return;
    }

    const {
      data: {
        data: { id: newShoppingListId }
      }
    } = response;

    for (const product of products.value) {
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
        newShoppingListId
      );
    }
  } finally {
    isSaving.value = false;
  }
};
</script>

<style module>
.wrapper {
  @apply w-full max-w-2xl;
}

.buttons {
  @apply w-full flex flex-col gap-2 mt-8;
}
</style>