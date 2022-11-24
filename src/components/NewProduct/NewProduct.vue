<template>
  <li class="list-none flex gap-4 items-center animate-fade-out">
    <div class="flex-grow">
      <TextInput id="name" v-model="name" placeholder="carrot" :type="TextInputTypes.TEXT" />
    </div>
    <div class="w-24">
      <TextInput id="amount" v-model="amount" placeholder="" :type="TextInputTypes.NUMBER" />
    </div>
    <div class="w-20">
      <Select v-model="unit" :items="units" />
    </div>
    <button :class="[isDarkMode ? 'text-orange-400' : 'text -orange-400']" @click="deleteHandler">
      <font-awesome-icon icon="circle-minus" size="lg" />
    </button>
  </li>
</template>
<script lang="ts" setup>
import { defineProps, toRefs, defineEmits, watchEffect } from 'vue';
import TextInput from '@/components/Form/TextInput/TextInput.vue';
import { NewProduct, TextInputTypes, Units } from '@/types';
import useDarkMode from '@/hooks/useDarkMode';
import Select from '@/components/Form/Select/Select.vue';
import { SelectItem } from '@/types/select';

interface Props {
  product: NewProduct;
}

interface Emits {
  (e: 'update', value: NewProduct): void;
  (e: 'delete', value: string): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const { id, name, unit, amount, completed } = toRefs(props.product);

watchEffect((): void => {
  emit('update', {
    id: id.value,
    amount: amount.value,
    unit: unit.value,
    name: name.value,
    completed: completed.value
  });
});

const { isDarkMode } = useDarkMode();

const units: SelectItem[] = Object.values(Units).map(value => ({
  value,
  label: value
}));

const deleteHandler = (): void => {
  emit('delete', id.value);
};
</script>
