<template>
  <div id="app">
    <CesiumTest />
  </div>
</template>

<script>
import CesiumTest from './components/CesiumTestGithub.vue'

export default {
  name: 'App',
  components: {
    CesiumTest
  }
}
</script>

<style>
html,
body,
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  height: 100%;
  overflow: auto;
}
</style>
