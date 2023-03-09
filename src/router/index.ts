import { createRouter, createWebHistory } from 'vue-router';

const Login = () => import('@/views/Login/Login.vue');
const Home = () => import('@/views/Home/Home.vue');
const ShoppingList = () => import('@/views/ShoppingList/ShoppingList.vue');
const Create = () => import('@/views/Create/Create.vue');
const Update = () => import('@/views/Update/Update.vue');

export enum RoutesNames {
  HOME = 'Home',
  LOGIN = 'Login',
  SHOPPING_LIST = 'ShoppingList',
  CREATE = 'Create',
  UPDATE = 'Update'
}

const routes = [
  {
    path: '/',
    name: RoutesNames.HOME,
    component: Home,
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
