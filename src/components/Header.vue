<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">
        <div class="logo">
          <router-link to="/"
            ><img
              class="logo-img"
              alt="logo"
              src="../assets/images/happyhouse_logo.png"
          /></router-link>
        </div>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="navbar-menu">
          <b-nav-item><router-link to="/Apt">아파트</router-link></b-nav-item>
          <b-nav-item><router-link to="#">연립 다세대 주택</router-link></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="login-tab"><router-link to="/login">로그인</router-link></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<style scoped>
header {
  min-height: 30px;
  font-size: 18px;
  font-weight: bold;
}

.logo {
  float: left;
  padding: 10px;
}

.logo-img {
  width: 40px;
  height: 40px;
}

a {
  color: white;
}

a:hover {
  color: rgb(82, 111, 240);
  text-decoration: none;
}

.login-tab {  
  font-size: 16px;
  font-weight: normal;
}
</style>
