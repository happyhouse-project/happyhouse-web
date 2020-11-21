<template>
   <div class="mapArea">
      <div id="map"></div>
   </div>
</template>

<script>
import axios from '../axios-common.js';

export default {
   data() {
      return {
         appKey: 'c68452e7b09406ba132a933dcc0f25f9',
         map: '',
         swLatlng: '', // 하단 - 남서
         neLatlng: '', // 상단 - 북동
         level: '',
         bounds: '',
      };
   },

   created() {
      console.log('created');
   },

   mounted() {
      window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
      // this.getMapData();
      this.sendDragLocation();
   },

   methods: {
      initMap() {
         var container = document.getElementById('map');
         var options = { center: new kakao.maps.LatLng(37.5743822, 126.9688505), level: 3 };
         this.map = new kakao.maps.Map(container, options);

         var zoomControl = new kakao.maps.ZoomControl();
         this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

         //  console.log(this.map);
      },

      addScript() {
         const script = document.createElement('script');
         /* global kakao */
         script.onload = () => kakao.maps.load(this.initMap);
         script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${this.appKey}`;
         /* REST API 키로 요청해야함 */
         document.head.appendChild(script);
      },

      // // 시작하자마자 데이터 전송
      // sendLocation() {
      //    axios
      //       .get('/')
      //       .then((response) => (this.todoItems = response.data))
      //       .catch((exp) => alert('getTodoList처리에 실패하였습니다.' + exp));
      // },

      // 줌 변경 시 데이터 전송
      sendDragLocation() {
         // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
         kakao.maps.event.addListener(this.map, 'dragend', function() {
            // 지도의 현재 레벨을 얻어옵니다
            this.level = this.map.getLevel();

            // 지도 영역정보를 얻어옵니다
            this.bounds = this.map.getBounds();

            // 영역정보의 남서쪽 정보를 얻어옵니다
            this.swLatlng = this.bounds.getSouthWest();

            // 영역정보의 북동쪽 정보를 얻어옵니다
            this.neLatlng = this.bounds.getNorthEast();

            console.log('drag');
            console.log('sendDragLocation :: ' + this.swLatlng + '/' + this.neLatlng);
         });
      },

      // 지도 : level, bounds, 남서, 북동 정보 얻어오기
      getMapData() {
         // 지도의 현재 레벨을 얻어옵니다
         this.level = this.map.getLevel();

         // 지도 영역정보를 얻어옵니다
         this.bounds = this.map.getBounds();

         // 영역정보의 남서쪽 정보를 얻어옵니다
         this.swLatlng = this.bounds.getSouthWest();

         // 영역정보의 북동쪽 정보를 얻어옵니다
         this.neLatlng = this.bounds.getNorthEast();

         // console.log('1 :: ' + this.level + '/' + this.bounds);
         // console.log('2 :: ' + this.swLatlng + '/' + this.neLatlng);
      },

      handle_toggle: function() {
         alert('OKAY');
         //this.is_show = !this.is_show; // #2, #3
      },
   },
};
</script>

<style>
/* task _ 브라우저 높이에 맞게 사이즈 풀로 채우기 */
#map {
   display: inline-block;
   position: absolute;
   width: 100%;
   height: 100%;
}

.mapArea {
   position: relative;
   width: 100%;
   height: 600px;
}
</style>
