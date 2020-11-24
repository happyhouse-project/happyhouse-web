<template>
   <div class="container">
      <div class="detail-warpper shadow-lg">
         <div class="detail-font detail-title mx-auto text-center">
            <h1>{{ notice.title }}</h1>
         </div>
         <div class="detail-info my-3 text-center">
            <span class="writer">
               <kbd style="margin-right:10px">{{ notice.writer }}</kbd></span
            >
            <span class="writeDate">
               <pre style="display:inline">{{ notice.writeDate }}</pre></span
            >
            <!-- <span>{{hit}}</span> -->
         </div>
         <div class="detail-content shadow-lg bg-white">
            <textarea readonly class="w-100" rows="15" v-model="notice.content"></textarea>
         </div>
         <div class="w-100 text-center mt-4">
            <b-button size="md" pill variant="outline-danger" @click="remove(notice.id)"><span style="padding: 0px 30px">delete</span></b-button>
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
h1 {
   font-family: 'Do Hyeon' !important;
}
.container {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   font-family: 'Do Hyeon' !important;
}
.detail-warpper {
   padding: 10px 10px 30px 10px;
   border-radius: 20px;
   background-color: white;
}

.detail-content {
   border-radius: 10px;
   min-height: 300px;
   height: 40vh;
}
.detail-content textarea {
   border-radius: 10px;
   min-height: 300px;
   height: 40vh;
   padding: 10px 20px 30px 20px;
   border: 0;
   font-size: 20pt;
   color: rgb(70, 70, 70);
}
</style>
