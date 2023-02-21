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
  currentPage: number;
  amountPerPage: number;
  allItemsCount: number;
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

const { currentPage, amountPerPage, allItemsCount } = toRefs(props);

const pageButtons = computed<PageButton[]>(() => {
  const chunksCount = Math.round(allItemsCount.value / amountPerPage.value);

  const buttons: PageButton[] = [];

  //first button
  buttons.push({
    label: 1,
    value: 1,
    isSelected: Number(currentPage.value) === 1
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
      isSelected: Number(currentPage.value) === Number(i)
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
    value: chunksCount
  });

  return buttons;
});

const getLowestButtonValue = (): number => {
  const lowestValue = Number(currentPage.value) - BUTTONS_AROUND_CURRENT_PAGE;

  if (lowestValue < FIRST_PAGE_VALUE + 1) {
    return FIRST_PAGE_VALUE + 1;
  }

  return lowestValue;
};

const getHighestButtonValue = (chunksCount: number): number => {
  const highestValue = Number(currentPage.value) + BUTTONS_AROUND_CURRENT_PAGE;

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
  @apply rounded-md h-8 w-8 text-orange-400 transition duration-300 flex items-center justify-center;
}

.page-button {
  @apply border-2 border-orange-400 rounded-md h-8 w-8 text-orange-400 transition duration-300;

  &.page-button-selected {
    @apply bg-orange-400 text-black;
  }
}
</style>