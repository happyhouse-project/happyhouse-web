<template>
   <div class="mapArea">
      <info-display :sendStation="infoStation" :sendKeyword="infoKeyword" :sendInflu="infoInflu"></info-display>
      <apt-search @searchApt="searchAptByNo" @changeMapFlag="changeMapType"></apt-search>
      <side-info v-show="is_show" :sendData="aptInfo" :aptReviews="reviews" v-on:closeFlag="changeIsShow" @updateReview="updateReviews"></side-info>
      <div>
         <b-sidebar id="sidebar-right" title="Sidebar" right shadow>
            <div class="px-3 py-2">
               <p>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
               </p>
               <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
            </div>
         </b-sidebar>
      </div>
      <vue-daum-map
         id="map"
         :appKey="appKey"
         :center.sync="center"
         :level.sync="level"
         :mapTypeId="mapTypeId"
         :libraries="libraries"
         @load="onLoad"
         @tilesloaded="onMapEvent('titlesloaded', $event)"
         @zoom_changed="onMapEvent('zoom_changed', $event)"
         @dblclick="onMapEvent('dblclick', $event)"
         @maptypeid_changed="onMapEvent('maptypeid_changed', $event)"
      >
      </vue-daum-map>
   </div>
</template>

<script type="text/javascript" src="http://dapi.kakao.com/v2/maps/sdk.js?appkey=5cc03bac0d3510a482068b50dd6e3612"></script>
<script>
import axios from 'axios';
import VueDaumMap from 'vue-daum-map';
import SideInfo from '../components/Apt/SideInfo.vue';
import AptSearch from '../components/Apt/AptSearch.vue';
import infoDisplay from '../components/Apt/infoDisplay.vue';

export default {
   name: 'Apt',
   components: { VueDaumMap, SideInfo, AptSearch, infoDisplay },
   data: () => ({
      appKey: 'c68452e7b09406ba132a933dcc0f25f9', //restAPI key
      center: { lat: '', lng: '' },
      level: 3,
      mapTypeId: VueDaumMap.MapTypeId.NORMAL,
      libraries: [],
      mapObject: null,
      is_show: false, // sideInfo 닫기
      aptList: [],
      markers: [],
      customOverlays: [],
      aptInfo: [{ no: '' }, { dong: '' }, { aptName: '' }, { buildYear: '' }, { lat: '' }, { lng: '' }, { deal: '' }, { deals: [] }],
      aptNo: '',
      reviews: [],

      //infoDisplay - 역정보, 다이소 등
      infoStation: [],
      infoKeyword: [],
      infoInflu: 0,
      apiMarkers: [],
   }),
   filters: {},
   created() {
      this.initCenter();
   },
   methods: {
      initCenter() {
         // 중심위치 세팅
         this.center.lat = 37.5743822;
         this.center.lng = 126.9688505;
      },
      // SideInfo에서 닫기 클릭시 종료
      changeIsShow() {
         // console.log('changeIsShow', this.is_show);
         this.is_show = !this.is_show;
      },
      onLoad(map) {
         this.onSearchInit();
         // 지도의 현재 영역을 얻어옵니다
         var bounds = map.getBounds();
         // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
         var boundsStr = bounds.toString();
         this.mapObject = map;
         this.markers = [];
         this.customOverlays = [];
         // 기존 마커 초기화
         // this.onMapEvent('dragend');
      },

      onSearchInit() {
         this.aptNo = this.$route.params.no;
         if (this.aptNo !== undefined) {
            this.getAptDetail(this.aptNo);
         }
      },

      onMapEvent(event) {
         // console.log('onMapEvent : ' + event);
         var bounds = this.mapObject.getBounds();

         // 영역정보의 남서쪽 정보를 얻어옵니다
         var swLatlng = bounds.getSouthWest();

         // 영역정보의 북동쪽 정보를 얻어옵니다
         var neLatlng = bounds.getNorthEast();

         var latlng = {
            from: swLatlng.toString(),
            to: neLatlng.toString(),
         };

         //  console.log(latlng);

         if (event == 'titlesloaded' || event == 'zoom_changed') {
            axios
               .post('http://localhost/happyhouse/house/aptDragSearch', latlng)
               .then((response) => {
                  this.aptList = response.data;
                  this.setInfoMarker();
                  this.setMarkerClick();
               })
               .catch((exp) => {
                  console.log('err.' + exp);
               });
         }
      },

      setInfoMarker() {
         var imageSrc = 'http://localhost/happyhouse/static/images/marker.png', // 마커이미지의 주소입니다
            imageSize = new kakao.maps.Size(40, 45), // 마커이미지의 크기입니다
            imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

         // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
         var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

         this.removeMarkers(0);
         this.removeCustomOverays();

         var marker;

         for (var idx in this.aptList) {
            // 미만의 데이터까지만
            //if (idx >= 30) break;

            var apt = this.aptList[idx];
            var position = new kakao.maps.LatLng(apt.lat, apt.lng);

            // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            var content = `<div class="customoverlay">
                                <span class="markerInfo">
                                  <p>${apt.aptName}</p>
                                  <!-- <p style="color:#5f5f5f">${apt.dong}</p> -->
                                  <p style="color:#c10d26">${this.currency(apt.deal)}만원</p>
                                </span>
                            </div>`;

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
               title: apt.no,
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(this.mapObject);
            this.markers.push(marker);

            customOverlay.setMap(this.mapObject);
            this.customOverlays.push(customOverlay);
         }
      },

      setMarkerClick() {
         this.markers.forEach((current, i) => {
            kakao.maps.event.addListener(current, 'click', () => {
               var no = current.getTitle();
               var positions = current.getPosition();
               // console.log('현재 좌표 범위 ' + current.getPosition());

               // // 중앙값 변경
               // this.mapObject.setCenter(new kakao.maps.LatLng(positions.Ma, positions.La));
               // this.onMapEvent('dragend'); // 중앙값 이동 후, 변경 지도 기준으로 다시 뿌리기
               // axios
               //    .get('http://localhost/happyhouse/house/' + no)
               //    .then((response) => {
               //       this.aptInfo = response.data;
               //       this.getReviews(no);
               //       this.is_show = true;
               //    })
               //    .catch((err) => {
               //       console.log('catch : ' + err);
               //    });
               this.getAptDetail(no);

               this.apiGetStation(positions);
               this.apiGetKeyword('다이소', positions);
               this.apiGetInfluence(positions);
            });
         });
      },

      getAptDetail(no) {
         axios
            .get('http://localhost/happyhouse/house/' + no)
            .then((response) => {
               console.log(response.data);
               this.aptInfo = response.data;
               this.center.lat = this.aptInfo.lat;
               this.center.lng = this.aptInfo.lng;
               this.getReviews(no); // 리뷰 가져오기
               this.is_show = true;
            })
            .catch((err) => {
               console.log('catch : ' + err);
            });
      },

      removeMarkers(i) {
         /* i : 0(기본마커) 1(api마커)
          */
         if (i == 0) {
            for (var i = 0; i < this.markers.length; i++) {
               this.markers[i].setMap(null);
            }
            this.markers = [];
         } else {
            for (var i = 0; i < this.apiMarkers.length; i++) {
               this.apiMarkers[i].setMap(null);
            }
            this.apiMarkers = [];
         }
      },

      removeCustomOverays() {
         for (var i = 0; i < this.customOverlays.length; i++) {
            this.customOverlays[i].setMap(null);
         }
         this.customOverlays = [];
      },

      searchAptByNo(no) {
         this.getAptDetail(no);
      },

      currency(value) {
         var num = new Number(value);
         return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
      },

      getReviews(no) {
         axios
            .get('http://localhost/happyhouse/reviews/' + no)
            .then((response) => {
               //this.loading = false
               this.reviews = response.data;
               console.log(this.reviews);
            })
            .catch((error) => {
               alert('요청에 실패했습니다.');
               console.log(error);
            });
      },

      updateReviews(no) {
         // 리뷰 입력시 업데이트 메서드 호출
         this.getReviews(no);
      },

      //지도 타입 변경
      changeMapType(type) {
         /*
         NORMAL   1
         HYBRID   3
         TERRAIN  7
         USE_DISTRICT   10
         */

         // 오버레이로 계속 쌓이기 때문에, 기존 맵타입 지우고 받기
         this.mapObject.removeOverlayMapTypeId(this.mapTypeId);

         var changeMaptype;
         // maptype에 따라 지도에 추가할 지도타입을 결정합니다
         if (type === 'normal') {
            this.mapObject.addOverlayMapTypeId(kakao.maps.MapTypeId.NORMAL);
            changeMaptype = 1;
         } else if (type === 'hybrid') {
            this.mapObject.addOverlayMapTypeId(kakao.maps.MapTypeId.HYBRID);
            changeMaptype = 3;
         } else if (type === 'terrain') {
            // 지형정보 지도타입
            this.mapObject.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);
            changeMaptype = 7;
         } else if (type === 'use_district') {
            // 지적편집도 지도타입
            this.mapObject.addOverlayMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT);
            changeMaptype = 10;
         }

         // 지도에 추가된 타입정보를 갱신합니다
         this.mapTypeId = changeMaptype;
      },

      // ========== [추가] 좌표기준 가까운 역 검색 ============

      //좌표 기준 역 검색 -> 가까운 역 정보 반환
      apiGetStation(positions) {
         axios
            .get(`https://dapi.kakao.com/v2/local/search/category.json?category_group_code=SW8&x=${positions.getLng()}&y=${positions.getLat()}&sort=distance&size=3`, {
               headers: {
                  Authorization: `KakaoAK ${this.appKey}`, //the token is a variable which holds the token
               },
            })
            .then((response) => {
               var result = response.data.documents;
               this.infoStation = result[0];
               // console.log('부모 infoStation ', this.infoStation);
            })
            .catch((err) => {
               console.log('catch : ' + err);
            });
      },

      //좌표 기준 키워드(다이소) 검색 -> 가까운 정보 정보 반환
      apiGetKeyword(keyword, positions) {
         axios
            .get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&x=${positions.getLng()}&y=${positions.getLat()}&sort=distance&size=3`, {
               headers: {
                  Authorization: `KakaoAK ${this.appKey}`, //the token is a variable which holds the token
               },
            })
            .then((response) => {
               var result = response.data.documents;
               // console.log(result);
               this.infoKeyword = result[0];
               // console.log('부모 infoStation ', this.infoKeyword);
            })
            .catch((err) => {
               console.log('catch : ' + err);
            });
      },

      //좌표기준 반경 500M의 편의점, 카페, 음식점 조회
      apiGetInfluence(positions) {
         /*
         CS2(편의점), FD6(음식점), CE7(카페)
         */
         axios
            .get(`https://dapi.kakao.com/v2/local/search/category.json?category_group_code=CS2,FD6,CE7&x=${positions.getLng()}&y=${positions.getLat()}&radius=300&sort=distance`, {
               headers: {
                  Authorization: `KakaoAK ${this.appKey}`, //the token is a variable which holds the token
               },
            })
            .then((response) => {
               var resultPlace = response.data.documents;
               this.infoInflu = response.data.meta.total_count;
               this.setApiMarker(resultPlace);
               // this.level = 2; // << api마커 볼땐 2단계
            })
            .catch((err) => {
               console.log('catch : ' + err);
            });
      },

      setApiMarker(resultPlace) {
         var source = [
            { type: 'CS2', img: '1' }, //CS2 : 편의점
            { type: 'CS2', img: '1' },
            { type: 'CS2', img: '1' },
         ];

         var imageSrc = 'https://toppng.com/uploads/preview/map-point-google-map-marker-gif-11562858751s4qufnxuml.png', // 마커이미지의 주소입니다
            imageSize = new kakao.maps.Size(40, 45), // 마커이미지의 크기입니다
            imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

         // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
         var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

         this.removeMarkers(1); //api마커의 기존 마커 제거

         var apiMarker;

         for (var idx in resultPlace) {
            // 미만의 데이터까지만
            // if (idx >= 50) break;

            var api = resultPlace[idx];
            console.log(api.place_name);
            var position = new kakao.maps.LatLng(api.y, api.x);

            // 마커를 생성합니다
            apiMarker = new kakao.maps.Marker({
               map: this.mapObject,
               position: position,
               image: markerImage, // 마커이미지 설정
               // clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
               title: api.place_name,
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            apiMarker.setMap(this.mapObject);
            this.apiMarkers.push(apiMarker);
         }
      },
   },
};
</script>

<style>
#map {
   display: inline-block;
   width: 100%;
   height: 100vh;
}

.mapArea {
   position: relative;
   width: 100%;
   height: 100vh;
   /* padding: 100px 0 130px 0; */
}

.customoverlay {
   position: relative;
   bottom: 80px;
   border-radius: 6px;
   border: 1px solid #ccc;
   border-bottom: 2px solid #ddd;
   float: left;
}
.customoverlay:nth-of-type(n) {
   border: 0;
   box-shadow: 0px 1px 2px #888;
}

.customoverlay .markerInfo {
   display: block;

   color: #000;
   border-radius: 6px;
   overflow: hidden;

   text-align: center;
   background: #fff;
   /* margin-right: 35px; */
   padding: 7px 10px;
   font-size: 10px;
   font-weight: bold;
}

.customoverlay p {
   margin: 0;
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
