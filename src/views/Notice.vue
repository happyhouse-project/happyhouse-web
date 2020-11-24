<template>
   <div class="main">
      <div class="infolist">
         <h3>공지사항</h3>
         <button class="addBtn btn-right btn-bottom" type="button" @click="gotoNoticeRegister">공지 추가하기</button>
         <hr class="hr-main" />
         <div class="notice" v-for="(notice, index) in noticeList" :key="index">
            <p @click="gotoNoticeDetail(notice.id)">{{ notice.title }}</p>
            <hr />
         </div>
      </div>
   </div>
</template>
<script>
import axios from 'axios';
import router from '../router/router';

export default {
   data() {
      return {
         member: null,
         noticeList: [],
      };
   },
   created() {
      this.getNotices();
      this.scrollTop();
   },
   methods: {
      getNotices() {
         axios
            .get('http://localhost/happyhouse/notices')
            .then((response) => {
               (this.loading = false), (this.noticeList = response.data);
            })
            .catch((error) => {
               alert('요청에 실패했습니다.');
               console.log(error);
            });
      },
      gotoNoticeDetail(id) {
         router.push({ name: 'NoticeDetail', params: { id: id } });
      },
      gotoNoticeRegister() {
         router.push({ name: 'NoticeRegister' });
      },
      scrollTop() {
         window.scrollTo(0, top);
      },
   },
};
</script>
<style scoped>
.main {
   background-color: white;
   padding-left: 15%;
   padding-right: 15%;
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

input[type='checkbox'] {
   float: right;
   margin-right: 2%;
}

.addBtn {
   background-color: white;
   border: 1px solid #c9c9c9;
   font-size: 12px;
}

.btn-right {
   margin-left: 90%;
}

.btn-bottom {
   margin-bottom: 1%;
}

.notice {
   cursor: pointer;
}
</style>
