<template>
  <div id="setlist">
    <Songs v-if="hasArtists && hasSongs" :songs="songs" :selected="artists"></Songs>
    <span v-if="!hasArtists">
      キャラクター名を指定してください。
    </span>
    <span v-else-if="songs == null || songs.length == 0">
      見つかりませんでした。
      フルネームで指定していますか？
    </span>
    <span v-else-if="failedToLoad">
      データの読み込みに失敗しました。
    </span>
  </div>
</template>

<script>
import Songs from './Songs.vue'

export default {
  name: "Setlist",
  props: {
    artists: Array
  },
  components: {
    Songs
  },
  data: function () {
    return {
      songs: [],
      allSongs: [],
      failedToLoad: false,
    }
  },
  computed: {
    hasArtists: function () {
      return this.artists != null && this.artists.length > 0
    },
    hasSongs: function () {
      return this.songs != null && this.songs.length > 0
    }
  },
  methods: {
    getSongsByArtists: function (artists) {
      return this.allSongs.filter(s => {
        return artists.every(a => s.artists.includes(a))
      })
    }
  },
  mounted() {
    this.axios.get("https://raw.githubusercontent.com/4423/cg-data/main/data/songs.json")
      .then(response => {
        this.allSongs = response.data;
        this.songs = this.getSongsByArtists(this.artists);
        this.failedToLoad = false;
      })
      .catch(() => {
        this.failedToLoad = true;
      })
  },
  watch: {
    artists: function () {
      this.songs = this.getSongsByArtists(this.artists)
    }
  }
}
</script>
