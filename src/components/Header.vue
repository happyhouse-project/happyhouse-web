<template>
   <header class="shadow bg-white">
      <b-navbar toggleable="lg" id="navbar">
         <b-navbar-brand href="/">
            <div class="logo">
               <router-link to="/"><img class="logo-img" alt="logo" src="../assets/images/logos/full_logo.png"/></router-link>
            </div>
         </b-navbar-brand>

         <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

         <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="navbar-menu">
               <b-nav-item><router-link to="/Apt">아파트</router-link></b-nav-item>
               <b-nav-item><router-link to="#">News</router-link></b-nav-item>
               <b-nav-item><router-link to="#">Notice</router-link></b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
               <b-nav-item v-if="userInfo == null" class="login-tab"><router-link to="/login">로그인</router-link></b-nav-item>
               <b-nav-item v-if="userInfo != null" class="userInfo"
                  ><span class="username">{{ userInfo.name }}님 환영합니다</span></b-nav-item
               >
               <b-nav-item v-if="userInfo != null" class="login-tab">
                  <b-button variant="outline-primary" @click="$store.dispatch('doLogout')"> <b-icon icon="power" aria-hidden="true"></b-icon>로그아웃 </b-button>
               </b-nav-item>
            </b-navbar-nav>
         </b-collapse>
      </b-navbar>
   </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
   computed: {
      ...mapState(['userInfo']),
   },
};
</script>

<style scoped>
header {
   font-family: 'Do Hyeon', sans-serif;
   min-height: 30px;
   font-size: 16px;
   width: 100%;
   position: fixed;
   top: 0;
   left: 0;
   /* display: flex;
   position: relative; */
   border-bottom: solid 1.5px rgb(198, 198, 198);
   background: white;
   z-index: 10;
}

#navbar {
   padding: 5px 20px;
   width: 100%;
}

.navbar-nav .nav-link {
   margin-left: 20px;
}

.logo {
   float: left;
   padding: 10px 10px 3px 10px;
}

.logo-img {
   height: 45px;
}

a {
   color: black;
}

a:hover {
   color: #1075dc;
   text-decoration: none;
}

.login-tab {
   font-size: 16px;
   font-weight: normal;
}

.userInfo {
   margin-top: 2%;
   font-size: 16px;
}

.username {
   color: black;
   font-weight: normal;
}
</style>
