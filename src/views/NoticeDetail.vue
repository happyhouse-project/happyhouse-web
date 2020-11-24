<template>
   <div class="container">
      <div class="detail-warpper shadow-lg bg-white">
         <div class="detail-title">
            {{ notice.id }}
            <h3>{{ notice.title }}</h3>
         </div>
         <div class="detail-info">
            <span class="writer"> {{ notice.writer }}</span>
            <span class="writeDate"> {{ notice.writeDate }}</span>
            <!-- <span>{{hit}}</span> -->
         </div>
         <div class="detail-content">
            <textarea readonly cols="120" rows="20" v-model="notice.content"></textarea>
         </div>
         <button type="button" @click="remove(notice.id)">삭제하기</button>&nbsp;&nbsp;&nbsp;
      </div>
   </div>
</template>

<script>
import axios from 'axios';
import router from '../router/router';

export default {
   data() {
      return {
         loading: true,
         notice: [{ id: null }, { title: null }, { content: null }, { writer: null }, { writeDate: null }],
      };
   },
   created() {
      this.getNotice();
   },
   methods: {
      getNotice() {
         axios
            .get('http://localhost/happyhouse/notices/' + this.$route.params.id)
            .then((response) => {
               (this.loading = false), (this.notice = response.data);
               console.log(this.notice);
            })
            .catch((error) => {
               alert('요청에 실패했습니다.');
               console.log(error);
            });
      },
      remove(id) {
         axios
            .delete('http://localhost/happyhouse/notices/' + id)
            .then(() => {
               alert('삭제에 성공했습니다');
               router.push({ name: 'Notice' });
            })
            .catch((error) => {
               alert('요청에 실패했습니다.');
               console.log(error);
            });
      },
   },
};
</script>

<style scoped>
.detail-warpper {
   background-color: white;
}
</style>
