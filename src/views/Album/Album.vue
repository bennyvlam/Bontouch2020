<template>
  <div class="album">
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
                <h1>{{ albumTitle.title }}</h1>
              </v-row>
            </v-col>
          </v-row>
          <PhotoGrid title="Album" :items="photos"></PhotoGrid>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import BreadCrumb from "@/components/BreadCrumb.vue";
import PhotoGrid from "@/components/PhotoGrid.vue";

export default {
  name: "Album",
  components: {
    BreadCrumb,
    PhotoGrid,
  },
  mounted() {
    this.axios
      .get(this.photosAPI)
      .then((response) => (this.photos = response.data));
    this.axios
      .get(this.albumsAPI)
      .then((response) => (this.albumTitle = response.data[0]));
    this.axios
      .get(this.userAPI)
      .then((response) => (this.userName = response.data[0]));
  },
  data() {
    return {
      photos: [],
      userName: "Hej",
      albumTitle: "lorem ipsum",
      userAPI: "https://jsonplaceholder.typicode.com/users?id=2",
      albumsAPI: "https://jsonplaceholder.typicode.com/albums?id=2",
      photosAPI: "https://jsonplaceholder.typicode.com/photos?albumId=" + "2",
    };
  },
  methods: {},
};
</script>
<style scoped></style>
