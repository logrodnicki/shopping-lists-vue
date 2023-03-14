<template>
  <div :class="[$style.wrapper]">
    <ShoppingListForm
      :highlight-empty-fields="highlightEmptyFields"
      :is-disabled="isDisabled"
      :is-loading="isSaving"
      :name="shoppingListName"
      :products="products"
      apply-button-label="Create"
      @apply="saveShoppingListHandler"
      @cancel="cancelHandler"
      @update="updateHandler"
      @after-apply="afterSavingHandler"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ProductForm as ProductFormModel } from '@/types';
import useDarkMode from '@/hooks/useDarkMode';
import router, { RoutesNames } from '@/router';
import ShoppingListForm from '@/components/ShoppingListForm/ShoppingListForm.vue';
import { saveProduct, saveShoppingList } from '@/api';

const shoppingListName = ref('');
const products = ref<ProductFormModel[]>([]);
const isSaving = ref(false);
const highlightEmptyFields = ref(false);

const { isDarkMode } = useDarkMode();

const isDisabled = computed(() => {
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
  highlightEmptyFields.value = false;
};

const cancelHandler = (): void => router.back();

const saveShoppingListHandler = async (): Promise<void> => {
  if (isSaving.value) {
    return;
  }

  if (isDisabled.value) {
    highlightEmptyFields.value = true;
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

const afterSavingHandler = (): void => {
  setTimeout(() => {
    router.push({ name: RoutesNames.HOME });
  }, 1500);
};
</script>

<style module>
.wrapper {
  @apply w-full max-w-screen-md p-6;
}
</style>
