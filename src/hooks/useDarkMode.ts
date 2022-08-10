import { useStore } from '@/store';
import { toRefs } from 'vue';

export default function useDarkMode() {
  const store = useStore();

  const toggleDarkMode = () => store.toggleDarkMode();

  const { isDarkMode } = toRefs(store.$state);

  return {
    isDarkMode,
    toggleDarkMode
  };
}
