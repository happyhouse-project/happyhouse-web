<template>
   <footer>
      <div class="footer-left">
         <p style="margin:1px;">
            <router-link to="/intro">회사소개</router-link> | <a href="#">이용약관</a> | <a href="#">개인정보 처리방침</a> |
            <a href="#" target="_blank">위치기반 서비스 이용약관</a>
         </p>
         <p>
            상호 : (주)내집마련 | 주소 : 서울특별시 강남구 역삼동 테헤란로 212 멀티캠퍼스
            <br />
            개발자 : 김한솔, 이주상 <span style="margin-left:20px; color:grey;">Copyright ⓒ HAPPYHOUSE-SSAFY. All Rights Reserved.</span>
         </p>
      </div>
      <div class="footer-right">
         <img class="logo-img" alt="logo" src="../assets/images/logos/full_logo.png" />
      </div>
   </footer>
</template>

<style scoped>
footer {
   height: 80px;
   width: 100%;
   margin: auto;
   padding: 15px 50px 5px 50px;
   background-color: #ebebebfe;
   display: flex;
   justify-content: space-between;
   bottom: 0;
   position: fixed;
   /* z-index: 3; */
   font-size: 6pt;
   color: black;
}

.footer-left {
   width: 80%;
}

.footer-left p a {
   text-decoration: none;
   color: black;
}

.footer-right {
   width: 20%;
}

.footer-right img {
   filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale");
   -webkit-filter: grayscale(100%);
   filter: gray;
   max-height: 80%;
   width: auto;
   float: right;
   opacity: 0.5;
}
</style>
