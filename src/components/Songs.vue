<template>
  <div id="songs">
    <table>
      <tbody>
        <tr v-for="song in songs" :key="song.title">
          <th class="title">{{ song.title }}</th>
          <td>
            <Artist v-for="artist in song.artists" 
              :artist="artist"
              :key="artist"
              :highlight="includes(selected, artist)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Artist from "./Artist.vue"

export default {
  name: "Songs",
  components: {
    Artist,
  },
  props: {
    songs: {
      type: Array,
      default: () => [],
      validator(songs) {
        return songs != null && songs.length > 0
      },
    },
    selected: Array,
  },
  methods: {
    includes(arr, elm) {
      return arr.includes(elm)
    },
  },
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

tr {
  border-bottom: 1px solid #ccc;
}
tr:first-child {
  border-top: 1px solid #ccc;
}

td, th {
  text-align: left;
  vertical-align: middle;
  padding: .5em 0;
}

.title {
  min-width: 200px;
  margin-right: 1em;
}
@media screen and (max-width: 600px) {
  .title {
    min-width: auto;
  }
}
</style>