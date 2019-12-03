<!--
 * @description: 
 * @Author: lal
 * @Date: 2019-12-03 10:46:10
 * @LastEditors: lal
 * @LastEditTime: 2019-12-03 11:12:37
 -->
<template>
  <div id="app">
    <MarkdownView />
  </div>
</template>

<script>
import MarkdownView from "./components/MarkdownView.vue";

export default {
  name: "app",
  components: {
    MarkdownView
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
#app {
  height: 100%;
  margin: 0;
}

#app {
  color: #2c3e50;
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
