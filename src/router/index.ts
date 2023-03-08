import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login/Login.vue';
import Main from '../views/Main/Main.vue';
import ShoppingList from '../views/ShoppingList/ShoppingList.vue';
import Create from '../views/Create/Create.vue';
import Update from '../views/Update/Update.vue';

export enum RoutesNames {
  MAIN = 'Main',
  LOGIN = 'Login',
  SHOPPING_LIST = 'ShoppingList',
  CREATE = 'Create',
  UPDATE = 'Update'
}

const routes = [
  {
    path: '/',
    name: RoutesNames.MAIN,
    component: Main,
    meta: { transition: 'slide-left' }
  },
  {
    path: '/login',
    name: RoutesNames.LOGIN,
    component: Login
  },
  {
    path: '/shopping-list/:id',
    name: RoutesNames.SHOPPING_LIST,
    component: ShoppingList,
    meta: { transition: 'slide-right' },
    props: true
  },
  {
    path: '/create',
    name: RoutesNames.CREATE,
    component: Create
  },
  {
    path: '/update/:id',
    name: RoutesNames.UPDATE,
    component: Update,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
