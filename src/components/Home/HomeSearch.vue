<template>
  <div class="search">
    <div>
        <input
        type="text"
        placeholder="원하시는 아파트명, 주택명을 입력해주세요"
        name="search"
        v-model="keyword"
        />
        <button type="button" @click="searchAptKeyword">
        <i class="fa fa-search"></i>
        </button>
    </div>
    <!-- select -->
    <div class="searchResult">
        <div v-for="apt in aptList" :key="apt.no">
            <div class="searchResult-box" @click="searchApt(apt.no)">
                <span>{{apt.aptName}}</span>
                <span>{{apt.dong}}</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router/router'

export default {
    data() {
        return {
            loading: true,
            keyword: '',
            aptList: [],
        }
    },
    methods: {
        searchAptKeyword() {

            var keyword = this.keyword
            console.log("keyword" + keyword);

            axios
            .get('http://localhost/happyhouse/house/search/apt/' + keyword)
            .then(response=> {
                this.loading = false,
                this.aptList = response.data
                console.log(this.aptList)
            })
            .catch(error=> {
                alert('요청에 실패했습니다.')
                console.log(error)
            })
        },

        searchApt(no) {
            router.push({name: 'Apt', params: {no : no}})
        }
    },
}
</script>

<style scoped>
.search {
   height: 120px;
   text-align: center;
   background-color: rgba(66, 66, 255, 0.5);
}

.search input[type='text'] {
   margin-top: 30px;
   width: 31%;
   height: 50px;
   padding: 10px;
   display: inline;
}

.search button {
   width: 80px;
   height: 48px;
   background-color: white;
   border: none;
}

.searchResult {
    overflow-y: auto;
    min-height: 40px;
    max-height: 240px;
    width:35%;
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