<template>
   <div>
      <span class="title"><i class="fas fa-bullhorn"></i> 공지</span>
      <button class="addBtn notice-add-btn" type="button" @click="gotoNoticeList()">
         더보기
      </button>
      <hr />
      <div v-for="(notice, index) in noticeList" :key="index" class="notice-link">
         <span class="ntc-notice-title" @click="gotoNotice(notice.id)">{{ notice.title }}</span>
      </div>
   </div>
</template>
<script>
import axios from 'axios';
import router from '../../router/router';

export default {
   data() {
      return {
         loading: true,
         noticeList: [],
      };
   },
   created() {
      this.getHomeNotices();
   },
   methods: {
      getHomeNotices() {
         axios
            .get('http://localhost/notices/main')
            .then((response) => {
               (this.loading = false), (this.noticeList = response.data);
            })
            .catch((error) => {
               alert('요청에 실패했습니다.');
               console.log(error);
            });
      },
      gotoNoticeList() {
         router.push({ name: 'Notice' });
      },
      gotoNotice(id) {
         router.push({ name: 'NoticeDetail', params: { id: id } });
      },
   },
};
</script>
<style scoped>
.title {
   font-weight: bold;
}

.notice {
   padding: 15px;
   width: 350px;
}

.addBtn {
   background-color: white;
   border: 1px solid #c9c9c9;
   font-size: 12px;
}

.notice-add-btn {
   margin-left: 58%;
}

.notice-link {
   font-size: 13px;
   /*font-weight: bold;*/
   margin-bottom: 12px;
   margin-left: 0px;
}

.notice-link a {
   color: black;
}

.ntc-notice-title {
   overflow: hidden;
   text-overflow: ellipsis;
   display: block;
   white-space: nowrap;
   cursor: pointer;
}
</style>
