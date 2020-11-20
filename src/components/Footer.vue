<template>
   <footer>
      <div class="footer-header">
         <a href="/happyhouse/views/about.html" target="_blank">회사소개</a> | <a href="#">이용약관</a> | <a href="#">개인정보 처리방침</a> |
         <a href="#" target="_blank">위치기반 서비스 이용약관</a>
      </div>
      <div class="footer-body">
         상호 : (주)happyhouse-ssafy | 주소 : 서울특별시 강남구 역삼동 테헤란로 212 멀티캠퍼스
         <br />
         개발자 : 김한솔, 이주상
         <br />
         <i class="fa fa-github-square" style="font-size:36px"></i>
      </div>
      <div class="footer-footer">
         Copyright ⓒ HAPPYHOUSE-SSAFY. All Rights Reserved.
      </div>
   </footer>
</template>

<style scoped>
footer {
   bottom: 0;
   position: absolute;
   width: 100%;
   background-color: #d9d9d9;
   z-index: 3;
}
.footer-header {
   text-align: center;
   padding-top: 10px;
   padding-bottom: 10px;
   font-size: 14px;
   font-weight: bold;
}

.footer-body {
   text-align: center;
   padding-bottom: 10px;
   font-size: 12px;
}

.footer-footer {
   text-align: center;
   padding-bottom: 10px;
   font-size: 12px;
}

.footer-header a {
   color: black;
   text-decoration: none;
}
</style>
