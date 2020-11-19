import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import News from '@/views/News.vue'
import NewsInfo from '@/views/NewsInfo.vue'
import Apt from '@/views/Apt.vue'
import Notice from '@/views/Notice.vue'
import NoticeDetail from '@/views/NoticeDetail.vue'
import NoticeRegister from '@/views/NoticeRegister.vue'

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
    path: '/newsInfo',
    name: 'NewsInfo',
    component: NewsInfo,
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
  },
  {
    path: '/noticeDetail/:id',
    name: 'NoticeDetail',
    component: NoticeDetail,
  },
  {
    path: '/noticeRegister',
    name: 'NoticeRegister',
    component: NoticeRegister,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// const router = new VueRouter({
//   routes: routes,
//   scrollBehavior (to, from, savedPosition) {
//     return { x: 0, y: 0 }
//   }
// })
export default router;
