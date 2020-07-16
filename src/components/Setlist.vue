<template>
  <div id="setlist">
    <Songs v-if="hasArtists && !notfound" :songs="songs" :selected="artists"></Songs>
    <span v-if="!hasArtists">
      キャラクター名を指定してください。
    </span>
    <span v-if="hasArtists && notfound">
      見つかりませんでした。
      フルネームで指定していますか？
    </span>
  </div>
</template>

<script>
import Songs from './Songs.vue'

export default {
  el: '#setlist',
  name: "Setlist",
  props: {
    artists: Array
  },
  components: {
    Songs
  },
  data: function () {
    return {
      songs: null,
      notfound: false,
    }
  },
  computed: {
    hasArtists: function () {
      return this.artists != null && this.artists.length > 0
    }
  },
  methods: {
    api: function () {
      const param = this.artists.map(s => "artist="+s).join("&")
      this.axios
        .get('https://cgapi.krone.cf/v1/songs?' + param + '&match=all')
        .then(response => {
          this.notfound = false;
          this.songs = response.data;
        })
        .catch(() => {
          this.notfound = true;
        })
    },
  },
  mounted() {
    this.api()
  },
  watch: {
    artists: function () {
      this.api()
    }
  }
}
</script>

<style scoped>
</style>