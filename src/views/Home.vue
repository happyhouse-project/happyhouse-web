<template>
   <div class="container-fluid p-0">
      <div class="main">
         <!--1. carousel 들어가는 div -->
         <div class="carousel-wrapper">
            <b-carousel id="carousel-fade" style="text-shadow: 0px 0px 2px #000" fade indicators img-width="1410" img-height="400">
               <b-carousel-slide img-src="http://localhost/images/main/slide-1.png"></b-carousel-slide>
               <b-carousel-slide img-src="http://localhost/images/main/slide-2.png"></b-carousel-slide>
            </b-carousel>
         </div>
         <home-search></home-search>
         <div class="container mt-4">
            <div class="row">
               <div class="col">
                  <div class="intro">
                     <span class="title"><i class="fas fa-comments"></i> 소개합니다</span>
                     <hr />
                     <img class="intro-img" alt="intro image" src="@/assets/images/main/about.png" />
                  </div>
               </div>
               <div class="col">
                  <!-- news -->
                  <div class="news">
                     <home-news class="routerNews"></home-news>
                  </div>
               </div>
               <div class="col">
                  <!-- 공지사항 -->
                  <div class="notice">
                     <home-notice class="routerNews"></home-notice>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import HomeNews from '../components/Home/HomeNews.vue';
import HomeNotice from '../components/Home/HomeNotice.vue';
import HomeSearch from '../components/Home/HomeSearch.vue';

export default {
   name: 'Home',
   components: {
      HomeNews,
      HomeNotice,
      HomeSearch,
   },
};
</script>

<style scoped>
body {
   background-color: #f9f9f9;
}

.carousel-wrapper {
   height: 400px;
}

.main {
   height: 110vh;
   padding-bottom: 20%;
}

.menu {
   float: left;
}

.login {
   float: right;
}

.mini {
   font-size: 10px;
}

.login {
   display: inline;
   padding: 20px;
}

.user-greeting {
   float: right;
   padding: 20px;
}

.user-greeting p {
   margin-top: 10px;
   font-size: 14px;
}

.username {
   font-weight: bold;
}

.search {
   height: 120px;
   text-align: center;
   background-color: rgba(66, 66, 255, 0.5);
}

.search input[type='text'] {
   margin-top: 30px;
   width: 600px;
   height: 50px;
   padding: 10px;
   display: inline;
}

.search button {
   width: 80px;
   height: 48px;
   background-color: white;
   border: none;
}

.main-backgound {
   height: 580px;
   background-color: #6666ff;
}

.notice {
   padding: 15px;
   width: 350px;
}

.intro {
   padding: 15px;
}

.news {
   width: 350px;
   height: 486px;
   padding: 15px;
}

.title {
   font-weight: bold;
}

.notice-link {
   font-size: 12px;
   margin-bottom: 12px;
   margin-left: 0px;
}

.notice-link a {
   color: black;
}

.intro-img {
   width: 320px;
}

.addBtn {
   background-color: white;
   border: 1px solid #c9c9c9;
   font-size: 12px;
}

.btn-right {
   margin-left: 92%;
}

.ntc-news-title {
   overflow: hidden;
   text-overflow: ellipsis;
   display: block;
   white-space: nowrap;
}

.carousel-item {
   height: 400px;
}

.carousel-item img {
   height: 400px;
}

.routerNews {
   /* background-color: red; */
   height: 440px;
}
</style>
