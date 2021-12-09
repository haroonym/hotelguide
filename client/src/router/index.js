import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';
import Details from '../views/Details.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/details/:hotel_id',
    name: 'Details',
    component: Details,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
