<template>
  <div class="main">
    <div class="infolist">
      <h3>공지사항 등록</h3>
      <hr class="hr-main" />
      <center>
        <table>
        <tr>
            <td><h1>새글쓰기</h1></td>
        </tr>
        <tr>
            <td>제목 : <input type="input" name="title" size="42" v-model="title"/></td>
        </tr>
        <tr>
            <td colspan="2">
            내용 : <textarea rows="10" cols="50" name="content" v-model="content"></textarea>
            </td>
        </tr>
        <tr>
            <td>
            <center>
                <button class="btn-success" type="button" @click="registerNotice()">작성</button>&nbsp;&nbsp;<button class="btn-gray" type="button">취소</button>
            </center>
            </td>
        </tr>
        </table>
        <p><router-link to="/notice">리스트</router-link></p>
      </center>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router/router'

export default {
    data() {
      return {
        title: '',
        content: '',
      }
    },
    methods: {
        registerNotice() {
            axios
            .post('http://localhost/happyhouse/notices', {
              title: this.title,
              content: this.content
            })
            .then(()=> {
              alert('공지사항이 추가되었습니다')
              router.push({name: "Notice"});
            })
            .catch(error=> {
                alert('요청에 실패했습니다.')
                console.log(error)
            })
        },        
    },
}
</script>

<style scoped>
.main {
  background-color: white;
  min-height: 1800px;
  padding-left:15%;
  padding-right:15%;
}
</style>