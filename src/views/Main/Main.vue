<template>
  <div class="w-full">
    <Lists :lists="lists" />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getShoppingLists } from '@/api';
import { Lists } from '@/components';

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

        console.log('RES');
        console.log(response);

        if (!response) {
          return;
        }

        const {
          data: { data }
        } = response;

        lists.value = data;
        console.log(data);
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
