<template>
  <div :class="[$style.wrapper]">
    <template v-for="{ label, value, isSelected } in pageButtons" :key="label">
      <button
        v-if="value"
        :class="[
          $style['page-button'],
          { [$style['page-button-selected']]: isSelected }
        ]"
        @click="buttonClickHandler(value)"
      >
        {{ label }}
      </button>
      <div v-else :class="[$style.element]">
        {{ label }}
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'Vue';
import { computed, defineEmits, toRefs } from 'vue';

const FIRST_PAGE_VALUE = 1;
const BUTTONS_AROUND_CURRENT_PAGE = 2;

interface Props {
  page: number;
  pageSize: number;
  total: number;
}

interface PageButton {
  label: string | number;
  value?: number;
  isSelected?: boolean;
}

interface Emits {
  (e: 'changePage', value: number): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const { page, pageSize, total } = toRefs(props);

const pageButtons = computed<PageButton[]>(() => {
  const chunksCount = Math.round(total.value / pageSize.value);

  const buttons: PageButton[] = [];

  //first button
  buttons.push({
    label: 1,
    value: 1,
    isSelected: Number(page.value) === 1
  });

  const buttonsBeforeCurrentPage = getLowestButtonValue();
  const buttonsAfterCurrentPage = getHighestButtonValue(chunksCount);

  if (buttonsBeforeCurrentPage > FIRST_PAGE_VALUE + 1) {
    buttons.push({
      label: '...'
    });
  }

  for (let i = buttonsBeforeCurrentPage; i <= buttonsAfterCurrentPage; i++) {
    buttons.push({
      label: i,
      value: i,
      isSelected: Number(page.value) === Number(i)
    });
  }

  if (buttonsAfterCurrentPage < chunksCount - 1) {
    buttons.push({
      label: '...'
    });
  }

  //last button
  buttons.push({
    label: chunksCount,
    value: chunksCount,
    isSelected: Number(page.value) === chunksCount
  });

  return buttons;
});

const getLowestButtonValue = (): number => {
  const lowestValue = Number(page.value) - BUTTONS_AROUND_CURRENT_PAGE;

  if (lowestValue < FIRST_PAGE_VALUE + 1) {
    return FIRST_PAGE_VALUE + 1;
  }

  return lowestValue;
};

const getHighestButtonValue = (chunksCount: number): number => {
  const highestValue = Number(page.value) + BUTTONS_AROUND_CURRENT_PAGE;

  if (highestValue > chunksCount) {
    return chunksCount - 1;
  }

  return highestValue;
};

const buttonClickHandler = (value: number): void => {
  if (!value) {
    return;
  }

  emit('changePage', value);
};
</script>

<style lang="scss" module>
.wrapper {
  @apply flex gap-1;
}

.element {
  @apply rounded-md h-8 w-8 text-lime-400 transition duration-300 flex items-center justify-center;
}

.page-button {
  @apply border-2 border-gray-300 dark:border-white rounded-xl h-8 w-8 text-dark-mode dark:text-lime-400 transition duration-300;

  &.page-button-selected {
    @apply bg-lime-300 border-lime-400 text-black;
  }
}
</style>
