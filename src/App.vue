<template>
  <div id="app">
    <TheHeader />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TheHeader from "./components/TheHeader.vue";

export default Vue.extend({
  name: "App",
  components: {
    TheHeader
  }
});
</script>

<style lang="scss">
#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
