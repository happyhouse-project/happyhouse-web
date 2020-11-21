<template>
   <div class="container-fluid p-0">
      <div class="main">
         <!--1. carousel 들어가는 div -->
         <div>
            <b-carousel id="carousel-fade">
               <b-carousel-slide img-src="http://localhost/happyhouse/static/images/b.jpg"></b-carousel-slide>
               <b-carousel-slide img-src="http://localhost/happyhouse/static/images/bg-image2.png"></b-carousel-slide>
               <b-carousel-slide img-src="http://localhost/happyhouse/static/images/bg-image3.jpg"></b-carousel-slide>
            </b-carousel>
         </div>
         <div class="search">
            <form action="#">
               <input type="text" placeholder="원하시는 아파트명, 주택명을 입력해주세요" name="search" />
               <button type="button" onclick="location.href = 'apt.html'">
                  <i class="fa fa-search"></i>
               </button>
            </form>
         </div>
         <div class="container">
            <div class="row">
               <div class="col">
                  <div class="intro">
                     <span class="title">소개할게요</span>
                     <hr />
                     <img class="intro-img" alt="intro image" src="../assets/images/intro.jpg" />
                  </div>
               </div>
               <div class="col">
                  <!-- news -->
                  <div class="news">
                     <home-news></home-news>
                  </div>
               </div>
               <div class="col">
                  <!-- 공지사항 -->
                  <div class="notice">
                     <home-notice></home-notice>
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

export default {
   name: 'Home',
   components: {
      HomeNews,
      HomeNotice,
   },
};
</script>

<style scoped>
body {
   background-color: #f9f9f9;
}

.main {
   height: 1000px;
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
   height: 220px;
}

.addBtn {
   background-color: white;
   border: 1px solid #c9c9c9;
   font-size: 12px;
}

.notice-add-btn {
   margin-left: 60%;
}

.news-add-btn {
   margin-left: 70%;
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
</style>
