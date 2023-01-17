import { createWebHistory, createRouter } from 'vue-router';
import Login from '../views/Login/Login.vue';
import Main from '../views/Main/Main.vue';
import ShoppingList from '../views/ShoppingList/ShoppingList.vue';
import Create from '../views/Create/Create.vue';
import Update from '../views/Update/Update.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: { transition: 'slide-left' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/shopping-list/:id',
    name: 'ShoppingList',
    component: ShoppingList,
    meta: { transition: 'slide-right' },
    props: true
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/update/:id',
    name: 'Update',
    component: Update,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
