<template>
  <a :class="className" @click="navigate">
    {{ artist }}
  </a>
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
  },
  methods: {
    navigate: function () {
      const artists = getDecodedPathItems(this.$route.path)
      const newArtists = artists.includes(this.artist)
        ? artists.filter((q) => q !== this.artist)
        : [...artists, this.artist]
      const newPath = `/${newArtists.join("/")}`
      // query は変えない
      this.$router.push({ path: newPath, query: this.$route.query })
    },
  },
}
</script>

<style scoped>
.badge {
  margin-right: 4px;
  padding: 4px;
  font-size: 0.85em;
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
a {
  cursor: pointer;
}
</style>
