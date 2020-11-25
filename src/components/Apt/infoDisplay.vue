<template>
   <div class="info-display">
      <div class="info-wrapper">
         {{ sendStation.place_name }}은 {{ sendStation.distance }}M 이내에
         <br />
         {{ sendKeyword.place_name }}은 {{ sendKeyword.distance }}M 이내에
         <br />
         슬세권 : {{ sendInflu }}
      </div>
   </div>
</template>

<script>
import axios from 'axios';

export default {
   name: 'InfoDispaly',
   props: ['sendStation', 'sendKeyword', 'sendInflu'],
   data: () => {
      return {
         name: '',
      };
   },
};
</script>

<style>
.info-display {
   position: absolute;
   top: 80%;
   left: 50%;
   transform: translate(-50%, -50%);
   z-index: 5;
}

.info-wrapper {
   border-radius: 50px;
   width: 400px;
   height: 100px;
   background-color: white;
   /* padding: 20px; */
   box-shadow: 0px 12px 20px 0px #00000045;
}
</style>
