<template>
  <li v-if="visible" :class="[$style.wrapper]" @click="toggleSelectHandler">
    <Checkbox :checked="completed" />
    <div
      :class="[
        $style.name,
        {
          [$style['name-completed']]: completed,
          [$style['name']]: !completed
        }
      ]"
    >
      {{ name }}
    </div>
    <Loader :is-loading="isLoading" />
    <div :class="[$style.amount]">{{ amount }} {{ unit }}</div>
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
  visible?: boolean;
}

interface Emits {
  (
    e: 'toggleSelect',
    { updatedProduct, id }: { updatedProduct: ProductAttributes; id: number }
  ): void;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  visible: true
});

const { product } = toRefs(props);

const emit = defineEmits<Emits>();

const name = computed(() => product.value.attributes.name);
const completed = computed(() => product.value.attributes.completed);
const amount = computed(() => product.value.attributes.amount);
const unit = computed(() => product.value.attributes.unit);

const { isDarkMode } = useDarkMode();

const toggleSelectHandler = () => {
  emit('toggleSelect', {
    updatedProduct: {
      ...props.product.attributes,
      completed: !completed.value
    },
    id: props.product.id
  });
};
</script>

<style module>
.wrapper {
  @apply flex items-center gap-4 rounded-md py-2 px-4 cursor-pointer animate-show-item bg-white shadow-md dark:bg-neutral-800 dark:shadow-none;
}

.name {
  @apply flex-grow transition-all duration-300;
}

.name-completed {
  @apply text-gray-500 line-through;
}

.name {
  @apply text-gray-800 dark:text-white;
}

.amount {
  @apply text-gray-500 text-sm;
}
</style>
