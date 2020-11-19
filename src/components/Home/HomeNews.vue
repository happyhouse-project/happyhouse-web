<template>
  <div>
    <span class="title">뉴스</span>
    <button
      class="addBtn news-add-btn"
      type="button"
      @click="gotoNewsList()"
    >
      더보기
    </button>
    <hr />
  </div>
</template>
<script>
import axios from '../../axios-common'
import router from '../../router/router'

export default {
    data() {
        return {
            loading: true,
            news:[
                {link:null},
                {title:null},
            ]
        }
    },
    created() {
        this.getHomeNews
    },
    methods: {
        getHomeNews() {
            axios
            .get('http://localhost/news/main')
            .then(response=> {
                this.loading = false,
                this.news = response.data
            })
            .catch(error=> {
                alert('요청에 실패했습니다.')
                console.log(error)
            })
        },
        gotoNewsList() {
            router.push({name : 'news'})
        }
    },
    
};
</script>
<style scoped>
.addBtn {
	background-color: white;
	border: 1px solid #c9c9c9;
	font-size: 12px;
}
.news-add-btn {
	margin-left:70%;
}
</style>