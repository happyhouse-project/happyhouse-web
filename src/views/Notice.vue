<template>
   <div class="main">
      <div class="infolist">
         <h3><i class="fas fa-bullhorn"></i> 공지사항</h3>
         <b-button pill variant="info" v-if="userInfo != null && userInfo.auth == 2" class="addBtn btn-right btn-bottom" type="button" @click="gotoNoticeRegister">공지 추가하기</b-button>
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
import { mapState } from 'vuex';

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
            .get('http://localhost/notices')
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
   computed: {
      ...mapState(['userInfo']),
   },
};
</script>
<style scoped>
h3 {
   font-family: 'Do Hyeon' !important;
}

.main {
   height: 100vh;
   background-color: white;
   padding-top: 3%;
   padding-left: 15%;
   padding-right: 15%;
   padding-bottom: 20%;
   overflow-y: auto;
   font-family: 'Do Hyeon' !important;
   font-size: 14pt;
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
