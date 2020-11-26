<template>
   <div>
      <div class="title">
         <div class="img-box"><img class="logo-img" src="@/assets/images/logos/full_logo.png" alt="logo" style="width:70%" /></div>
         <div class="intro-box">
            <div class="main-intro">내집마련은 고객이 원하는 집을 쉽고<br />빠르게 구할 수 있도록 주거와<br />관련된 다양한 정보를 제공합니다.</div>
            <div class="supple-intro">
               아파트의 실거래 정보와 주위의 역, 편의점, 다이소 위치 등<br />
               다양한 정보를 제공합니다.<br />
               더 이상 여기저기 찾지말고 이곳에서 내집을 마련해보세요.<br />
               <span class="blue-point">내집마련 걱정 끝!</span>
            </div>
            <div class="reference-intro">
               <img src="@/assets/images/logos/ssafy_logo.png" alt="logo" style="width:10%" />
               본 회사는 <b>SSAFY</b>와 함께합니다
            </div>
         </div>
      </div>
      <div class="contact">
         <div class="header"><span class="contact-content">contact</span></div>
         <div class="west">
            <div class="intro-person">
               <span class="person">김한솔</span>
               <div class="person-detail">
                  <span class="person">010-1234-1234</span><br />
                  <span class="person">https://github.com/mentalK94</span><br />
                  <span class="person">doingnow94@gmail.com</span><br />
               </div>
            </div>
         </div>
         <div class="east">
            <div class="intro-person">
               <span class="person">이주상</span>
               <div class="person-detail">
                  <span class="person">010-1234-1234</span><br />
                  <span class="person">https://github.com/stateaward</span><br />
                  <span class="person">stateaward@naver.com</span><br />
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
.title {
   width: 100%;
   height: 90vh;
   background-color: #f7f7f7;
   display: flex;
}

.contact {
   display: flex;
   height: 50vh;
}

.header {
   width: 20%;
   background-color: rgb(218, 174, 31);
   padding: 5%;
}

.west {
   width: 40%;
   background-color: rgb(235, 191, 47);
   padding: 5%;
}

.east {
   width: 40%;
   background-color: rgb(0, 79, 197);
   padding: 5%;
}

.img-box {
   width: 50%;
}

.intro-box {
   width: 50%;
}

.logo-img {
   margin: 20%;
}

.main-intro {
   margin: 20% 28% 5% 0%;
   font-size: 40px;
   font-weight: bold;
}

.supple-intro {
   margin: 0% 30% 5% 0%;
   font-size: 22px;
   font-weight: bold;
}

.blue-point {
   color: #17419b;
   font-size: 28px;
}

.reference-intro {
   font-size: 20px;
}

.contact-content {
   font-size: 30px;
   font-weight: bold;
   color: white;
}

.person {
   font-size: 30px;
   font-weight: bold;
   color: white;
}

.person-detail {
   margin: 5% 2% 2% 25%;
}
</style>
