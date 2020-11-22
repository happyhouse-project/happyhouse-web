<template>
   <div class="AptSearch">
      <form>
         <div class="filter-wrap">
            <option value="dong">동</option>
            <option value="deal">금액</option>
         </div>
         <div class="search-wrap">
            <div class="input-field">
               <input id="search" type="text" placeholder="입력하세요" />
            </div>
            <button class="btn-search" type="button">
               <i class="fas fa-search-location"></i>
            </button>
         </div>
      </form>
   </div>
</template>

<script>
export default {
   name: 'SideInfo',
   data: () => {
      return {};
   },
   methods: {},
};
</script>

<style>
.AptSearch {
   /* display: inline-block; */
   position: absolute;
   margin-top: 10px;
   margin-left: 10px;
   left: 0;
   height: 200px;
   height: 70px;
   width: 20em;
   z-index: 8;
   background-color: white;
   border-radius: 5px;
   border: 1px solid rgba(0, 0, 0, 0.15);
   box-shadow: 0px 4px 10px 0px #00000021;
   /* border: 1px solid rgb(211, 211, 211); */
}

.filter-wrap {
   display: flex;
   height: 30px;
}

.search-wrap {
   display: flex;
   width: 100%;
   height: 40px;
   /* background-color: red; */
}

.input-field {
   height: 100%;
   background-color: rgb(242, 242, 242);
   border: 0;
   display: block;
   width: 100%;
   padding: 5px 32px;
   font-size: 16px;
   color: #555;
}

.input-field input {
   background-color: rgb(242, 242, 242);
   width: 100%;
   height: 100%;
   border: none;
}

.btn-search {
   height: 100%;
   width: 50px;
   padding: 6px;
   white-space: nowrap;
   color: #fff;
   border: 0;
   cursor: pointer;
   background: #63c76a;
   transition: all 0.2s ease-out, color 0.2s ease-out;
}
</style>
