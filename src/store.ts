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
    }
  }
});
