<template>
  <div id="AlbumGrid">
    <!-- Users -->
    <div class="title">
      <h2>{{ title }}</h2>
    </div>
    <v-row>
      <v-col cols="12">
        <v-row justify="space-around">
          <!-- <router-link :to="{ name: 'Album' }"> -->
          <v-card
            v-for="(album, index) in items"
            :key="index"
            class="ma-2 pa-3"
            outlined
            tile
            min-width="260px"
            max-width="260px"
            color="blue lighten-4"
            :to="'USERNAME/albums/' + index"
          >
            <!-- :to="'/album/' + user.name.split(' ').join('')" -->
            <v-card-text class="mb-0 pa-0 blue-grey--text text--darken-2">{{
              album.title
            }}</v-card-text>
          </v-card>
          <!-- </router-link> -->
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "AlbumGrid",
  props: ["title", "items"],
  data() {
    return {
      active: false,
    };
  },
  methods: {},
};
</script>
<style scoped>
h2 {
  font-weight: 300;
}
.title {
  border-bottom: 1px solid lightgray;
}
.v-card {
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>
