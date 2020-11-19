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
         console.log('>>>' + bounds.getSouthWest() + '/' + bounds.getNorthEast());
         console.log('Daum Map Loaded', boundsStr);
         this.mapObject = map;
      },

      onMapEvent(event, params) {
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

         if (event === 'dragend') {
            console.log('Im Drag! ' + params);

            axios
               .post('map/aptDragSearch', latlng)
               .then((response) => {
                  console.log(response.data);
               })
               .catch((exp) => {
                  console.log('getTodoList처리에 실패하였습니다.' + exp);
               });
         }
      },
   },
};
</script>

<style>
/* [task] _ 브라우저 높이에 맞게 사이즈 풀로 채우기 */
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
