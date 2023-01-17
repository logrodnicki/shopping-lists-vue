import { useStore } from '@/store';
import { toRefs } from 'vue';

export default function useDarkMode() {
  const store = useStore();

  const toggleDarkMode = () => store.toggleDarkMode();

  const { isDarkMode } = toRefs<{ isDarkMode: boolean }>(store.$state);

  return {
    isDarkMode,
    toggleDarkMode
  };
}
