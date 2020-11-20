<template>
   <div class="mapArea">
      <vue-daum-map
         id="map"
         :appKey="appKey"
         :center.sync="center"
         :level.sync="level"
         :mapTypeId="mapTypeId"
         :libraries="libraries"
         @load="onLoad"
         @zoom_changed="onMapEvent('zoom_changed', $event)"
         @dblclick="onMapEvent('dblclick', $event)"
         @dragend="onMapEvent('dragend', $event)"
         @tilesloaded="onMapEvent('tilesloaded', $event)"
         @maptypeid_changed="onMapEvent('maptypeid_changed', $event)"
      >
      </vue-daum-map>
   </div>
</template>

<script>
import axios from '../axios-common.js';
import VueDaumMap from 'vue-daum-map';

export default {
   name: 'App',
   components: { VueDaumMap },
   data: () => ({
      appKey: 'c68452e7b09406ba132a933dcc0f25f9',
      center: { lat: 37.5743822, lng: 126.9688505 },
      level: 3,
      mapTypeId: VueDaumMap.MapTypeId.NORMAL,
      libraries: [],
      mapObject: null,
   }),
   methods: {
      onLoad(map) {
         // 지도의 현재 영역을 얻어옵니다
         var bounds = map.getBounds();
         // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
         var boundsStr = bounds.toString();
         this.mapObject = map;

         this.onMapEvent('dragend');
      },

      onMapEvent(event) {
         var bounds = this.mapObject.getBounds();

         // 영역정보의 남서쪽 정보를 얻어옵니다
         var swLatlng = bounds.getSouthWest();

         // 영역정보의 북동쪽 정보를 얻어옵니다
         var neLatlng = bounds.getNorthEast();

         var latlng = {
            from: swLatlng.toString(),
            to: neLatlng.toString(),
         };

         //console.log(latlng);

         if (event == 'dragend' || event == 'zoom_changed') {
            axios
               .post('map/aptDragSearch', latlng)
               .then((response) => {
                  console.log(event);
                  this.setInfoMarker(response.data);
               })
               .catch((exp) => {
                  console.log('getTodoList처리에 실패하였습니다.' + exp);
               });
         }
      },

      setInfoMarker(data) {
         var imageSrc = 'http://localhost/happyhouse/static/images/marker.png', // 마커이미지의 주소입니다
            imageSize = new kakao.maps.Size(40, 45), // 마커이미지의 크기입니다
            imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

         // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
         var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

         // 기존 마커 초기화
         var marker;
         for (const idx in marker) {
            marker[idx].setMap(null);
         }

         for (var idx in data) {
            // 미만의 데이터까지만
            if (idx >= 30) break;

            var vo = data[idx];
            var position = new kakao.maps.LatLng(vo.lat, vo.lng);

            // console.log(vo.aptName + ',' + vo.dong);
            // console.log('>>' + vo.deals[0].dealAmount);

            // 마커를 생성합니다
            marker = new kakao.maps.Marker({
               map: this.mapObject,
               position: position,
               image: markerImage, // 마커이미지 설정
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(this.mapObject);

            // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            var content =
               '<div class="customoverlay">' +
               '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
               '    <span class="title">' +
               vo.aptName +
               '                  <br>' +
               vo.dong +
               '                  <br>' +
               vo.deals[0].dealAmount +
               '만원</span>' +
               '  </a>' +
               '</div>';

            // console.log('content > ' + content);

            // 커스텀 오버레이를 생성합니다
            var customOverlay = new kakao.maps.CustomOverlay({
               map: this.mapObject,
               position: position,
               content: content,
               xAnchor: 0.55,
               yAnchor: 1,
            });
         }
      },
   },
};
</script>

<style>
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

.customoverlay {
   position: relative;
   bottom: 85px;
   border-radius: 6px;
   border: 1px solid #ccc;
   border-bottom: 2px solid #ddd;
   float: left;
}
.customoverlay:nth-of-type(n) {
   border: 0;
   box-shadow: 0px 1px 2px #888;
}
.customoverlay a {
   display: block;
   text-decoration: none;
   color: #000;
   text-align: center;
   border-radius: 6px;
   font-size: 12px;
   font-weight: bold;
   overflow: hidden;
   background: #d95050;
   background: #79a5ff url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;
}
.customoverlay .title {
   display: block;
   text-align: center;
   background: #fff;
   margin-right: 35px;
   padding: 10px 15px;
   font-size: 12px;
   font-weight: bold;
}
.customoverlay:after {
   content: '';
   position: absolute;
   margin-left: -12px;
   left: 50%;
   bottom: -12px;
   width: 22px;
   height: 12px;
   background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png');
}
</style>
