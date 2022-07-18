import { computed } from 'vue';
// import { useStore } from 'vuex';
import { useStore } from '@/store';

export default function useDarkMode() {
  const store = useStore();

  // const isDarkMode = computed<Boolean>(() => store.state.isDarkMode);

  // const toggleDarkMode = () => store.commit('toggleDarkMode');

  const toggleDarkMode = () => store.toggleDarkMode();

  return {
    isDarkMode: store.isDarkMode,
    toggleDarkMode
  };
}
