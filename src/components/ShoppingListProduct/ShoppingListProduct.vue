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
    <div class="text-gray-500 text-sm">{{ amount }} {{ unit }}</div>
  </li>
</template>

<script setup>
import { defineProps, defineEmits, computed, toRefs } from 'vue';
import Checkbox from '@/components/Form/Checkbox/Checkbox.vue';
import useDarkMode from '@/hooks/useDarkMode';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const { product } = toRefs(props);

const emit = defineEmits(['toggleSelect']);

const name = computed(() => product.value.attributes.name);
const completed = computed(() => product.value.attributes.completed);
const amount = computed(() => product.value.attributes.amount);
const unit = computed(() => product.value.attributes.unit);

const { isDarkMode } = useDarkMode();

const toggleSelectHandler = () =>
  emit('toggleSelect', {
    updatedProduct: { ...props.product.attributes, completed: !completed.value },
    id: props.product.id
  });
</script>
