<template>
  <div id="app">
    <router-view></router-view>
    <el-button type="primary" @click="gotoSearchInfo" >查找人员信息</el-button>
    <el-button type="primary" @click="gotoGroupInfo">查看QQ群信息</el-button>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      canGoto: true
    }
  },
  methods: {
    gotoSearchInfo() {
      this.canGoto = false
      if (this.$route.path !== '/searchInfo') {
        this.$router.replace('/searchInfo')
      }
    },
    gotoGroupInfo() {
      this.canGoto = false
      if (this.$route.path !== '/groupInfo') {
        this.$router.replace('/groupInfo')
      }
    }
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
