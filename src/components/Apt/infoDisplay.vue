<template>
   <div class="info-display">
      <button class="close" @click="closeSideInfo"></button>
      <div class="info-wrapper">
         <p class="info-row">
            <span class="r-title"> <i class="fas fa-subway"></i> 역세권 </span>
            <span v-if="sendStation.distance < 300" class="score" style="color:green">최고</span>
            <span v-else-if="sendStation.distance < 500" class="score" style="color:orange">쏘쏘</span>
            <span v-else-if="sendStation.distance < 1000" class="score" style="color:red">별로</span>
            <span class="content">{{ sendStation.place_name }} ({{ sendStation.distance }}M) </span>
         </p>
         <p class="info-row">
            <span class="r-title"> <i class="fas fa-store"></i> 다세권 </span>
            <span v-if="sendKeyword.distance < 500" class="score" style="color:green">최고</span>
            <span v-else-if="sendKeyword.distance < 1000" class="score" style="color:orange">쏘쏘</span>
            <span v-else class="score" style="color:red">별로</span>
            <span class="content">{{ sendKeyword.place_name }} ({{ sendKeyword.distance }}M) </span>
         </p>
         <p class="info-row">
            <span class="r-title"> <i class="fas fa-shoe-prints"></i> 편세권 </span>
            <span v-if="sendInflu > 10" class="score" style="color:green">최고</span>
            <span v-else-if="sendInflu > 5" class="score" style="color:orange">쏘쏘</span>
            <span v-else class="score" style="color:red">별로</span>
            <span class="content">{{ sendInflu }}개의 편의점이 300M 안에 있어요 </span>
         </p>
         <br />
      </div>
   </div>
</template>

<script>
import axios from 'axios';

export default {
   name: 'InfoDispaly',
   props: ['sendStation', 'sendKeyword', 'sendInflu'],
   data: () => {
      return {
         name: '',
      };
   },
   methods: {
      closeSideInfo() {
         this.$emit('closeFlag');
      },
   },
};
</script>

<style>
.info-display {
   position: absolute;
   top: 80%;
   left: 50%;
   transform: translate(-50%, -50%);
   z-index: 5;
   font-family: 'Do Hyeon';
}

.info-wrapper {
   border-radius: 50px;
   width: 400px;
   height: 100px;
   background-color: white;
   padding: 15px 20px 15px 40px;
   box-shadow: 0px 12px 20px 0px #00000045;
}

.info-wrapper .info-row {
   margin-bottom: 3px;
}

.info-row .r-title {
   display: inline-block;
   width: 70px;
}

.info-row .score {
   border: 1px solid;
   border-radius: 5px;
   padding: 3px;
   margin-right: 15px;
}

/* 지하철역 */
.info-row:nth-child(1) {
   color: #ab7b04;
}

/* 다이소 */
.info-row:nth-child(2) {
   color: #e1554e;
}

/* 편의점 */
.info-row:nth-child(3) {
   color: #33acd4;
}

.info-display .close {
   position: absolute;
   top: 0.5rem;
   right: 1.3rem;
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
.info-display .close:before,
.info-display .close:after {
   position: absolute;
   content: '';
   width: 1.25rem;
   height: 0.125rem;
   background-color: black;
}
.info-display .close:before {
   transform: rotate(-45deg);
}
.info-display .close:after {
   transform: rotate(45deg);
}
.info-display .close:hover {
   transform: rotate(90deg);
}
.info-display .close:hover:before,
.info-display .close:hover:after {
   background-color: tomato;
}
</style>
