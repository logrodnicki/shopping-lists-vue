<template>
  <div v-click-outside="closeHandler" class="relative">
    <div
      class="flex items-center gap-2 border-2 rounded-md border-gray-500 focus:border-orange-400 text-sm px-2 py-1.5 h-8"
      :class="[isDarkMode ? 'bg-dark-mode text-orange-400' : 'bg-white text-gray-800']"
      @click="toggleMenuHandler"
    >
      <span v-if="modelValue" class="animate-fade-out">{{ modelValue }}</span>
      <input
        type="text"
        :value="searchValue"
        class="outline-none text-gray-500 max-w-full w-0 flex-grow"
        :class="[isDarkMode ? 'bg-dark-mode text-orange-400' : 'bg-white text-gray-800']"
        @change="setSearchValueHandler"
      />
    </div>
    <ul
      v-if="isMenuDisplayed"
      class="absolute w-full p-1.5 mt-1 rounded-md border-2 border-gray-500 animate-fade-out"
      :class="[isDarkMode ? 'bg-dark-mode text-orange-400' : 'bg-white text-gray-800']"
    >
      <li
        v-for="{ label, value } in filteredItems"
        :key="value"
        class="cursor-pointer"
        @click="selectValueHandler(value)"
      >
        {{ label }}
      </li>
      <li v-if="filteredItems.length === 0" class="animate-fade-out">No matches</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from 'vue';
import { SelectItem } from '@/types/select';
import useDarkMode from '@/hooks/useDarkMode';

interface Props {
  items: SelectItem[];
  modelValue: string | number;
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const { isDarkMode } = useDarkMode();

const searchValue = ref<string>('');
const isMenuDisplayed = ref(false);

const filteredItems = computed((): SelectItem[] => {
  if (!searchValue.value) {
    return props.items;
  }

  return props.items.filter(item => item.label.includes(String(searchValue)));
});

const toggleMenuHandler = () => (isMenuDisplayed.value = !isMenuDisplayed.value);

const selectValueHandler = (value: string | number): void => {
  isMenuDisplayed.value = false;
  emit('update:modelValue', value);
};

const setSearchValueHandler = (event: any): void => {
  searchValue.value = (event.target as HTMLInputElement).value;
};

const closeHandler = (): void => {
  isMenuDisplayed.value = false;
};
</script>
