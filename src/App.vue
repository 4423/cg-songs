<template>
  <div id="app">
    <Content />
  </div>
</template>

<script>
import Content from "./components/Content.vue"

export default {
  name: "App",
  components: {
    Content,
  },
}
</script>

<style>
@font-face {
  font-family: "LINESeedJP_OTF_Rg";
  src: url("./assets/font/LINESeedJP_OTF_Rg.woff") format("woff");
}
@font-face {
  font-family: "LINESeedJP_OTF_Bd";
  src: url("./assets/font/LINESeedJP_OTF_Bd.woff") format("woff");
}

@import url("https://fonts.googleapis.com/css?family=Noto+Sans+JP");

#app {
  font-family: "LINESeedJP_OTF_Rg", "Noto Sans JP", "Montserrat", "游ゴシック",
    YuGothic, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ",
    Meiryo, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
