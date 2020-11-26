<template>
   <div class="container-fluid">
      <div class="join-wrapper">
         <div class="register-form text-center">
            <form @submit.prevent="handleSubmit">
               <!-- <img class="logo-img text-center mx-auto" alt="logo" src="../assets/images/logos/logo_favicon.png" /> -->
               <h2>회원가입</h2>
               <div class="form-group">
                  <input type="email" class="form-control" name="email" placeholder="이메일 주소" required="required" v-model="email" />
               </div>
               <div class="form-group">
                  <input type="text" class="form-control" name="name" placeholder="이름" required="required" v-model="name" />
               </div>

               <div class="form-group">
                  <input type="password" class="form-control" name="password" placeholder="비밀번호" required="required" v-model="password" />
               </div>
               <div class="form-group">
                  <input type="password" class="form-control" name="confirmPassword" v-model="confirmPassword" placeholder="비밀번호 재입력" required="required" />
                  <p class="error-msg" v-if="password != confirmPassword">비밀번호가 일치하지 않습니다</p>
               </div>
               <div class="form-group">
                  <input type="text" class="form-control" name="phone" placeholder="전화번호" required="required" v-model="phone" @keyup="autoHypenPhone(phone)" />
               </div>
               <div class="form-group">
                  <input type="text" class="form-control" name="address" placeholder="주소" v-model="address" readonly="readonly" @click="setAddress()" />
               </div>
               <input type="text" class="form-control" name="detailAddress" placeholder="상세주소 입력" required="required" v-model="detailAddress" />
               <div class="form-group"></div>
               <div class="form-group">
                  <label class="form-check-label"
                     ><input type="checkbox" required="required" v-model="toggle" true-value="yes" false-value="no" /> 회원가입 시 <a href="#">이용약관</a> &amp; <a href="#">개인정보 처리방침</a> 을
                     동의합니다
                  </label>
               </div>
               <div class="form-group">
                  <button type="submit" class="btn btn-success btn-lg btn-block">
                     회원 가입
                  </button>
               </div>
            </form>
            <div class="or-seperator"><i>or</i></div>
            <div class="text-center small">이미 계정이 있다면 <a href="./login" style="color:#28A745">로그인</a></div>
         </div>
      </div>
   </div>
</template>

<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
import axios from 'axios';
import router from '../router/router';

export default {
   data() {
      return {
         email: '',
         password: '',
         confirmPassword: '',
         name: '',
         address: '',
         phone: '',
         detailAddress: '',
         toggle: false,
      };
   },
   methods: {
      doRegister() {
         axios
            .post('http://localhost/members', {
               email: this.email,
               password: this.password,
               name: this.name,
               address: this.address + ' ' + this.detailAddress,
               phone: this.phone,
            })
            .then(() => {
               alert('회원가입에 성공했습니다');
               router.push({ name: 'Home' });
            })
            .catch((err) => {
               alert('회원가입에 실패했습니다');
               console.log(err);
            });
      },
      setAddress() {
         var obj = this;

         new daum.Postcode({
            oncomplete(data) {
               // console.log('(' + data.zonecode + ') ' + data.address);
               // this.address = "("+ data.zonecode + ") "+data.address
               obj.address = data.address;
            },
         }).open();
      },
      handleSubmit(e) {
         if (this.toggle === 'no') {
            alert('이용약관에 동의해주세요.');
            return;
         }
         this.doRegister();
      },
      autoHypenPhone(val) {
         var phoneNumber = val.replace(/[^0-9]/g, '');
         var res = '';
         if (phoneNumber.length < 4) {
            return phoneNumber;
         } else if (phoneNumber.length < 7) {
            res += phoneNumber.substr(0, 3);
            res += '-';
            res += phoneNumber.substr(3);
         } else if (phoneNumber.length < 11) {
            res += phoneNumber.substr(0, 3);
            res += '-';
            res += phoneNumber.substr(3, 3);
            res += '-';
            res += phoneNumber.substr(6);
         } else {
            res += phoneNumber.substr(0, 3);
            res += '-';
            res += phoneNumber.substr(3, 4);
            res += '-';
            res += phoneNumber.substr(7);
         }
         this.phone = res;
      },
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

.join-wrapper {
   position: absolute;
   top: 42%;
   left: 50%;
   transform: translate(-50%, -50%);
   font-family: 'Do Hyeon' !important;
}

.register-form {
   width: 500px;
   height: 600px;
   margin-bottom: 15px;
   padding: 30px;
   border-radius: 30px !important;
   background-color: white;
   box-shadow: 0px 19px 20px 0px rgba(0, 0, 0, 0.3);
}

.form-control {
   margin: 0px;
   padding-left: 15px;
}

.form-group input:focus {
   outline: none;
}

/* .form-control,
.btn {
   border-radius: 3px;
} */
/* .register-form {
   width: 450px;
   margin: 0 auto;
   padding: 30px 0px;
   font-size: 15px;
} */

.register-form img {
   width: 40px;
   margin-bottom: 15px;
}

/* .register-form h2:before {
   left: 0;
}
.register-form h2:after {
   right: 0;
} */
.register-form .hint-text {
   color: #999;
   margin-bottom: 30px;
   text-align: center;
}
/* .register-form form {
   color: #999;
   border-radius: 3px;
   margin-bottom: 15px;
   background: #f2f3f7;
   box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
   padding: 30px;
} */

.register-form .form-group {
   /* margin-bottom: 20px; */
}
.register-form input[type='checkbox'] {
   margin-top: 3px;
}
.register-form .btn {
   font-size: 16px;
   font-weight: bold;
   min-width: 140px;
   outline: none !important;
}
/* .register-form .row div:first-child {
   padding-right: 10px;
}
.register-form .row div:last-child {
   padding-left: 10px;
} */
.register-form a {
   color: black;
   text-decoration: underline;
}
.register-form a:hover {
   text-decoration: none;
}
.register-form form a {
   color: #5cb85c;
   text-decoration: none;
}
.register-form form a:hover {
   text-decoration: underline;
}
.error-msg {
   color: red;
   font-size: 12px;
   margin: 1%;
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
