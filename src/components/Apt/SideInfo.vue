<template>
   <div class="info">
      <b-card :title="getAptName" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
         <b-card-text>
            <span class="dong">{{ sendData.dong }}</span>
            <span class="jibun">{{ sendData.jibun }}</span>
            <p style="font-size:10pt">{{ sendData.buildyear }}</p>
            <hr />
            <b>거래 내역</b><br />
            <b-table striped hover :items="getDealTable" :fields="fields"></b-table>
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
         aptName: '',

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
   filters: {
      price: function(value) {
         if (!value) return value;
         return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
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
            dealList.push({
               no: arr[i].no,
               deal: arr[i].deal,
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
   overflow: auto;
   /* border: 1px solid rgb(211, 211, 211); */
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

.card-title {
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
