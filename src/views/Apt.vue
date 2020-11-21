<template>
   <div class="mapArea">
      <!-- <div v-show="is_show" id="sideinfo">
         <side-info></side-info>
      </div> -->
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

<script type="text/javascript" src="http://dapi.kakao.com/v2/maps/sdk.js?appkey=5cc03bac0d3510a482068b50dd6e3612"></script>
<script>
import axios from 'axios';
import VueDaumMap from 'vue-daum-map';
//import SideInfo from '../components/Apt/SideInfo.vue';

export default {
   name: 'Apt',
   components: { VueDaumMap },
   data: () => ({
      appKey: '5cc03bac0d3510a482068b50dd6e3612',
      center: { lat: 37.5743822, lng: 126.9688505 },
      level: 3,
      mapTypeId: VueDaumMap.MapTypeId.NORMAL,
      libraries: [],
      mapObject: null,
      is_show: false,
      aptList: [],
      markers: [],
      customOverlays: [],
      aptInfo: [{ no: '' }, { dong: '' }, { aptName: '' }, { buildYear: '' }, { lat: '' }, { lng: '' }, { deal: '' }, { deals: [] }],
   }),
   filters: {},
   methods: {
      onLoad(map) {
         // 지도의 현재 영역을 얻어옵니다
         var bounds = map.getBounds();
         // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
         var boundsStr = bounds.toString();
         this.mapObject = map;
         this.markers = [];
         this.customOverlays = [];
         // 기존 마커 초기화
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

         console.log(latlng);

         if (event == 'dragend' || event == 'zoom_changed') {
            axios
               .post('http://localhost/happyhouse/house/aptDragSearch', latlng)
               .then((response) => {
                  this.aptList = response.data;
                  this.setInfoMarker();
               })
               .catch((exp) => {
                  console.log('getTodoList처리에 실패하였습니다.' + exp);
               });
         }
      },

      setInfoMarker() {
         var imageSrc = 'http://localhost/happyhouse/static/images/marker.png', // 마커이미지의 주소입니다
            imageSize = new kakao.maps.Size(40, 45), // 마커이미지의 크기입니다
            imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

         // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
         var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

         var marker;

         this.removeMarkers();
         this.removeCustomOverays();

         for (var idx in this.aptList) {
            // 미만의 데이터까지만
            // if (idx >= 30) break;

            var apt = this.aptList[idx];
            var position = new kakao.maps.LatLng(apt.lat, apt.lng);

            // console.log(vo.aptName + ',' + vo.dong);
            // console.log('>>' + vo.deals[0].dealAmount);
            // 마커에 표시할 인포윈도우를 생성합니다
            // var infowindow = new kakao.maps.InfoWindow({
            //     content: '<div>'+this.aptList[idx].aptName+'</div>' // 인포윈도우에 표시할 내용
            // });

            // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            var content =
               '<div class="customoverlay"><a href="#" @click="selectApt()" target="_self"><span class="title">' +
               apt.aptName +
               '<br>' +
               apt.dong +
               '<br>' +
               this.currency(apt.deal) +
               '만원</span></a></div>';

            // 커스텀 오버레이를 생성합니다
            var customOverlay = new kakao.maps.CustomOverlay({
               map: this.mapObject,
               position: position,
               content: content,
               xAnchor: 0.55,
               yAnchor: 1,
            });

            // 마커를 생성합니다
            marker = new kakao.maps.Marker({
               map: this.mapObject,
               position: position,
               image: markerImage, // 마커이미지 설정
               clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(this.mapObject);
            this.markers.push(marker);

            customOverlay.setMap(this.mapObject);
            this.customOverlays.push(customOverlay);

            kakao.maps.event.addListener(marker, 'click', clickListen(this.aptList[idx].no));

            // axios -> selelctOne 등록
            function clickListen(no) {
               return function() {
                  axios
                     .get('http://localhost/happyhouse/house/' + no)
                     .then((response) => {
                        this.aptInfo = response.data;
                        console.log(this.aptInfo);
                        alert(this.aptInfo.no + ' ' + this.aptInfo.dong + ' ' + this.aptInfo.aptName);
                     })
                     .catch((err) => {
                        console.log('catch : ' + err);
                     });
               };
            }
         }
      },

      removeMarkers() {
         for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
         }
         this.markers = [];
      },

      removeCustomOverays() {
         for (var i = 0; i < this.customOverlays.length; i++) {
            this.customOverlays[i].setMap(null);
         }
         this.customOverlays = [];
      },

      selectApt() {
         alert('dd');
      },

      currency(value) {
         var num = new Number(value);
         return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
      },
   },
};
</script>

<style>
#map {
   display: inline-block;
   width: 100%;
   height: 1000px;
   overflow-y: hidden;
}

.mapArea {
   position: relative;
   width: 100%;
   height: 100%;
   padding: 100px 0 130px 0;
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

#sideinfo {
   display: inline-block;
   position: absolute;
   margin: 20px 0;
   margin-right: 10px;
   right: 0;
   min-height: 500px;
   height: 70%;
   width: 20em;
   z-index: 2;
}
</style>
