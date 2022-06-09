import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      isDarkMode: JSON.parse(localStorage.getItem('darkMode') || 'false')
    };
  },
  mutations: {
    toggleDarkMode(state) {
      localStorage.setItem('darkMode', String(!state.isDarkMode));
      state.isDarkMode = !state.isDarkMode;
    }
  }
});

export default store;
