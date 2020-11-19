<template>
  <div class="register-form">
    <div class="register-box">
      <h2>Register</h2>
      <p class="hint-text">간단한 정보만으로도 회원가입을 할 수 있습니다.</p>
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          name="email"
          placeholder="이메일 주소"
          required="required"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          name="name"
          placeholder="이름"
          required="required"
          v-model="name"
        />
      </div>

      <div class="form-group">
        <input
          type="password"
          class="form-control"
          name="password"
          placeholder="비밀번호"
          required="required"
          v-model="password"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          name="confirm_password"
          placeholder="비밀번호 재입력"
          required="required"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          name="phone"
          placeholder="전화번호"
          required="required"
          v-model="phone"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          name="address"
          placeholder="주소"
          required="required"
          v-model="address"
        />
      </div>
      <div class="form-group">
        <label class="form-check-label"
          ><input type="checkbox" required="required" /> 회원가입 시
          <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a> 를
          동의합니다
        </label>
      </div>
      <div class="form-group">
        <button
          type="button"
          class="btn btn-success btn-lg btn-block"
          @click="doRegister"
        >
          회원 가입
        </button>
      </div>
    </div>
    <div class="text-center">
      이미 계정이 있다면 <a href="./login">로그인</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router/router';

export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      address: '',
      phone: '',
    };
  },
  methods: {
    doRegister() {
      axios
        .post('http://localhost/happyhouse/members', {
          email: this.email,
          password: this.password,
          name: this.name,
          address: this.address,
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
  },
};
</script>

<style scoped>
.form-control {
  height: 40px;
  box-shadow: none;
  color: #969fa4;
}
.form-control:focus {
  border-color: #5cb85c;
}
.form-control,
.btn {
  border-radius: 3px;
}
.register-form {
  width: 450px;
  margin: 0 auto;
  padding: 30px 0px;
  font-size: 15px;
}
.register-form h2 {
  color: #636363;
  margin: 0 0 15px;
  position: relative;
  text-align: center;
}
.register-form h2:before,
.register-form h2:after {
  content: '';
  height: 2px;
  width: 30%;
  background: #d4d4d4;
  position: absolute;
  top: 50%;
  z-index: 2;
}
.register-form h2:before {
  left: 0;
}
.register-form h2:after {
  right: 0;
}
.register-form .hint-text {
  color: #999;
  margin-bottom: 30px;
  text-align: center;
}
.register-box {
  color: #999;
  border-radius: 3px;
  margin-bottom: 15px;
  background: #f2f3f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.register-form .form-group {
  margin-bottom: 20px;
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
.register-form .row div:first-child {
  padding-right: 10px;
}
.register-form .row div:last-child {
  padding-left: 10px;
}
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
</style>
