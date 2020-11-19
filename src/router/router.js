import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import News from '@/views/News.vue'
import Apt from '@/views/Apt.vue'
import Notice from '@/views/Notice.vue'

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
    path: '/apt',
    name: 'apt',
    component: Apt,
  },
  {
    path: '/notice',
    name: 'Notice',
    component: Notice,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
