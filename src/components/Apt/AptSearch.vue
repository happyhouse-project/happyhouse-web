<template>
  <div class="AptSearch">
    <div class="filter-wrap">
      <option value="dong">동</option>
      <option value="deal">금액</option>
    </div>
    <div class="search-wrap">
      <div class="input-field">
        <input id="search" type="text" placeholder="입력하세요" v-model="aptName"/>
      </div>
      <button class="btn-search" type="button" @click="searchAptName">
        <i class="fas fa-search-location"></i>
      </button>
    </div>
    <!-- select -->
    <div v-if="selectedBox" class="searchResult">
      <div v-for="apt in aptList" :key="apt.no">
        <div class="searchResult-box" @click="searchApt(apt.no)">
          <span>{{ apt.aptName }}</span>
          <span>{{ apt.dong }}</span>
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
    };
  },
  methods: {
    searchAptName() {
      axios
        .get('http://localhost/happyhouse/house/search/apt/' + this.aptName)
        .then((response) => {
           (this.loading = false), (this.aptList = response.data);
           this.selectedBox = true;
        })
        .catch((error) => {
          alert('요청에 실패했습니다.');
          console.log(error);
        });
    },
    searchApt(no) {
       this.$emit("searchApt", no)
    }
  },
  updated() { // 입력창을 지우면 select box가 사라짐
     if(this.aptName == undefined || this.aptName == '') {
        this.selectedBox = false
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
  height: 200px;
  height: 70px;
  width: 20em;
  z-index: 8;
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0px 4px 10px 0px #00000021;
  /* border: 1px solid rgb(211, 211, 211); */
}

.filter-wrap {
  display: flex;
  height: 30px;
}

.search-wrap {
  display: flex;
  width: 100%;
  height: 40px;
  /* background-color: red; */
}

.input-field {
  height: 100%;
  background-color: rgb(242, 242, 242);
  border: 0;
  display: block;
  width: 100%;
  padding: 5px 32px;
  font-size: 16px;
  color: #555;
}

.input-field input {
  background-color: rgb(242, 242, 242);
  width: 100%;
  height: 100%;
  border: none;
}

.btn-search {
  height: 100%;
  width: 50px;
  padding: 6px;
  white-space: nowrap;
  color: #fff;
  border: 0;
  cursor: pointer;
  background: #63c76a;
  transition: all 0.2s ease-out, color 0.2s ease-out;
}

.searchResult {
    overflow-y: auto;
    min-height: 40px;
    max-height: 240px;
    width:100%;
    display: inline-block;
    margin-top: 2px;
}

.searchResult-box {
    height: 40px;
    z-index: 100;
    background-color: white;
    border: 1px solid black;
    width: 100%;
    position: relative;
    display: inline-block;
    cursor: pointer;
}
</style>