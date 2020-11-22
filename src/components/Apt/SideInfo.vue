<template>
   <div class="info">
      <b-card title="신동아 아파트" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
         <b-card-text>
            <span class="dong">사직동</span>
            <span class="jibun">14-5번지</span>
            <p style="font-size:10pt">2007년</p>
            <hr />
            <b>거래 내역</b><br />
            <b-table striped hover :items="items" :fields="fields"></b-table>
            <div class="btn-group">
               <b-button class="mt-2" variant="outline-warning" @click="toggleModal" style="">찜하기</b-button>
               <b-button class="mt-2" variant="outline-danger" @click="hideModal">닫기</b-button>
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
         count: 0,

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
         items: [
            { no: 40, deal: '104000', area: '23.45' },
            { no: 21, deal: '123000', area: '43' },
            { no: 89, deal: '144000', area: '25' },
            { no: 38, deal: '100090', area: '25' },
            { no: 40, deal: '104000', area: '23.45' },
            { no: 21, deal: '123000', area: '43' },
            { no: 89, deal: '144000', area: '25' },
         ],
      };
   },
   methods: {
      getData() {
         console.log(this.sendData);
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
