<template>
   <div class="info">
      <button class="close" @click="closeSideInfo"></button>
      <b-card :title="getAptName" :img-src="getImage" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
         <b-card-text class="card-wrapper">
            <b-button size="sm" pill variant="outline-secondary" disabled="disabled" style="font-size:8pt;"> {{ sendData.dong }}&nbsp;{{ sendData.jibun }} </b-button>
            <b-button size="sm" pill variant="outline-secondary" disabled="disabled" style="margin-left:4px; font-size:8pt">
               {{ sendData.buildYear }}
            </b-button>
            <b-button size="sm" pill variant="outline-success" style="font-size:8pt; font-weight:600; margin-left:4px;"> 안전지수 {{getSafetyPoint}} </b-button>
            <b-button size="sm" pill variant="outline-primary" style="font-size:8pt; font-weight:600; margin-left:4px;"> 평점 {{getAvgRating}} </b-button>
            <hr />
            <b>거래 내역</b><br />
            <div class="dealTable">
               <b-table striped hover :items="getDealTable" :fields="fields"></b-table>
            </div>
            <hr />
            <b>사용자 리뷰</b><br />
            <div class="reviewTable">
               <div class="review-wrapper">
                  <div class="reviewRow" v-for="review in getReviews" :key="review.id">
                     <span class="left">
                        <p>"{{ review.content }}"</p>
                        <p>{{ review.writer }}</p>
                     </span>
                     <span class="right">
                        <b-button size="sm" pill variant="outline-success" disabled="disabled">{{ review.rating }}</b-button>
                     </span>
                  </div>
               </div>
            </div>
            <div class="reviewFooter">
               <div class="footer-wrapper">
                  <div class="left">
                     <i class="fas fa-pen-square fa-2x" @click="reviewWindow"></i>
                  </div>
                  <div class="right" style="color:grey; font-weight:600">
                     * 안전지수 : 범죄, 교통사고, 화재건수
                  </div>
               </div>
            </div>
         </b-card-text>
      </b-card>

      <!-- 모달 : 리뷰작성 -->
      <div class="w3-container">
         <div id="modal_write" class="w3-modal ">
            <div class="w3-modal-content w3-card-4 w3-animate-zoom rounded-lg" style="max-width:400px">
               <div class="w3-container">
                  <div class="w3-section text-center p-2">
                     <label class="text-center pb-2" v-if="userInfo != null">
                        {{ userInfo.name }}님, <span>{{ sendData.aptName }}</span> 어떻게 생각하세요?
                     </label>
                     <input class="w3-input border-0 shadow p-3 mb-4 bg-white rounded-lg" type="textarea" name="content" v-model="content" placeholder="리뷰를 작성해주세요.." required />
                     <div class="shadow p-3 mb-4 bg-white rounded-lg">
                        <div class="d-flex justify-content-center">
                           <span class="font-weight-bold blue-text mr-2 mt-1"><i class="fas fa-thumbs-down" aria-hidden="true"></i></span>
                           <input class="border-0 w-75" type="range" v-model="rating" min="0" max="10" step="0.1" />
                           <span class="font-weight-bold blue-text ml-2 mt-1"><i class="fas fa-thumbs-up" aria-hidden="true"></i></span>
                        </div>
                        <div class="slider-num">{{ rating }}</div>
                     </div>
                     <div class="container-fluid d-flex justify-content-center">
                        <button class="btn btn-outline-warning mr-2" type="button" @click="clear">reset</button>
                        <button class="btn btn-outline-success w-50" type="button" @click="registerReview">write</button>
                        <button @click="removeReviewWindow" type="button" class="btn btn-outline-danger ml-md-2">cancel</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from 'axios';
import router from '../../router/router';
import { mapState } from 'vuex';

export default {
   name: 'SideInfo',
   props: ['sendData', 'aptReviews',],
   data: () => {
      return {
         content: '',
         rating: 5,
         image: '',
         fields: [
            {
               key: 'no',
               label: '거래번호',
               sortable: true,
            },
            {
               key: 'deal',
               label: '거래가',
               sortable: true,
            },
            {
               key: 'area',
               label: '면적',
               sortable: true,
            },
         ],

         reviews: [{ writer: '' }, { content: '' }, { rating: 0 }],
         aptInfo: null,
         safety: 0.0,
      };
   },
   methods: {
      closeSideInfo() {
         this.$emit('closeFlag');
      },
      registerReview() {
         axios
            .post('http://localhost/happyhouse/reviews', {
               content: this.content,
               rating: this.rating,
               houseNo: this.sendData.no,
               writerId: this.userInfo.id,
            })
            .then(() => {
               alert('리뷰가 추가되었습니다');
               this.removeReviewWindow();
               this.$emit('updateReview', this.sendData.no); // 부모 컴포넌트에게 리뷰 바뀌었다고 이벤트 전달
               this.clear();
            })
            .catch((error) => {
               alert('요청에 실패했습니다.');
               console.log(error);
            });
      },
      reviewWindow() {
         // 로그인이 되어있지 않은 경우
         if (this.userInfo == null) {
            router.push({ name: 'Login' });
            return;
         }
         document.getElementById('modal_write').style.display = 'block'; // 팝업창 띄우기
      },
      removeReviewWindow() {
         document.getElementById('modal_write').style.display = 'none'; // 팝업창 제거
      },
      clear() {
         this.content = '';
         this.rating = 5;
      },
      getSafety() {
         axios
         .get('http://localhost/happyhouse/safety/'+this.sendData.code)
         .then((response) => {
            this.safety = response.data.safety
         })
         .catch((exp) => {
            console.log('err.' + exp);
         });
      }
   },
   computed: {
      ...mapState(['userInfo']),
      getReviews() {
         return this.aptReviews;
      },
      getAptName() {
         return this.sendData.aptName;
      },
      getImage() {
         if(this.sendData.img == undefined) {
            return
         }
         return 'http://localhost/happyhouse/static/images/apt/' + this.sendData.img + '.jpg';
      },
      getDealTable() {
         var arr = this.sendData.deals;
         // console.log('arr : ', arr);

         var dealList = [];

         for (var i in arr) {
            //3자리 구분
            var dealPrice = new Number(arr[i].deal);
            dealPrice = dealPrice.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');

            dealList.push({
               no: arr[i].no,
               deal: dealPrice,
               area: arr[i].area.substr(0, 7),
            });
         }
         return dealList;
      },

      getAvgRating() {
         var rating = 0.0
         var size = this.aptReviews.length

         if(size == 0) { return rating } // 평점이 없는 경우 리턴
         for(var i=0; i<this.aptReviews.length; i++) {
            rating += this.aptReviews[i].rating
         }
         
         return (rating/size).toFixed(1) // 소수점 2번째 자리에서 반올림
      },

      getSafetyPoint() {
         if(this.sendData.code === undefined) {return}
         this.getSafety();
         return this.safety
      },
   },
};
</script>

<style>
@import url('https://www.w3schools.com/w3css/4/w3.css');

.info {
   /* display: inline-block; */
   position: absolute;
   margin-top: 10px;
   margin-right: 10px;
   right: 0;
   height: 780px;
   /* height: 90%; */
   width: 20em;
   z-index: 8;
   background-color: white;
   border-radius: 10px;
   box-shadow: 0px 4px 10px 0px #00000021;
   /* border: 1px solid rgb(211, 211, 211); */
}

.info .close {
   position: absolute;
   top: 0.5rem;
   right: 0.5rem;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 2.5rem;
   height: 2.5rem;
   border: none;
   background-color: transparent;
   font-size: 1.5rem;
   transition: 0.25s linear;
   z-index: 5;
}
.info .close:before,
.info .close:after {
   position: absolute;
   content: '';
   width: 1.25rem;
   height: 0.125rem;
   background-color: black;
}
.info .close:before {
   transform: rotate(-45deg);
}
.info .close:after {
   transform: rotate(45deg);
}
.info .close:hover {
   transform: rotate(90deg);
}
.info .close:hover:before,
.info .close:hover:after {
   background-color: tomato;
}

.card-img,
.card-img-top,
.card-img-bottom {
   width: 100%;
   height: 150px;
   object-fit: cover;
}

.card {
   height: 100%;
   width: 100%;
}

p.card-text {
   height: 90%;
   width: 100%;
   /* background-color: red; */
}

.card-wrapper span {
   font-size: 10pt;
}

/* 거래내역 표시 */
.dealTable {
   height: 170px;
   overflow: auto;
}

/* 사용자 리뷰 블럭 */
.reviewTable {
   height: 220px;
   overflow: auto;
   /* background-color: rgb(238, 243, 255); */
}

.reviewTable .reviewRow {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 10px 20px 0px 10px;
}

.reviewRow .left p:nth-child(1) {
   font-size: 12pt;
   font-style: italic;
   color: rgb(34, 34, 34);
   margin-bottom: 0px;
}
.reviewRow .left p:nth-child(2) {
   color: rgb(121, 121, 121);
   font-size: 8pt;
   font-weight: 600;
   margin-bottom: 0px;
   margin-left: 5px;
}

/* 하단 리뷰 작성, 및 총평 */
.footer-wrapper {
   margin-top: 10px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   font-size: 10pt;
}

.footer-wrapper .left {
   margin-left: 10px;
   color: rgb(117, 177, 143);
}
.footer-wrapper .left:hover {
   margin-left: 10px;
   color: seagreen;
}

.footer-wrapper .right {
   margin-right: 20px;
   font-size: 8pt;
   color: rgb(10, 101, 13);
}

/* 모달 : 리뷰 */
#modal_write label {
   font-size: 10pt;
}

#modal_write label span {
   color: tomato;
   font-size: 11pt;
   font-weight: 600;
}

.slider-num {
   margin-top: 12px;
   font-size: 16pt;
   color: rgb(182, 182, 182);
   font-style: italic;
}

.card-title {
   font-size: 14pt;
   font-weight: 800;
   margin-bottom: 4px !important;
}

.card table {
   margin-top: 16px;
   font-size: 8pt;
   height: 10px;
}

.card table tbody td {
   padding: 6px 20px;
}

.btn-group {
   margin-top: 10px;
   margin-left: 75px;
   /* background-color: blue; */
}

/* .b-sidebar {
   top: 90px !important;
   height: 80vh !important;
   width: 400px !important;
} */
</style>
