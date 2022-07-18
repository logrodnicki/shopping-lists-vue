<template>
  <li
    class="flex items-center gap-4 rounded-md py-2 px-4"
    :class="[isDarkMode ? 'bg-neutral-800' : 'bg-white']"
    @click="toggleSelectHandler"
  >
    <Checkbox :checked="completed" />
    <div
      class="flex-grow transition-all duration-300"
      :class="[
        completed ? 'text-gray-500 line-through' : isDarkMode ? 'text-white' : 'text-gray-800'
      ]"
    >
      {{ name }}
    </div>
    <Loader :is-loading="isLoading" />
    <div class="text-gray-500 text-sm">{{ amount }} {{ unit }}</div>
  </li>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, toRefs, withDefaults } from 'vue';
import Checkbox from '@/components/Form/Checkbox/Checkbox.vue';
import Loader from '@/components/Loader/Loader.vue';
import useDarkMode from '@/hooks/useDarkMode';
import { Product, ProductAttributes } from '@/types';

interface Props {
  product: Product;
  isLoading?: boolean;
}

interface Emits {
  (
    e: 'toggleSelect',
    { updatedProduct, id }: { updatedProduct: ProductAttributes; id: number }
  ): void;
}

const props = withDefaults(defineProps<Props>(), { isLoading: false });

const { product } = toRefs(props);

const emit = defineEmits<Emits>();

const name = computed(() => product.value.attributes.name);
const completed = computed(() => product.value.attributes.completed);
const amount = computed(() => product.value.attributes.amount);
const unit = computed(() => product.value.attributes.unit);

const { isDarkMode } = useDarkMode();

const toggleSelectHandler = () => {
  emit('toggleSelect', {
    updatedProduct: { ...props.product.attributes, completed: !completed.value },
    id: props.product.id
  });
};
</script>
