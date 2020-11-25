<template>
  <div class="main">
    <div class="infolist">
      <h3>아파트 검색순위</h3>
      <hr />
      <div class="chart-box">
        <div>
          <ul class="line chart-ul-header">
            <li>순위</li>
            <li class="header-apt">아파트</li>
            <li>조회수</li>
          </ul>
        </div>
        <hr>
        <div class="chart-box-in">
          <ul>
            <li class="line dudb zmfflr" v-for="(apt, index) in aptList" :key="index" @click="searchApt(apt.no)">
              <div class="rank">{{ index + 1 }}</div>
              <div class="apt-img"><img v-bind:src="'http://localhost/happyhouse/static/images/apt/' + apt.img + '.jpg'" alt="AptImage" width="100px" height="100px"></div>
              <div class="apt-name">{{ apt.aptName }}</div>
              <div class="hit">{{ apt.hit }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- jQuery -->
<script>
import axios from 'axios';
import router from '../router/router';
import { mapState } from 'vuex';
import $ from 'jquery';

export default {
  data() {
    return {
      member: null,
      aptList: [],
    };
  },
  created() {
    this.getChart();
    this.scrollTop();
  },
  methods: {
    getChart() {
      axios
        .get('http://localhost/happyhouse/house/charts')
        .then((response) => {
          (this.loading = false), (this.aptList = response.data);
        })
        .catch((error) => {
          alert('요청에 실패했습니다.');
          console.log(error);
        });
    },
    scrollTop() {
      window.scrollTo(0, top);
    },
    searchApt(no) {
         if (no == -1) {
            this.clear();
            return;
         }
         router.push({ name: 'Apt', params: { no: no } });
      },
  },
  computed: {
    ...mapState(['userInfo']),
  },
};

setInterval(function() {
  /* setInterval 시작 */

  var boxIn = $('.chart-box-in ul'); /* boxIn 변수에 .boxIn ul 요소 저장 */

  var boxRow = $(
    '.chart-box-in ul li:first'
  ); /* boxRow 변수에 첫번째 .boxIn ul li 요소 저장  */

  var ARea = function() {
    /* ARea 변수에 함수 저장 */
    boxRow
      .appendTo(boxIn)
      .show(
        300
      ); /* boxRow 요소를 boxIn 요소 마지막에 추가합니다. show 메서드를 적용합니다. */
  };

  $(boxRow).hide(
    300,
    ARea
  ); /* boxRow 요소가 300ms로 숨겨지고나면 변수 ARea에 저장 된 콜백 함수가 실행됩니다. */
}, 3000);
</script>
<style scoped>
.main {
  background-color: white;
  padding-left: 15%;
  padding-right: 15%;
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

.chart-box {
  background-color: #f9f9f9;
  min-height: 600px;
  padding: 2%;
}

.chart-box-in ul li:first-child {
   font-size: 22px;
   font-weight: bold;
}

ul {
  list-style: none;
}

.line {
   display: flex;
}

.chart-ul-header li{
   padding-right: 15%;
   font-size: 18px;
   font-weight: bold;
}

.rank {   
   margin:2% 15% 0% 1%;
}

.header-apt {
   width: 55%;
   
}

.dudb {
   margin-bottom:20px;
}

.apt-name {
   width: 32%;
   margin: 2% 15% 0% 2%;
}

.hit {
   margin: 2% 0% 0% 0%;
}

.zmfflr {
   cursor: pointer;
}
</style>
