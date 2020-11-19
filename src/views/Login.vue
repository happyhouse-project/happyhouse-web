<template>
  <div class="login-form">
    <div class="login-box">
      <h2 class="text-center">로그인</h2>
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <span class="fa fa-user"></span>
            </span>
          </div>
          <input
            type="email"
            class="form-control"
            name="email"
            placeholder="이메일을 입력해 주세요"
            required="required"
            v-model="email"
          />
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fa fa-lock"></i>
            </span>
          </div>
          <input
            type="password"
            class="form-control"
            name="password"
            placeholder="비밀번호를 입력해 주세요"
            required="required"
            v-model="password"
          />
        </div>
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-primary login-btn btn-block" @click="doLogin({email, password})">
          로그인
        </button>
      </div>
      <div class="clearfix">
        <label class="float-left form-check-label"
          ><input type="checkbox" /> 아이디 저장
        </label>
        <a href="./forgotPassword" class="float-right">비밀번호 찾기</a>
      </div>
      <div class="or-seperator"><i>or</i></div>
      <p class="text-center">SNS 계정으로 로그인 하기</p>
      <div class="text-center social-btn">
        <a href="#" class="btn btn-secondary"
          ><i class="fa fa-facebook"></i>&nbsp; Facebook</a
        >
        <a href="#" class="btn btn-info"
          ><i class="fa fa-twitter"></i>&nbsp; Twitter</a
        >
        <a href="#" class="btn btn-danger"
          ><i class="fa fa-google"></i>&nbsp; Google</a
        >
      </div>
    </div>
    <p class="text-center small">
      계정이 없으신가요? <router-link to="/register">회원가입</router-link>
    </p>
  </div>
</template>

<script>
import {mapActions} from "vuex"

export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        ...mapActions(["doLogin"]),
    },
}
</script>

<style scoped>
.login-form {
  width: 400px;
  margin: 30px auto;
}
.login-box {
  margin-bottom: 15px;
  background: #f7f7f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.login-form h2 {
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