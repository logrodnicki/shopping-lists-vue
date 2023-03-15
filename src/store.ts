import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => {
    return {
      isDarkMode: JSON.parse(localStorage.getItem('darkMode') || 'false')
    };
  },
  getters: {
    getIsDarkMode: state => state.isDarkMode
  },
  actions: {
    toggleDarkMode() {
      localStorage.setItem('darkMode', String(!this.isDarkMode));
      this.isDarkMode = !this.isDarkMode;

      const root = window.document.documentElement;
      root.classList.toggle('dark');
      root.setAttribute('data-mode', this.isDarkMode ? 'dark' : 'light');
    },
    initDarkMode() {
      const root = window.document.documentElement;

      if (this.isDarkMode) {
        root.classList?.add('dark');
      }

      root.setAttribute('data-mode', this.isDarkMode ? 'dark' : 'light');
    }
  }
});
