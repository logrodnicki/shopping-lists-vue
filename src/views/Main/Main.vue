<template>
  <div class="w-full">
    <Lists :lists="lists" />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getShoppingLists } from '@/api';
import Lists from '@/components/Lists/Lists.vue';

export default {
  components: {
    Lists
  },
  setup() {
    const lists = ref([]);
    const isLoading = ref(false);

    onMounted(async () => {
      isLoading.value = true;

      try {
        const response = await getShoppingLists();

        if (!response) {
          return;
        }

        const {
          data: { data }
        } = response;

        lists.value = data;
      } catch (error) {
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    });

    return {
      lists
    };
  }
};
</script>
