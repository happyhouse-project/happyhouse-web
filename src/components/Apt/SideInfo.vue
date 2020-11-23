<template>
   <div class="info">
      <button class="close"></button>
      <b-card :title="getAptName" :img-src="images[parseInt(Math.random() * 5)]" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
         <b-card-text>
            <span class="dong">{{ sendData.dong }}</span>
            <span class="jibun">{{ sendData.jibun }}</span>
            <p style="font-size:10pt">{{ sendData.buildyear }}</p>
            <hr />
            <b>거래 내역</b><br />
            <div class="dealTable">
               <b-table striped hover :items="getDealTable" :fields="fields"></b-table>
            </div>
            <div class="btn-group">
               <b-button class="mt-2" variant="outline-warning" style="">찜하기</b-button>
               <b-button class="mt-2" variant="outline-danger">닫기</b-button>
            </div>
         </b-card-text>
      </b-card>
   </div>
</template>

<script>
export default {
   name: 'SideInfo',
   props: ['sendData'],
   data: () => {
      return {
         images: [
            'http://localhost/happyhouse/static/images/apt/1.jpg',
            'http://localhost/happyhouse/static/images/apt/2.jpg',
            'http://localhost/happyhouse/static/images/apt/3.jpg',
            'http://localhost/happyhouse/static/images/apt/4.jpg',
            'http://localhost/happyhouse/static/images/apt/5.jpg',
         ],

         fields: [
            {
               key: 'no',
               label: '거래번호',
               sortable: true,
            },
            {
               key: 'deal',
               label: '거래',
               sortable: true,
            },
            {
               key: 'area',
               label: '면적',
               sortable: true,
            },
         ],
      };
   },
   methods: {
      getData() {
         console.log(this.sendData);
      },
      currency(value) {
         var num = new Number(value);
         return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
      },
   },
   computed: {
      getAptName() {
         return this.sendData.aptName;
      },
      getDealTable() {
         var arr = this.sendData.deals;
         // console.log('arr : ', arr);

         var dealList = [];

         for (var i in arr) {
            //3자리 구분
            var dealPrice = new Number(arr[i].deal);
            dealPrice = dealPrice.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');

            dealList.push({
               no: arr[i].no,
               deal: dealPrice,
               area: arr[i].area,
            });
         }

         return dealList;
      },
   },
};
</script>

<style>
.info {
   /* display: inline-block; */
   position: absolute;
   margin-top: 10px;
   margin-right: 10px;
   right: 0;
   min-height: 500px;
   height: 90%;
   width: 20em;
   z-index: 8;
   background-color: white;
   border-radius: 10px;
   box-shadow: 0px 4px 10px 0px #00000021;
   /* border: 1px solid rgb(211, 211, 211); */
}

.info .close {
   position: absolute;
   top: 0.5rem;
   right: 0.5rem;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 2.5rem;
   height: 2.5rem;
   border: none;
   background-color: transparent;
   font-size: 1.5rem;
   transition: 0.25s linear;
   z-index: 5;
}
.info .close:before,
.info .close:after {
   position: absolute;
   content: '';
   width: 1.25rem;
   height: 0.125rem;
   background-color: black;
}
.info .close:before {
   transform: rotate(-45deg);
}
.info .close:after {
   transform: rotate(45deg);
}
.info .close:hover {
   transform: rotate(360deg);
}
.info .close:hover:before,
.info .close:hover:after {
   background-color: tomato;
}

.card-img,
.card-img-top,
.card-img-bottom {
   width: 100%;
   height: 150px;
   object-fit: cover;
}

.card {
   height: 100%;
   width: 100%;
}

p.card-text {
   height: 90%;
   width: 100%;
   /* background-color: red; */
}

.dealTable {
   height: 300px;
   overflow: auto;
}

.card-title {
   font-size: 16pt;
   font-weight: 800;
}

.card table {
   margin-top: 16px;
   font-size: 8pt;
   height: 10px;
}

.card table tbody td {
   padding: 6px 20px;
}

.btn-group {
   margin-top: 10px;
   margin-left: 75px;
   /* background-color: blue; */
}

/* .b-sidebar {
   top: 90px !important;
   height: 80vh !important;
   width: 400px !important;
} */
</style>
