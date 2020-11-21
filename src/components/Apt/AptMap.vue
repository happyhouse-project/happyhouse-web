<template>
  <div>
    <div id="map" class="map"></div>
  </div>
</template>

<script type="text/javascript" src="http://dapi.kakao.com/v2/maps/sdk.js?appkey=5cc03bac0d3510a482068b50dd6e3612"></script>
<script>
export default {
  mounted() {
    window.kakao && window.kakao.maps
      ? this.initMap()
      : this.addKakaoMapScript();
  },
  methods: {
    initMap() {
      var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      };

      var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    }
  }
};
</script>

<style>
#map {
   display: inline-block;
   width: 100%;
   height: 100%;
}

</style>