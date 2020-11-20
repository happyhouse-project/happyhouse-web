<template>
   <div id="app">
      <Header class="rootHeader"></Header>
      <router-view class="rootApp"></router-view>
      <Footer class="rootFooter"></Footer>
   </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
   name: 'App',
   components: {
      Header,
      Footer,
   },
};
</script>

<style>
#app {
   height: 100%;
   width: 100%;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   color: #2c3e50;
}

.rootHeader {
   min-height: 30px;
   font-size: 18px;
   font-weight: bold;
   width: auto;
   z-index: 4;
   position: relative;
}
.rootApp {
   min-height: 100%;
   margin: -100px 0 -50px;
   width: auto;
}
.rootFooter {
   min-height: 100px;
}

#nav {
   padding: 30px;
}

#nav a {
   font-weight: bold;
   color: #2c3e50;
}

#nav a.router-link-exact-active {
   color: #42b983;
}
</style>
