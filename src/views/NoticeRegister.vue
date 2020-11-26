<template>
   <div class="container">
      <div class="reg-warpper shadow-lg">
         <div class="reg-font pt-3 mx-auto text-center">
            <h1></h1>
         </div>
         <div class="reg-title my-3 text-center shadow-lg bg-white">
            <input name="title" v-model="title" type="text" class="w-100" placeholder="제목을 입력하세요" />
         </div>
         <div class="reg-content shadow-lg bg-white">
            <textarea name="content" v-model="content" class="w-100" rows="15" placeholder="내용을 입력하세요"></textarea>
         </div>
         <div class="w-100 text-center mt-4">
            <b-button type="reset" size="md" pill variant="outline-warning" @click="clear"><span style="padding: 0px 10px">clear</span></b-button>
            <b-button size="md" pill variant="outline-primary" @click="registerNotice()" style="margin:0px 10px"><span style="padding: 0px 30px">register</span></b-button>
            <router-link to="/notice"
               ><b-button type="reset" size="md" pill variant="outline-secondary"><span style="padding: 0px 10px">go back</span></b-button></router-link
            >
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
         title: '',
         content: '',
      };
   },
   methods: {
      registerNotice() {
         if (this.title == '') {
            alert('제목을 입력하세요');
            return;
         }

         // 제목만 있을 경우, 내용 없음 default
         if (this.content == '') {
            this.content = '내용 없음';
         }

         axios
            .post('http://localhost/notices', {
               title: this.title,
               content: this.content,
               writerId: this.userInfo.id,
            })
            .then(() => {
               alert('공지사항이 추가되었습니다');
               router.push({ name: 'Notice' });
            })
            .catch((error) => {
               alert('요청에 실패했습니다.');
               console.log(error);
            });
      },

      clear() {
         this.title = '';
         this.content = '';
      },
   },
   computed: {
      ...mapState(['userInfo']),
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
.reg-warpper {
   padding: 10px 10px 30px 10px;
   border-radius: 20px;
   background-color: white;
}

.reg-content {
   border-radius: 10px;
   min-height: 300px;
   height: 40vh;
}

.reg-content textarea {
   border-radius: 10px;
   min-height: 300px;
   height: 40vh;
   padding: 20px 30px 40px 30px;
   border: 0;
   font-size: 16pt;
   color: rgb(70, 70, 70);
   resize: none;
}
.reg-title {
   border-radius: 10px;
}
.reg-title input {
   border-radius: 10px;
   font-size: 16pt;
   color: #1075dc;
   border: none;
   padding: 4px 30px;
}

.reg-content textarea:focus,
.reg-title input:focus {
   outline: none;
}
</style>
