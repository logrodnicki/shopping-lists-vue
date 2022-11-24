import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createPinia } from 'pinia';
import clickOutside from '@/directives/clickOutside';

library.add(fas);

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);

app.component('FontAwesomeIcon', FontAwesomeIcon);

app.directive('click-outside', clickOutside);

app.mount('#app');
