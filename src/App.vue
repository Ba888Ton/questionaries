<template>
  <div id="app">
    <header class="header">
      <img class="logo" src="@/assets/img/logo.png">
    </header>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/questionary">Опросник</router-link>
      <router-link to="/question-configurator">Конфигуратор опросника</router-link>
      <router-link to="/configurator">Конфигуратор</router-link>
      <router-link to="/test">test</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
}
</script>
<style lang="scss">
#app {
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 2rem;
  background-image: url('./assets/img/light_bg.png');
  background-size: cover;
}
#nav {
  padding: 2rem;
  font-size: 2rem;
  a {
    font-weight: bold;
    color: $secondary;
    text-decoration: none;
    display: inline-block;
    padding: 0 40px;
    &.router-link-exact-active {
      color: #fff;
    }
  }
}
.logo {
  width: 300px;
}
.header {
  text-align: left;
  background: #fff;
}
</style>
