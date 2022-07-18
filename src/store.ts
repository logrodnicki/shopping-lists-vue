import { createStore } from 'vuex';
import { defineStore } from 'pinia';

// const store = createStore({
//   state() {
//     return {
//       isDarkMode: JSON.parse(localStorage.getItem('darkMode') || 'false')
//     };
//   },
//   mutations: {
//     toggleDarkMode(state) {
//       localStorage.setItem('darkMode', String(!state.isDarkMode));
//       state.isDarkMode = !state.isDarkMode;
//     }
//   }
// });
//
// export default store;

export const useStore = defineStore('main', {
  state: () => {
    return {
      isDarkMode: JSON.parse(localStorage.getItem('darkMode') || 'false')
    };
  },
  actions: {
    toggleDarkMode() {
      localStorage.setItem('darkMode', String(!this.isDarkMode));
      this.isDarkMode = !this.isDarkMode;
    }
  }
});
