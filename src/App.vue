<template>
  <div id="app">
    <header class="header">
      <img class="logo" src="@/assets/img/logo.png">
    </header>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/questionary">Опросник</router-link>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background: #7be2ac;
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
