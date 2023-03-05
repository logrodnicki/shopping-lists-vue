<template>
  <div :class="[$style.wrapper]">
    <Box :classes="$style['name-box']">
      <TextInput
        id="name"
        v-model="name"
        :type="TextInputTypes.TEXT"
        label="Name"
        placeholder="dinner"
      />
    </Box>
    <ul v-if="products.length > 0" :class="[$style['products-list']]">
      <ProductForm
        v-for="product in products"
        :key="product.id"
        :product="product"
        @delete="deleteProductHandler"
        @update="updateProductHandler"
      />
    </ul>
    <div :class="[$style['options-buttons']]">
      <Button
        :classes="$style['add-button']"
        :icon="'circle-plus'"
        :label="addButtonLabel"
        :use-pending-animation="false"
        @click="addProductHandler"
      />
    </div>
    <div :class="[$style.buttons]">
      <Button
        :classes="$style['back-button-mobile']"
        :icon="'arrow-left'"
        outline
        @click="cancelHandler"
      />
      <Button
        :classes="$style['back-button']"
        :icon="'arrow-left'"
        :label="cancelButtonLabel"
        outline
        @click="cancelHandler"
      />
      <Button
        :classes="$style['apply-button']"
        :disabled="props.isDisabled"
        :icon="'floppy-disk'"
        :label="applyButtonLabel"
        :show-loader="props.isLoading"
        outline
        @click="applyHandler"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
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
  addButtonLabel: 'Add product',
  applyButtonLabel: 'Save',
  cancelButtonLabel: 'Back'
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
  @apply w-full flex justify-end gap-2 mt-2 animate-show-item origin-top;
}

.add-button {
  @apply w-full sm:w-48;
}

.buttons {
  @apply w-full gap-2 flex flex-row mt-8 animate-show-item sm:justify-between;
}

.back-button {
  @apply hidden sm:flex w-48;
}

.back-button-mobile {
  @apply w-8 min-w-0 sm:hidden;
}

.apply-button {
  @apply w-full sm:w-48;
}

.name-box {
  @apply animate-show-item;
}
</style>
