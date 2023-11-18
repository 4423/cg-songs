<template>
  <div id="setlist">
    <div v-if="showPartialMatchButton" class="settings">
      <b-form-checkbox
        v-model="enablePartialMatch"
        name="check-button"
        switch
        @change="updateModeQueryParam"
      >
        部分一致（セトリ予想モード）
      </b-form-checkbox>
    </div>

    <span v-if="!hasArtists"> キャラクター名を入力してください。 </span>
    <span v-else-if="!hasSongs">
      見つかりませんでした。 フルネームで指定していますか？
    </span>
    <span v-else-if="failedToLoad">
      データの読み込みに失敗しました。再度時間を置いて試してください。
    </span>

    <Songs
      v-if="hasArtists && hasSongs"
      :songs="songs"
      :selected="artists"
    ></Songs>
  </div>
</template>

<script>
import Songs from "./Songs.vue"

// query param で使う mode の値
const MODE = {
  SETLIST: "setlist",
}

export default {
  name: "Setlist",
  props: {
    artists: Array,
  },
  components: {
    Songs,
  },
  data: function () {
    return {
      allSongs: [],
      failedToLoad: false,
      enablePartialMatch: this.$route.query?.mode === MODE.SETLIST,
    }
  },
  computed: {
    hasArtists: function () {
      return this.artists != null && this.artists.length > 0
    },
    hasSongs: function () {
      return this.songs != null && this.songs.length > 0
    },
    hasSongsByPartialMatch: function () {
      return (
        this.songsByPartialMatch != null && this.songsByPartialMatch.length > 0
      )
    },
    showPartialMatchButton: function () {
      return (
        this.hasSongsByPartialMatch &&
        this.artists != null &&
        this.artists.length >= 2
      )
    },
    songs: function () {
      if (this.enablePartialMatch) {
        return this.songsByPartialMatch
      } else {
        return this.songsByPartialMatch.filter((s) => {
          return this.artists.every((a) => s.artists.includes(a))
        })
      }
    },
    songsByPartialMatch: function () {
      // 一致度を表すプロパティを追加
      const songsWithScore = []
      this.allSongs.forEach((s) => {
        const matchedCount = this.artists.filter((a) =>
          s.artists.includes(a)
        ).length
        s["matchedCount"] = matchedCount
        s["score"] = matchedCount / s.artists.length
        if (matchedCount > 0) {
          songsWithScore.push(s)
        }
      })
      // 次の優先度でソート
      // 1. matchedCount の降順
      // 2. score の降順
      // 3. artists 数の昇順
      return songsWithScore.sort((a, b) => {
        if (a.matchedCount === b.matchedCount) {
          if (a.score === b.score) {
            return a.artists.length - b.artists.length
          }
          return b.score - a.score
        }
        return b.matchedCount - a.matchedCount
      })
    },
  },
  mounted() {
    this.axios
      .get(
        "https://raw.githubusercontent.com/4423/cg-data/main/data/songs.json"
      )
      .then((response) => {
        this.allSongs = response.data
        this.failedToLoad = false
      })
      .catch(() => {
        this.failedToLoad = true
      })
  },
  methods: {
    updateModeQueryParam: function () {
      const q = this.enablePartialMatch ? { mode: MODE.SETLIST } : {}
      this.$router.push({ path: this.$route.path, query: q })
    },
  },
  watch: {
    $route: function (to) {
      this.enablePartialMatch = to.query?.mode === MODE.SETLIST
    },
  },
}
</script>

<style scoped>
.settings {
  text-align: right;
  margin: 2rem 0;
}
</style>
