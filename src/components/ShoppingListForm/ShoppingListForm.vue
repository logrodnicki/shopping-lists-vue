<template>
  <div :class="[$style.wrapper]">
    <Box :classes="$style['name-box']">
      <TextInput
        id="name"
        v-model="name"
        placeholder="dinner"
        :type="TextInputTypes.TEXT"
        label="Name"
      />
    </Box>
    <ul v-if="products.length > 0" :class="[$style['products-list']]">
      <ProductForm
        v-for="product in products"
        :key="product.id"
        :product="product"
        @update="updateProductHandler"
        @delete="deleteProductHandler"
      />
    </ul>
    <div :class="[$style['options-buttons']]">
      <Button
        :label="addButtonLabel"
        :icon="'circle-plus'"
        @click="addProductHandler"
      />
    </div>
    <div :class="[$style.buttons]">
      <Button
        :label="cancelButtonLabel"
        :icon="'arrow-left'"
        outline
        @click="cancelHandler"
      />
      <Button
        :label="applyButtonLabel"
        :icon="'floppy-disk'"
        :show-loader="props.isLoading"
        :disabled="props.isDisabled"
        @click="applyHandler"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  ref,
  toRefs,
  watchEffect,
  withDefaults
} from 'vue';
import {
  ProductForm as ProductFormModel,
  TextInputTypes,
  Units
} from '@/types';
import ProductForm from '@/components/ProductForm/ProductForm.vue';
import TextInput from '@/components/Form/TextInput/TextInput.vue';
import Button from '@/components/Button/Button.vue';
import useDarkMode from '@/hooks/useDarkMode';
import { uuid } from '@/utils/common';
import { cloneDeep as _cloneDeep } from 'lodash';
import Box from '@/components/Box/Box.vue';

interface Props {
  products: ProductFormModel[];
  name: string;
  isLoading: boolean;
  isDisabled?: boolean;
  addButtonLabel?: string;
  applyButtonLabel?: string;
  cancelButtonLabel?: string;
}

interface Emits {
  (e: 'update', value: { name: string; products: ProductFormModel[] }): void;

  (e: 'apply'): void;

  (e: 'cancel'): void;
}

const props = withDefaults(defineProps<Props>(), {
  isDisabled: false,
  addButtonLabel: 'New product',
  applyButtonLabel: 'Save',
  cancelButtonLabel: 'Cancel'
});

const emit = defineEmits<Emits>();

const {
  name: initName,
  products: initProducts,
  applyButtonLabel,
  addButtonLabel
} = toRefs(props);

const { isDarkMode } = useDarkMode();

const name = ref(initName.value);
const products = ref<ProductFormModel[]>(initProducts.value);

watchEffect(() => {
  emit('update', { name: name.value, products: products.value });
});

const updateProductHandler = (updatedProduct: ProductFormModel): void => {
  products.value = products.value.map(product => {
    if (product.id !== updatedProduct.id) {
      return product;
    }

    return updatedProduct;
  });
};

const deleteProductHandler = (deletedProductId: string): void => {
  products.value = products.value.filter(
    product => product.id !== deletedProductId
  );
};

const applyHandler = (): void => emit('apply');

const addProductHandler = (): void => {
  const updatedProducts = _cloneDeep(products.value);

  updatedProducts.push({
    id: uuid(),
    name: '',
    amount: 1,
    unit: Units.PC,
    completed: false,
    isNew: true
  });

  products.value = updatedProducts;
};

const cancelHandler = (): void => {
  emit('cancel');
};
</script>

<style module>
.wrapper {
  @apply flex flex-col gap-4;
}

.products-list {
  @apply flex flex-col gap-4 relative;
}

.options-buttons {
  @apply w-full justify-end gap-2 mt-2 grid grid-cols-buttons animate-show-item origin-top;
}

.buttons {
  @apply w-full gap-2 grid grid-cols-buttons mt-8 animate-show-item;
}

.name-box {
  @apply animate-show-item;
}
</style>
