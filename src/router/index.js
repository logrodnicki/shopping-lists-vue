import { createWebHistory, createRouter } from 'vue-router';
import Login from '../views/Login/Login.vue';
import Main from '../views/Main/Main.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;