<template>
  <div class="main">
    <div class="infolist">
      <h3>{{ notice.title }}</h3>
      <hr class="hr-main" />
      <center>
        <table BORDER="2" CELLSPACING="2" CELLPADDING="2">
          <tr>
            <th width="200">공지번호</th>
            <td width="300" align="center">{{ notice.id }}</td>
            <th width="300">NAME</th>
            <td width="300" align="center">{{ notice.writer }}</td>
          </tr>
          <tr>
            <th width="200">DATE</th>
            <td width="300" align="center">{{ notice.writeDate }}</td>
            <th width="300">COUNT</th>
            <td width="300" align="center">124</td>
          </tr>
          <tr>
            <th width="200">TITLE</th>
            <td COLSPAN="3">{{ notice.title }}</td>
          </tr>
          <tr>
            <th width="200">CONTENT</th>
            <td COLSPAN="3">
              <textarea
                readonly
                cols="120"
                rows="20"
                v-model="notice.content"
              ></textarea>
            </td>
          </tr>
        </table>

        <br />
        <br />
        <button type="button" @click="remove(notice.id)">삭제하기</button
        >&nbsp;&nbsp;&nbsp;
        <br />
      </center>
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
      notice: [
          {id:null},
          {title:null},
          {content:null},
          {writer:null},
          {writeDate:null},
      ]
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
.main {
  background-color: white;
  min-height: 1800px;
}
</style>
