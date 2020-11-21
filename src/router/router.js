import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import News from '@/views/News.vue'
import Apt from '@/views/Apt_ori.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/news',
    name: 'News',
    component: News,
  },
  {
    path: '/Apt',
    name: 'Apt',
    component: Apt,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
