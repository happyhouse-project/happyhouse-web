<template>
   <div class="mapArea">
      <div id="map"></div>
   </div>
</template>

<script>
export default {
   mounted() {
      window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
   },

   methods: {
      initMap() {
         var container = document.getElementById('map');
         var options = { center: new kakao.maps.LatLng(37.5743822, 126.9688505), level: 3 };
         var map = new kakao.maps.Map(container, options);

         var zoomControl = new kakao.maps.ZoomControl();
         map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      },
      addScript() {
         const script = document.createElement('script');
         /* global kakao */ script.onload = () => kakao.maps.load(this.initMap);
         script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=c68452e7b09406ba132a933dcc0f25f9';
         /* REST API 키로 요청해야함 */
         document.head.appendChild(script);
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
