<template>
   <div class="main">
      <div class="infolist">
         <h3><i class="far fa-newspaper"></i> 뉴스</h3>
         <!-- member권한 v-if문 추가하기 -->
         <b-button pill variant="info" v-if="userInfo != null && userInfo.auth == 2" class="addBtn btn-right btn-bottom" type="button" @click="gotoAddNews">
            뉴스 추가하기
         </b-button>
         <hr class="hr-main" />
         <div v-for="(news, index) in newsList" :key="index">
            <p class="my-auto">
               <span class="agency">{{ news.agency }}</span>
               <a :href="news.link" target="_blank">{{ news.title }}</a>
               <span class="date">{{ news.registerDate }}</span>
            </p>
            <hr />
         </div>
      </div>
   </div>
</template>
<script>
import axios from 'axios';
import router from '../router/router';
import { mapState } from 'vuex';

export default {
   data() {
      return {
         member: null,
         newsList: [],
      };
   },
   created() {
      this.getNews();
      this.scrollTop();
   },
   methods: {
      getNews() {
         axios
            .get('http://localhost/news')
            .then((response) => {
               (this.loading = false), (this.newsList = response.data);
            })
            .catch((error) => {
               alert('요청에 실패했습니다.');
               console.log(error);
            });
      },
      gotoAddNews() {
         router.push({ name: 'NewsInfo' });
      },
      scrollTop() {
         window.scrollTo(0, top);
      },
   },
   computed: {
      ...mapState(['userInfo']),
   },
};
</script>
<style scoped>
h3 {
   font-family: 'Do Hyeon' !important;
}

.main {
   height: 100vh;
   background-color: white;
   padding-top: 3%;
   padding-left: 15%;
   padding-right: 15%;
   padding-bottom: 20%;
   font-family: 'Do Hyeon' !important;
   font-size: 14pt;
}
.agency {
   color: #1075dc;
   width: 100px;
   display: inline-block;
   text-align: center;
}

.content {
   text-align: center;
}

.date {
   float: right;
   font-size: 10pt;
   padding-right: 20px;
}

p a {
   margin-left: 10px;
   font-size: 18px;
   color: black;
}

h3 {
   padding: 30px;
   text-align: center;
   font-weight: bold;
}

hr {
   margin: 5px;
}

.navbar {
   margin-left: 42%;
}

input[type='checkbox'] {
   float: right;
   margin-right: 2%;
}

.addBtn {
   font-size: 12px;
}

.btn-right {
   margin-left: 90%;
}

.btn-bottom {
   margin-bottom: 1%;
}

.agency {
   font-size: 12px;
}
</style>
