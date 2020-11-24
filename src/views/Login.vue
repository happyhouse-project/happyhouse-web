<template>
   <div class="container-fluid">
      <div class="login-wrapper">
         <div class="login-box text-center">
            <img class="logo-img text-center mx-auto" alt="logo" src="../assets/images/logos/logo_favicon.png" />
            <h2 class="text-center">로그인</h2>
            <div class="form-group">
               <div class="input-group">
                  <div class="input-group-prepend">
                     <span class="input-group-text">
                        <span class="fa fa-user"></span>
                     </span>
                  </div>
                  <input type="email" class="form-control" name="email" placeholder="이메일을 입력해 주세요" required="required" v-model="email" />
               </div>
            </div>
            <div class="form-group">
               <div class="input-group">
                  <div class="input-group-prepend">
                     <span class="input-group-text">
                        <i class="fa fa-lock"></i>
                     </span>
                  </div>
                  <input type="password" class="form-control" name="password" placeholder="비밀번호를 입력해 주세요" required="required" v-model="password" />
               </div>
            </div>
            <div class="form-group">
               <button type="button" class="btn btn-primary login-btn btn-block" @click="doLogin({ email, password })">
                  로그인
               </button>
            </div>
            <div class="clearfix">
               <label class="float-left form-check-label"><input type="checkbox" /> 아이디 저장 </label>
               <a href="./forgotPassword" class="float-right">비밀번호 찾기</a>
            </div>
            <div class="or-seperator"><i>or</i></div>
            <p class="text-center small">계정이 없으신가요? <router-link to="/register">회원가입</router-link></p>
            <!-- <p class="text-center">SNS 계정으로 로그인 하기</p>
            <div class="text-center social-btn">
               <a href="#" class="btn btn-secondary"><i class="fa fa-facebook"></i>&nbsp; Facebook</a>
               <a href="#" class="btn btn-info"><i class="fa fa-twitter"></i>&nbsp; Twitter</a>
               <a href="#" class="btn btn-danger"><i class="fa fa-google"></i>&nbsp; Google</a>
            </div> -->
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
   data() {
      return {
         email: '',
         password: '',
      };
   },
   methods: {
      ...mapActions(['doLogin']),
   },
};
</script>

<style scoped>
h2 {
   font-family: 'Do Hyeon' !important;
}

.container-fluid {
   /* 배경 이미지 꽉차게 */
   height: 100vh;
   position: relative;
}

.container-fluid::before {
   content: '';
   position: absolute;
   top: 0px;
   left: 0px;
   right: 0px;
   bottom: 0px;
   background-color: #ffffff;
   background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23386cb2' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* 배경 이미지 넣고, 확대시키는 배경
.container-fluid::before {
   content: '';
   background-image: url('https://photo.sentv.co.kr/photo/2020/03/27/20200327014954.png');
   background-repeat: no-repeat;
   background-size: cover;
   opacity: 0.5;
   position: absolute;
   top: 0px;
   left: 0px;
   right: 0px;
   bottom: 0px;
} */

.login-wrapper {
   position: absolute;
   top: 40%;
   left: 50%;
   transform: translate(-50%, -50%);
   font-family: 'Do Hyeon' !important;
}

.login-box {
   width: 500px;
   height: 420px;
   margin-bottom: 15px;
   padding: 30px;
   border-radius: 30px;
   background-color: white;
   box-shadow: 0px 19px 20px 0px rgba(0, 0, 0, 0.3);
}

.login-box img {
   width: 40px;
   margin-bottom: 15px;
}

.login-wrapper h2 {
   margin: 0 0 15px;
}
.form-control,
.login-btn {
   border-radius: 2px;
}
.input-group-prepend .fa {
   font-size: 18px;
}
.login-btn {
   font-size: 15px;
   font-weight: bold;
   min-height: 40px;
}
.social-btn .btn {
   border: none;
   margin: 10px 3px 0;
   opacity: 1;
}
.social-btn .btn:hover {
   opacity: 0.9;
}
.social-btn .btn-secondary,
.social-btn .btn-secondary:active {
   background: #507cc0 !important;
}
.social-btn .btn-info,
.social-btn .btn-info:active {
   background: #64ccf1 !important;
}
.social-btn .btn-danger,
.social-btn .btn-danger:active {
   background: #df4930 !important;
}
.or-seperator {
   margin-top: 20px;
   text-align: center;
   border-top: 1px solid #ccc;
}
.or-seperator i {
   padding: 0 10px;
   background: #f7f7f7;
   position: relative;
   top: -11px;
   z-index: 1;
}
</style>
