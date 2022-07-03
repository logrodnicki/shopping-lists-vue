<template>
  <li
    class="rounded-xl shadow-gray-300 px-3 py-2 box-border flex items-center gap-4 cursor-pointer"
    :class="[isDarkMode ? 'bg-neutral-800' : $style['light-mode']]"
    @click="selectHandler"
  >
    <Checkbox :checked="completed" />
    <div class="flex flex-col mr-auto">
      <span :class="[isDarkMode ? 'text-orange-400' : 'text-gray-800']">{{ name }}</span>
      <span class="text-xs text-gray-500">{{ productsCount }} products</span>
    </div>
    <div class="text-gray-500">
      <font-awesome-icon icon="chevron-right" size="xs" />
    </div>
  </li>
</template>

<script setup>
import { defineProps, toRefs } from 'vue';
import useDarkMode from '@/hooks/useDarkMode';
import router from '@/router';
import Checkbox from '@/components/Form/Checkbox/Checkbox.vue';

const props = defineProps({
  list: {
    type: Object,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
});

const {
  list: {
    value: {
      name,
      completed,
      products: { data: listProducts }
    }
  }
} = toRefs(props);

const { isDarkMode } = useDarkMode();

const productsCount = listProducts.length;

const selectHandler = () => router.push({ name: 'ShoppingList', params: { id: props.id } });
</script>

<style module>
.light-mode {
  @apply bg-white;
}
</style>
