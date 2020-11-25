<template>
  <div class="main">
    <div class="infolist">
      <h3>뉴스</h3>
      <!-- member권한 v-if문 추가하기 -->
      <button v-if="userInfo != null && userInfo.auth==2" class="addBtn btn-right btn-bottom" type="button" @click="gotoAddNews">
        뉴스 추가하기
      </button>
      <hr class="hr-main">
      <div v-for="(news, index) in newsList" :key="index">
        <p>
          <span class="agency">{{news.agency}}</span>
          <a :href="news.link" target="_blank">{{ news.title }}</a>
          <span class="date">{{news.registerDate}}</span>
        </p>
        <hr>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import router from '../router/router'
import {mapState} from 'vuex'

export default {
  data() {
    return {
      member: null,
      newsList: [],
    };
  },
   created() {
        this.getNews()
        this.scrollTop()
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
        },
        scrollTop() {
          window.scrollTo(0, top)
        }
    },
    computed: {
      ...mapState(['userInfo']),
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

.agency {
  font-size: 12px;
}
</style>
