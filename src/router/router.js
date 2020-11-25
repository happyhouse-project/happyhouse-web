import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Home from '@/views/Home.vue'
import News from '@/views/News.vue'
import NewsInfo from '@/views/NewsInfo.vue'
import Apt from '@/views/Apt.vue'
import Notice from '@/views/Notice.vue'
import NoticeDetail from '@/views/NoticeDetail.vue'
import NoticeRegister from '@/views/NoticeRegister.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import RegisterConfirm from '../views/RegisterConfirm.vue'
import AptChart from '../views/AptChart.vue'
import Intro from '../views/Intro.vue'

Vue.use(VueRouter);

const onlyAuthUser = (to, from, next) => {
  if(localStorage.getItem("accessToken") !== null) {
    next()    
  } else {
    alert("로그인이 필요한 페이지입니다. ")
    // alert(store.state.userInfo)
    next("/login")
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      header: Header,
      default: Home,
      footer: Footer,
    },
  },
  {
    path: '/news',
    name: 'News',
    components: {
      header: Header,
      default: News,
      footer: Footer,
    },
  },
  {
    path: '/newsInfo',
    name: 'NewsInfo',
    components: {
      header: Header,
      default: NewsInfo,
      footer: Footer,
    },
  },
  {
    path: '/notice',
    name: 'Notice',
    components: {
      header: Header,
      default: Notice,
      footer: Footer,
    },
  },
  {
    path: '/noticeDetail/:id',
    name: 'NoticeDetail',
    components: {
      header: Header,
      default: NoticeDetail,
      footer: Footer,
    },
  },
  {
    path: '/noticeRegister',
    name: 'NoticeRegister',
    beforeEnter: onlyAuthUser,
    components: {
      header: Header,
      default: NoticeRegister,
      footer: Footer,
    },
  },
  {
    path: '/login',
    name: 'Login',
    components: {
      header: Header,
      default: Login,
      footer: Footer,
    },
  },
  {
    path: '/register',
    name: 'Register',
    components: {
      header: Header,
      default: Register,
      footer: Footer,
    },
  },
  {
    path: '/registerConfirm',
    name: 'RegisterConfirm',
    components: {
      default: RegisterConfirm,
    },
  },
  {
    path: '/apt',
    name: 'Apt',
    components: {
      header: Header,
      default: Apt,
    },
  },
  {
    path: '/chart',
    name: 'AptChart',
    components: {
      header: Header,
      default: AptChart,
      footer: Footer,
    },
  },
  {
    path: '/intro',
    name: 'Intro',
    components: {
      header: Header,
      default: Intro,
    },
  }
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
