<template>
<div></div>
</template>
<script>
import axios from "axios"
import router from "../router/router"
export default {

    beforeMount() {
      this.checkEmailAuth()
    },
    methods: {
        // 이메일 인증        
        checkEmailAuth() {
            alert('gogo')
          axios.get("http://localhost/happyhouse/members/registerConfirm?email=" + this.$route.query.email
          + "&authKey=" + this.$route.query.authKey
          )
          .then(res => {            
            if(res.status === 201) {
              alert("회원가입이 완료되었습니다.")
            }
            if(res.status === 208) {
              alert("이미 인증이 완료된 이메일입니다.")
            }            
            router.push({ name: "Home" })
          })
          .catch(() => {
            alert("인증코드가 일치하지 않습니다.")
            router.push({ name: "Home" })
          })
        },
    }
}
</script>
<style>
</style>