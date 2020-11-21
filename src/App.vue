<template>
   <div id="app">
      <router-view name="header"></router-view>
      <main>
         <router-view class="rootMain" />
      </main>
      <router-view name="footer"></router-view>
   </div>
</template>

<script></script>

<style>
#app {
   /* height: 100%; */
   width: 100%;
   /* min-width: 960px; */
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   color: #2c3e50;
   /* display: flex;
   flex-direction: column;
   min-height: 100vh; */
}

.rootMain {
   /* min-height: 400px !important; */
   /* height: 1000px !important; */
   /* margin: -100px 0 -50px; */
   width: auto !important;
   /* flex: 1 !important; */
}
</style>
