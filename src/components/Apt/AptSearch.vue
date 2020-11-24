<template>
   <div class="AptSearch">
      <div class="searchInput shadow-lg bg-white">
         <div class="mapType-wrappter">
            <button @click="callMapType('normal')" style="font-size:5pt">보통지도</button>
            <button @click="callMapType('hybrid')" style="font-size:5pt">스카이뷰</button>
            <button @click="callMapType('terrain')" style="font-size:5pt">지형정보</button>
            <button @click="callMapType('use_district')" style="font-size:5pt">지적편집도</button>
         </div>
         <input type="text" placeholder="아파트명을 입력하세요" name="search" v-model="aptName" @keyup.enter="searchAptName" />
         <i v-show="isShow" class="fas fa-times close-icon" @click="clear"></i>
         <button type="button" @click="searchAptName">
            <i class="fa fa-search" style="color:white"></i>
         </button>
      </div>

      <!-- <div class="search-wrap">
         <div class="input-field">
            <input id="search" type="text" placeholder="입력하세요" v-model="aptName" @keyup.enter="searchAptName"/>
         </div>
         <button class="btn-search" type="button" @click="searchAptName">
            <i class="fas fa-search-location"></i>
         </button>
      </div> -->

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

export default {
   name: 'SideInfo',
   data: () => {
      return {
         aptName: '',
         aptList: [],
         selectedBox: false,
         isShow: false,
      };
   },
   methods: {
      searchAptName() {
         if (this.aptName == '') {
            alert('검색어를 입력하세요');
            return;
         }

         axios
            .get('http://localhost/happyhouse/house/search/apt/' + this.aptName)
            .then((response) => {
               (this.loading = false), (this.aptList = response.data);
               this.selectedBox = true;

               if (this.aptList.length == 0) {
                  this.aptList.push({
                     aptName: '검색결과가 없습니다.',
                  });
               }
            })
            .catch((error) => {
               alert('요청에 실패했습니다.');
               console.log(error);
            });
         this.isShow = true;
      },
      searchApt(no) {
         this.$emit('searchApt', no);
         this.isShow = false;
         this.aptName = '';
      },
      clear() {
         this.aptName = '';
         this.isShow = false;
      },

      //지도 타입 변경 부모 호출
      callMapType(type) {
         this.$emit('changeMapFlag', type);
      },
   },
   updated() {
      // 입력창을 지우면 select box가 사라짐
      if (this.aptName == undefined || this.aptName == '') {
         this.selectedBox = false;
      }
   },
};
</script>

<style>
.AptSearch {
   /* display: inline-block; */
   position: absolute;
   margin-top: 10px;
   margin-left: 10px;
   left: 0;
   height: auto;
   width: 300px;
   z-index: 8;
   /* background-color: white; */
   /* border-radius: 5px; */
   /* border: 1px solid rgba(0, 0, 0, 0.15); */
   /* box-shadow: 0px 4px 10px 0px #00000021; */
   /* border: 1px solid rgb(211, 211, 211); */
}

.searchInput {
   width: 300px;
   /* height: 100px; */
}

.AptSearch input[type='text'] {
   /* margin-top: 30px; */
   width: 200px;
   height: 50px;
   padding: 10px;
   display: inline;
   border: 0px;
   margin-left: 13px;
}

/* 클릭시 테두리 지우기 */
.AptSearch input:focus {
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

.searchInput > button {
   float: right;
   width: 60px;
   height: 50px;
   background-color: #1075dc;
   border: none;
}

.searchResult {
   overflow-y: auto;
   min-height: 40px;
   max-height: 240px;
   width: 240px;
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
