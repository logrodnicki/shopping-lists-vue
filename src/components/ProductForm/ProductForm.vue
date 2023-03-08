<template>
  <Box
    :classes="[
      $style.box,
      { [$style['box-new']]: isNew, [$style.removing]: isRemovingActive }
    ]"
    list-element
  >
    <div class="flex-grow">
      <TextInput
        id="name"
        v-model="name"
        :disabled="props.disabled"
        :type="TextInputTypes.TEXT"
        placeholder="carrot"
      />
    </div>
    <div class="w-24">
      <TextInput
        id="amount"
        v-model="amount"
        :disabled="props.disabled"
        :type="TextInputTypes.NUMBER"
        placeholder=""
      />
    </div>
    <div class="w-20">
      <Select v-model="unit" :items="units" />
    </div>
    <button
      :class="[
        isDarkMode
          ? $style['delete-button-dark-mode']
          : $style['delete-button-light-mode']
      ]"
      @click="deleteHandler"
    >
      <font-awesome-icon icon="circle-minus" size="lg" />
    </button>
  </Box>
</template>
<script lang="ts" setup>
import { defineEmits, defineProps, ref, toRefs, watch } from 'vue';
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

const isRemovingActive = ref(false);

watch([name, unit, amount], () => {
  changeHandler();
});

const { isDarkMode } = useDarkMode();

const units: SelectItem[] = Object.values(Units).map(value => ({
  value,
  label: value
}));

const deleteHandler = (): void => {
  isRemovingActive.value = true;

  setTimeout(() => {
    isRemovingActive.value = false;
    emit('delete', id.value);
  }, 300);
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

<style module>
@keyframes show {
  from {
    opacity: 0;
    height: 0;
  }

  to {
    height: 64px;
    opacity: 1;
  }
}

@keyframes remove {
  from {
    height: 64px;
  }

  to {
    height: 0;
    opacity: 0;
  }
}

.box {
  @apply flex gap-4 items-center animate-show-item;
}

.box-new {
  animation: show 500ms linear forwards;
}

.removing {
  animation: remove 300ms linear forwards !important;
}

.delete-button-light-mode {
  @apply text-lime-400;
}

.delete-button-dark-mode {
  @apply text-lime-400;
}
</style>
