<template>
   <div class="search ">
      <div class="searchInput shadow-lg bg-white">
         <input type="text" placeholder="원하시는 아파트명, 주택명을 입력해주세요" name="search" v-model="keyword" @keyup.enter="searchAptKeyword" />
         <button type="button" @click="searchAptKeyword">
            <i class="fa fa-search"></i>
         </button>
      </div>
      <!-- select -->
      <div v-show="isShow" class="searchResult shadow-lg">
         <div v-for="apt in aptList" :key="apt.no">
            <div class="searchResult-box" @click="searchApt(apt.no)">
               <div class="result-wrapper">
                  <p class="result-name">{{ apt.aptName }}</p>
                  <p class="result-dong">{{ apt.dong }}</p>
               </div>

               <!-- <div class="result-name">
                  <span>{{ apt.aptName }}</span>
               </div>
               <div class="result-dong">
                  <span>{{ apt.dong }}</span>
               </div> -->
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from 'axios';
import router from '../../router/router';

export default {
   data() {
      return {
         loading: true,
         keyword: '',
         aptList: [],
         isShow: false,
      };
   },
   methods: {
      searchAptKeyword() {
         axios
            .get('http://localhost/happyhouse/house/search/apt/' + this.keyword)
            .then((response) => {
               (this.loading = false), (this.aptList = response.data);
               console.log(this.aptList);
            })
            .catch((error) => {
               alert('요청에 실패했습니다.');
               console.log(error);
            });

         this.isShow = true; // 검색결과 표시를 위한 isShow
      },

      searchApt(no) {
         router.push({ name: 'Apt', params: { no: no } });
      },
   },
};
</script>

<style scoped>
.search {
   position: absolute;
   top: 420px;
   left: 50%;
   height: 50px !important;
   text-align: center;
   /* background-color: rgba(255, 42, 42, 0.694) !important; */
   width: 500px;
   margin: 0px auto;
   z-index: 5;
   transform: translate(-50%, -50%);
}

.searchInput {
   width: 500px;
}

.search input[type='text'] {
   /* margin-top: 30px; */
   width: 80%;
   height: 50px;
   padding: 10px;
   display: inline;
   border: 0px;
}

.search button {
   width: 70px;
   height: 48px;
   background-color: white;
   border: none;
}

.searchResult {
   overflow-y: auto;
   min-height: 40px;
   max-height: 240px;
   width: 90%;
   display: inline-block;
   /* margin-top: 2px; */
   margin-right: 100px;
}

.searchResult-box {
   padding-top: 8px;
   height: 60px;
   z-index: 100;
   background-color: white;
   /* border: 1px solid black; */
   border: 0;
   width: 100%;
   position: relative;
   /* display: flex; */
   /* flex-direction: column; */
   /* justify-content: flex-start; */
   /* float: left; */
   cursor: pointer;
   border-bottom: 1px solid rgb(227, 227, 227);
}
.result-wrapper {
   margin-top: 2px;
   margin-left: 25px;
   float: left;
}

.searchResult :hover {
   background-color: rgb(232, 232, 232) !important;
}

.result-dong {
   float: left;
   font-size: 9pt;
   color: rgb(96, 96, 96);
}

.result-name {
   font-size: 11pt;
   font-weight: 600;
   margin-bottom: 0;
}
</style>
