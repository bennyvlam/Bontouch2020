<template>
  <div class="user">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="9">
          <!-- Breadcrumb -->
          <BreadCrumb
            :currentRoute="this.$route.name"
            class="mb-4"
          ></BreadCrumb>
          <v-row>
            <v-col cols="12">
              <v-row justify="center">
                <v-title>userName</v-title>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="mb-10">
            <v-col cols="12">
              <v-row class="mx-10" justify="space-around">
                <span>Bontouch AB</span>
                <span class="gray--text text--lighten-4">–</span>
                <span>benny.lam@bontouch.com</span>
                <span class="gray--text">–</span>
                <span>Runda Vägen 30B, 16751 Bromma</span>
              </v-row>
            </v-col>
          </v-row>
          <AlbumGrid title="Album" :items="albums"></AlbumGrid>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import BreadCrumb from "@/components/BreadCrumb.vue";
import AlbumGrid from "@/components/AlbumGrid.vue";

export default {
  name: "User",
  components: {
    BreadCrumb,
    AlbumGrid,
  },
  mounted() {
    this.axios
      .get(this.albumsAPI)
      .then((response) => (this.albums = response.data));
  },
  data() {
    return {
      albums: [],
      albumsAPI: "https://jsonplaceholder.typicode.com/albums",
      photosAPI: this.albumsAPI + "/" + this.user + "/photos",
    };
  },
  methods: {},
};
</script>
<style scoped></style>
