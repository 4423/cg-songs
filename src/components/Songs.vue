<template>
  <div id="songs">
    <table>
      <tbody>
        <tr v-for="song in songs" :key="key(song)">
          <th class="title">{{ song.title }}</th>
          <td class="artists">
            <Artist v-for="artist in song.artists" 
              :artist="artist"
              :key="artist"
              :highlight="includes(selected, artist)"
            />
          </td>
          <td>{{ song.unit }}</td>
          <!-- <td>{{ song.original }}</td>
          <td>{{ song.coverd }}</td>
          <td>{{ song.game }}</td> -->
          <!-- <td>
            <span v-for="actor in song.actors" :key="actor">
              {{ actor }}
            </span>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Artist from "./Artist.vue"

export default {
  el: '#songs',
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
    key(song) {
      // 青空エール対策
      return song.title + song.artists[0];
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
.artists {
}
</style>