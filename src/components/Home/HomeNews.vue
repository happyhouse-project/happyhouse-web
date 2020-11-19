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
    <hr>
    <div class="news-link">
        <a href="#"><span class="ntc-news-title">{{news.title}}</span></a>
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
            news:[
                {link:null},
                {title:null},
            ]
        }
    },
    created() {
        this.getHomeNews()
    },
    methods: {
        getHomeNews() {
            axios
            .get('http://localhost/news/main')
            .then(response=> {
                this.loading = false,
                console.log(response.data);
                this.news = response.data
            })
            .catch(error=> {
                alert('요청에 실패했습니다.')
                console.log(error)
            })
        },
        gotoNewsList() {
            router.push({name : 'News'})
        }
    },
    
};
</script>
<style scoped>
.title {
	font-weight: bold;
}

.addBtn {
	background-color: white;
	border: 1px solid #c9c9c9;
	font-size: 12px;
}
.news-add-btn {
	margin-left:70%;
}

.news-link {
	font-size:12px;
	margin-bottom: 12px;
	margin-left : 0px;
}

.ntc-news-title{
	overflow: hidden;
	text-overflow: ellipsis;
	display: block;
	white-space: nowrap;
}
</style>