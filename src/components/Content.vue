<template>
  <div id="content">
    <router-link to="/" class="title">
      <h1>アイドルマスターシンデレラガールズ<br />楽曲検索</h1>
    </router-link>
    <div class="form-group has-search">
      <b-icon-search class="fa fa-search form-control-feedback"></b-icon-search>
      <input
        type="text"
        class="form-control"
        placeholder="例）渋谷凛 北条加蓮 神谷奈緒"
        v-model="input"
      />
    </div>
    <router-view class="result" :artists="artists" />
  </div>
</template>

<script>
import { equalsInAnyOrder } from "../utils/array.js"
import { getDecodedPathItems } from "../utils/path.js"

export default {
  name: "Content",
  data: function () {
    return {
      input: getDecodedPathItems(this.$route.path).join(" "),
    }
  },
  computed: {
    artists: function () {
      return getDecodedPathItems(this.$route.path)
    },
  },
  watch: {
    input: function () {
      const inputArtists = getDecodedPathItems(this.input.replace(/\s+/g, "/"))
      const currentArtists = getDecodedPathItems(this.$route.path)
      // avoid NavigationDuplicated
      if (!equalsInAnyOrder(inputArtists, currentArtists)) {
        const newPath = `/${inputArtists.join("/")}`
        this.$router.push({ path: newPath, query: this.$route.query })
      }
    },
    $route: function (to) {
      this.input = getDecodedPathItems(to.path).join(" ")
    },
  },
}
</script>

<style scoped>
#content {
  width: 70%;
  margin: 20px auto;
}
@media screen and (max-width: 896px) {
  #content {
    width: 90%;
  }
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.title {
  color: #2c3e50;
}
.title h1 {
  margin: 1em 0;
}

.has-search .form-control {
  padding-left: 2.375rem;
}

.has-search .form-control-feedback {
  position: absolute;
  z-index: 2;
  display: block;
  width: 1rem;
  height: 1rem;
  text-align: center;
  pointer-events: none;
  color: #aaa;
  margin: 0.7rem;
}

.result {
  margin: 2rem 0;
}
</style>
