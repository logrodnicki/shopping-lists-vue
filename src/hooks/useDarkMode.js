import { computed } from 'vue';
import { useStore } from 'vuex';

export default function useDarkMode() {
  const store = useStore();

  const isDarkMode = computed(() => store.state.isDarkMode);

  const toggleDarkMode = () => store.commit('toggleDarkMode');

  return {
    isDarkMode,
    toggleDarkMode
  };
}
