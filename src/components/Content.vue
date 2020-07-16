<template>
  <div id="content">
    <router-link to="/" class="title">
      <h1>アイドルマスターシンデレラガールズ<br>歌唱曲検索</h1>
    </router-link>
    <div class="form-group has-search">
      <b-icon-search class="fa fa-search form-control-feedback"></b-icon-search>
      <input
        type="text"
        class="form-control" 
        placeholder="例）渋谷凛 北条加蓮 神谷奈緒"
        v-model="input"
      >
    </div>
    <router-view class="result" :artists="artists"/>
  </div>
</template>

<script>
export default {
  name: 'Content',
  el: '#content',
  components: {
    // Setlist
  },
  data: function () {
    return {
      input: this.$route.path.slice(1).replace(/\//g, " "),
      artists: this.$route.path.split("/").filter(s => s != ""),
    }
  },
  computed: {
    // artists () {
    //   return this.input?.split(" ").filter(s => s != "")
    // },
  },
  watch: {
    input: function () {
      // console.log("input")
      // console.log(this.input)
      // console.log(this.$route.path)
      var path = this.input.replace(/\s+/g, "/")
      if (path[0] != "/") {
        path = "/" + path
      }
      // console.log(path)
      this.$router.push(path)
    },
    $route: function (to) {
      var a = to.path.replace(/\//g, " ")
      if (a[0] == " ") {
        console.log(a)
        a = a.substring(1)
      }
      // console.log("route")
      // console.log(a)
      // console.log(this.input)
      // console.log(this.$route.path)
      this.input = a
      this.artists = this.input?.split(" ").filter(s => s != "")
      // console.log(this.artists)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  margin: .7rem;
}

.result {
  margin: 2rem 0;
}
</style>
