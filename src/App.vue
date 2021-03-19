<template>
  <div id="app">
    <SearchInfo/>
  </div>
</template>

<script>
import SearchInfo from "@/components/SearchInfo";

export default {
  name: 'App',
  components: {
    SearchInfo,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  margin: 0;
}
</style>
