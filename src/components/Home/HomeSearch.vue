<template>
   <div class="search">
      <div class="searchInput shadow-lg bg-white">
         <input type="text" placeholder="원하시는 아파트명을 입력해주세요" name="search" v-model="keyword" @keyup.enter="searchAptKeyword" />
         <i v-show="isShow" class="fas fa-times close-icon" @click="clear"></i>
         <button type="button" @click="searchAptKeyword">
            <i class="fa fa-search"></i>
         </button>
      </div>

      <div v-show="isShow" class="searchResult shadow-lg">
         <div v-for="apt in aptList" :key="apt.no">
            <div class="searchResult-box" @click="searchApt(apt.no)">
               <div class="result-wrapper">
                  <p class="result-name">{{ apt.aptName }}</p>
                  <p class="result-dong">{{ apt.dong }}</p>
               </div>
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
         if (this.keyword == '') {
            alert('검색어를 입력하세요');
            return;
         }

         axios
            .get('http://localhost/house/search/apt/' + this.keyword)
            .then((response) => {
               (this.loading = false), (this.aptList = response.data);
               // console.log(this.aptList);

               if (this.aptList.length == 0) {
                  this.aptList.push({
                     no: -1,
                     aptName: '검색결과가 없습니다.',
                  });
               }
            })
            .catch((error) => {
               alert('요청에 실패했습니다.');
               console.log(error);
            });

         this.isShow = true; // 검색결과 표시를 위한 isShow
      },

      searchApt(no) {
         if (no == -1) {
            this.clear();
            return;
         }
         router.push({ name: 'Apt', params: { no: no } });
      },

      clear() {
         this.keyword = '';
         this.isShow = false;
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
   display: flex;
   justify-content: space-between;
   align-items: center;
}

.search input[type='text'] {
   display: inline;
   /* margin-top: 30px; */
   width: 80%;
   height: 50px;
   padding: 10px;
   display: inline;
   border: 0px;
   margin-left: 13px;
}

/* 클릭시 테두리 지우기 */
.search input:focus {
   outline: none;
}

.close-icon {
   color: rgb(186, 186, 186);
   margin-right: 9.5px;
   display: inline;
}

.close-icon :hover {
   color: rgb(138, 136, 136);
}

.search button {
   float: right;
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
