<template>
   <div class="info">
      <button class="close" @click="closeSideInfo"></button>
      <b-card :title="getAptName" :img-src="images[parseInt(Math.random() * 5)]" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
         <b-card-text class="card-wrapper">
            <b-button size="sm" pill variant="outline-secondary" disabled="disabled" style="font-size:8pt;"> {{ sendData.dong }}&nbsp;{{ sendData.jibun }} </b-button>
            <b-button size="sm" pill variant="outline-secondary" disabled="disabled" style="margin-left:4px; font-size:8pt">
               {{ sendData.buildYear }}
            </b-button>
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
                  <div class="right">
                     <i class="far fa-laugh-squint fa-2x"></i>
                     <i class="far fa-laugh-squint fa-2x"></i>
                     <i class="far fa-laugh-squint fa-2x"></i>
                  </div>
               </div>
            </div>
         </b-card-text>
      </b-card>

      <!-- 모달 : 회원가입 -->
      <div class="w3-container">
         <div id="modal_join" class="w3-modal">
            <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">
               <div class="w3-container">
                  <div class="w3-section">
                     <label><b>리뷰작성</b></label>
                     <input class="w3-input w3-border w3-margin-bottom" type="text" name="content" v-model="content" required />
                     <label><b>평점</b></label>
                     <input class="w3-input w3-border" type="number" placeholder="평점 입력" name="rating" v-model="rating" required />
                     <button class="w3-button w3-block w3-green w3-section w3-padding" type="button" @click="registerReview">리뷰작성</button>
                     <input class="w3-button w3-yellow w3-margin-bottom" type="reset" style="float: right;" value="다시쓰기" />
                  </div>
               </div>

               <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
                  <button onclick="document.getElementById('modal_join').style.display='none'" type="button" class="w3-button w3-red">취소</button>
                  <a onclick="document.getElementById('passChange').style.display='block'" class="w3-text-gray w3-right w3-padding"><U>비밀번호 찾기</U></a>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from 'axios'
import router from '../../router/router'
import { mapState } from 'vuex'

export default {
   name: 'SideInfo',
   props: ['sendData', 'aptReviews'],
   data: () => {
      return {
         content: '',
         rating: '',
         images: [
            'http://localhost/happyhouse/static/images/apt/1.jpg',
            'http://localhost/happyhouse/static/images/apt/2.jpg',
            'http://localhost/happyhouse/static/images/apt/3.jpg',
            'http://localhost/happyhouse/static/images/apt/4.jpg',
            'http://localhost/happyhouse/static/images/apt/5.jpg',
         ],

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

         reviews: [
            {writer: ''},
            {content: ''},
            {rating: 0},
         ],
         aptInfo: null,
      };
   },
   methods: {
      currency(value) {
         var num = new Number(value);
         return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
      },
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
            .then(()=> {
              alert('리뷰가 추가되었습니다')
              this.removeReviewWindow()
            })
            .catch(error=> {
                alert('요청에 실패했습니다.')
                console.log(error)
            })
      },
      reviewWindow() {
         if(this.userInfo == null) {
            router.push({name: 'Login'});
            return
         }
         document.getElementById('modal_join').style.display='block';
      },
      removeReviewWindow() {
         document.getElementById('modal_join').style.display='none';
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
