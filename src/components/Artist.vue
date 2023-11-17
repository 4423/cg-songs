<template>
  <router-link :class="className" :to="to">
    {{ artist }}
  </router-link>
</template>

<script>
import { getDecodedPathItems } from "../utils/path.js"

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
      const queries = getDecodedPathItems(this.$route.path)
      if (queries.includes(this.artist)) {
        return "/" + queries.filter(q => q !== this.artist).join("/")
      } else {
        return "/" + [...queries, this.artist].join("/")
      }
    }
  },
}
</script>

<style scoped>
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