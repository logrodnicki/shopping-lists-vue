<template>
  <div class="text-orange-400 w-full">
    <div class="flex items-center gap-6 mb-8">
      <button class="flex items-center justify-center cursor-pointer" @click="backHandler">
        <span>
          <font-awesome-icon icon="arrow-left" size="md" />
        </span>
      </button>
      <h1 class="text-xl">{{ shoppingList?.name }}</h1>
    </div>
    <ul class="flex flex-col gap-4">
      <Product v-for="product in shoppingList?.products?.data || []" :key="product.id" :product="product" @toggle-select="toggleSelectProductHandler" />
    </ul>
  </div>

</template>

<script>
import { ref, onMounted } from 'vue';
import router from '@/router';
import { getShoppingList, updateShoppingListProduct } from '@/api';
import { cloneDeep as _cloneDeep } from 'lodash';
import Product from '@/components/ShoppingListProduct/ShoppingListProduct.vue';

export default {
  components: {
    Product
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const shoppingList = ref(null);
    const isLoading = ref(false);

    onMounted(async () => {
      isLoading.value = true;

      const response = await getShoppingList(props.id);

      if (!response) {
        return;
      }

      const {
        data: { data: { attributes } }
      } = response;

      shoppingList.value = attributes;
      isLoading.value = false;
    });

    const backHandler = () => router.push({ name: 'Main' });

    const toggleSelectProductHandler = async ({ id: productId, updatedProduct }) => {
      await updateShoppingListProduct(productId, updatedProduct);

      const updatedProducts = shoppingList.value.products.data.map(product => {
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

    return {
      backHandler,
      shoppingList,
      toggleSelectProductHandler
    };
  }
};
</script>