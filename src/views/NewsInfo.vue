<template>
   <div class="main">
      <div class="infolist">
         <h3>뉴스</h3>
         <hr class="hr-main" />
         <div v-for="(news, index) in newsList" :key="index">
            <p class="my-auto">
               <!-- {news.title}###${news.link}###${news.category} -->
               <span class="agency">{{ news.agency }}</span>
               <a :href="news.link" target="_blank">{{ news.title }}</a>
               <input style="float:right" type="checkbox" name="newsInfo" v-model="checkNews" :value="news.title + '###' + news.link + '###' + news.title + '###' + news.agency" />
               <span class="date">{{ news.registerDate }}</span>
            </p>
            <hr />
         </div>
      </div>
      <div class="add-btn">
         <button type="button" class="btn btn-success" @click="addNews()">추가하기</button>
      </div>
      <div class="navbar">
         <nav aria-label="Page navigation example">
            <ul class="pagination">
               <li class="page-item" v-if="page != 1"><a class="page-link" @click="pageMove(page - 1)">Previous</a></li>
               <li class="page-item" v-if="page <= endPage">
                  <a class="page-link" @click="pageMove(page)">{{ page }}</a>
               </li>
               <li class="page-item" v-if="page + 1 <= endPage">
                  <a class="page-link" @click="pageMove(page + 1)">{{ page + 1 }}</a>
               </li>
               <li class="page-item" v-if="page + 2 <= endPage">
                  <a class="page-link" @click="pageMove(page + 2)">{{ page + 2 }}</a>
               </li>
               <li class="page-item" v-if="page + 3 <= endPage">
                  <a class="page-link" @click="pageMove(page + 3)">{{ page + 3 }}</a>
               </li>
               <li class="page-item" v-if="page + 4 <= endPage">
                  <a class="page-link" @click="pageMove(page + 4)">{{ page + 4 }}</a>
               </li>
               <li class="page-item" v-if="page + 5 <= endPage"><a class="page-link" @click="pageMove(page + 5)">Next</a></li>
            </ul>
         </nav>
      </div>
   </div>
</template>
<script>
import axios from 'axios';
import router from '../router/router';

export default {
   data() {
      return {
         page: 1,
         endPage: 0,
         loading: true,
         newsList: [],
         checkNews: [],
      };
   },
   created() {
      this.getEndPage();
      this.getNews(this.page);
   },
   methods: {
      getEndPage() {
         axios
            .get('http://localhost/news/crawling/endPage')
            .then((response) => {
               this.endPage = response.data;
            })
            .catch((error) => {
               alert('요청에 실패했습니다.');
               console.log(error);
            });
      },
      getNews() {
         axios
            .get('http://localhost/news/crawling/' + this.page)
            .then((response) => {
               this.loading = false;
               this.newsList = response.data;
            })
            .catch((error) => {
               alert('요청에 실패했습니다.');
               console.log(error);
            });
      },
      addNews() {
         axios
            .post('http://localhost/news/', JSON.stringify(this.checkNews), { headers: { 'Content-Type': 'application/json' } })
            .then(() => {
               alert('뉴스에 추가되었습니다');
               router.push({ name: 'News' });
            })
            .catch((error) => {
               alert('요청에 실패했습니다.');
               console.log(error);
            });
      },
      pageMove(page) {
         this.page = page;
         this.getNews(this.page);
      },
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
   overflow-y: auto;
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
   font-size: 14px;
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
   background-color: white;
   border: 1px solid #c9c9c9;
   font-size: 12px;
}

.btn-right {
   margin-left: 90%;
}

.btn-bottom {
   margin-bottom: 1%;
}

.page-link {
   cursor: pointer;
}

.agency {
   font-size: 12px;
}

.add-btn {
   text-align: right;
}
</style>
