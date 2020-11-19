<template>
  <div class="main">
    <div class="infolist">
      <h3>뉴스</h3>
      <!-- member권한 v-if문 추가하기 -->
      <button class="addBtn btn-right btn-bottom" type="button" @click="gotoAddNews">
        뉴스 추가하기
      </button>
      <hr class="hr-main">
      <div v-for="(news, index) in newsList" :key="index">
        <p>
          <a :href="news.link" target="_blank">{{ news.title }}</a>
        </p>
        <hr>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import router from '../router/router'

export default {
  data() {
    return {
      member: null,
      newsList: [],
    };
  },
   created() {
        this.getNews()
    },
    methods: {
        getNews() {
            axios
            .get('http://localhost/happyhouse/news')
            .then(response=> {
                this.loading = false,
                this.newsList = response.data
            })
            .catch(error=> {
                alert('요청에 실패했습니다.')
                console.log(error)
            })
        },
        gotoAddNews() {
            router.push({name : 'NewsInfo'})
        }
    },
};
</script>
<style scoped>
.main {
  background-color: white;
  min-height: 1800px;
  padding-left:15%;
  padding-right:15%;
}

.content {
  text-align: center;
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

.btn-right{
	margin-left:90%;
}

.btn-bottom {
    margin-bottom: 1%;
}
</style>
