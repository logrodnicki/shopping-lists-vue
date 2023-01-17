<template>
  <Box classes="flex gap-4 items-center" list-element>
    <div class="flex-grow">
      <TextInput
        id="name"
        v-model="name"
        placeholder="carrot"
        :type="TextInputTypes.TEXT"
        :disabled="props.disabled"
      />
    </div>
    <div class="w-24">
      <TextInput
        id="amount"
        v-model="amount"
        placeholder=""
        :type="TextInputTypes.NUMBER"
        :disabled="props.disabled"
      />
    </div>
    <div class="w-20">
      <Select v-model="unit" :items="units" />
    </div>
    <button
      :class="[isDarkMode ? 'text-orange-400' : 'text -orange-400']"
      @click="deleteHandler"
    >
      <font-awesome-icon icon="circle-minus" size="lg" />
    </button>
  </Box>
</template>
<script lang="ts" setup>
import { defineProps, toRefs, defineEmits, watch } from 'vue';
import TextInput from '@/components/Form/TextInput/TextInput.vue';
import { ProductForm, TextInputTypes, Units } from '@/types';
import useDarkMode from '@/hooks/useDarkMode';
import Select from '@/components/Form/Select/Select.vue';
import Box from '@/components/Box/Box.vue';
import { SelectItem } from '@/types/select';

interface Props {
  product: ProductForm;
  disabled?: boolean;
}

interface Emits {
  (e: 'update', value: ProductForm): void;
  (e: 'delete', value: string | number): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const { id, name, unit, amount, completed, isNew } = toRefs(props.product);

watch([name, unit, amount], () => {
  changeHandler();
});

const { isDarkMode } = useDarkMode();

const units: SelectItem[] = Object.values(Units).map(value => ({
  value,
  label: value
}));

const deleteHandler = (): void => {
  emit('delete', id.value);
};

const changeHandler = (): void => {
  emit('update', {
    id: id.value,
    amount: amount.value,
    unit: unit.value,
    name: name.value,
    completed: completed.value,
    isNew: isNew?.value
  });
};
</script>
