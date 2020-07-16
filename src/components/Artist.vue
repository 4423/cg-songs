<template>
  <router-link :class="className" :to="to">
    {{ artist }}
  </router-link>
</template>

<script>
export default {
  name: "Artist",
  props: {
    artist: String,
    highlight: Boolean,
  },
  computed: {
    className() {
      return this.highlight ? "badge badge-success" : "badge badge-dark"
    },
    to () {
      const queries = this.$route.path.split("/")
      if (queries.includes(this.artist)) {
        return this.$route.path.replace(this.artist, "").replace(/\/\//g, "/")
      }
      else {
        return (this.$route.path + '/' + this.artist).replace(/\/\//g, "/")
      }
    }
  },
}
</script>

<style scoped>
/* .badge {
  display: inline-block;
  margin: 2px;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
}
.badge span {
  color: #FFF;
  padding: 2px 4px;
  border-radius: 4px;
  font-weight: 400;
}
.default {
  background-color: #555;
}
.highlight {
  background-color: #099c14;
} */
.badge {
  margin-right: 4px;
  padding: 4px;
  font-size: .85em;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
}
.badge-success {
  background-color: #099c14;
}
.badge-dark {
  background-color: #555555;
}
</style>