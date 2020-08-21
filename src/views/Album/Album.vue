<template>
  <div class="album">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="9">
          <!-- Breadcrumb -->
          <BreadCrumb
            :currentRoute="this.$route.name"
            :userName="getData.persistedData.userInfo.name"
            :albumName="albumTitle"
            class="mb-4"
          ></BreadCrumb>
          <v-row>
            <v-col cols="12">
              <v-row justify="center">
                <h1>{{ albumTitle }}</h1>
              </v-row>
            </v-col>
          </v-row>
          <PhotoGrid
            title="Album"
            :items="persistedData.photos"
            :isViewing="isViewing"
            :photoIndex="persistedData.photoIndex"
          ></PhotoGrid>
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
  computed: {
    albumTitle() {
      return this.$store.getters.getAlbumTitle;
    },
    currentDisplayedUser() {
      return this.$store.getters.getUser;
    },
    isViewing() {
      return this.$store.getters.getViewState;
    },
    getData() {
      return this.$store.getters.getData;
    },
  },
  created() {
    const storedData = this.openStorage();
    if (storedData) {
      this.persistedData = {
        ...this.persistedData,
        ...storedData,
      };
      this.$store.dispatch("setStateData", { data: this.persistedData });
      this.$store.dispatch("setPersistedData");
    }
  },
  mounted() {
    this.axios
      .get(this.photosAPI)
      .then(
        (response) =>
          (this.persistedData.photos = response.data.filter(
            (photo) => photo.albumId == this.$route.params.albumId
          ))
      );
    this.axios.get(this.albumsAPI).then((response) => {
      this.persistedData.albums = response.data;
      this.persistedData.albumTitle = response.data.filter(
        (album) =>
          album.userId == this.currentDisplayedUser.id &&
          album.id == this.$route.params.albumId
      )[0].title;
      this.$store.dispatch("setStateData", { data: this.persistedData });
    });
  },
  data() {
    return {
      persistedData: {
        albums: [],
        albumTitle: "",
        favorites: [],
        photos: [],
        users: [],
        userInfo: null,
        userName: "",
        isViewing: false,
        photoIndex: 0,
      },
      albumsAPI: "https://jsonplaceholder.typicode.com/albums",
      photosAPI: "https://jsonplaceholder.typicode.com/photos",
    };
  },
  methods: {
    openStorage() {
      return JSON.parse(localStorage.getItem("persistedData"));
    },
  },
};
</script>
<style scoped></style>
