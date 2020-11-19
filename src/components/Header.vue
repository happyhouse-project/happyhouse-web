<template>
    <header>
	<!-- <div class="login">		
			<button v-if="member == null" type="button" class="btn btn-primary"
				onclick="#">로그인</button>
		<c:if test="${!empty member}">
		{{member.name}}님 환영합니다
		<button type="button" class="btn btn-primary"
				onclick="#">로그아웃</button>
		</c:if>
	</div> -->

    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">
      <div class="logo">
		<a href="/"><img class="logo-img" alt="logo"
			src="../assets/images/happyhouse_logo.png"></a>
      </div>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">아파트</b-nav-item>
          <b-nav-item href="#">연립다세대 주택</b-nav-item>
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

.logo{
	float:left;
	padding: 10px;
}

.logo-img {
	width: 40px;
	height:40px;
}
</style>