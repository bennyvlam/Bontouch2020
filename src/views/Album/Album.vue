<template>
  <div class="album">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="9">
          <!-- Breadcrumb -->
          <BreadCrumb
            :currentRoute="this.$route.name"
            :userName="getData.userInfo.name"
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
  data() {
    return {
      apiPath: "https://jsonplaceholder.typicode.com",
      persistedData: {
        albums: [],
        albumTitle: "",
        favorites: [],
        isViewing: false,
        photos: [],
        photoIndex: 0,
        users: [],
        userInfo: {},
        userName: "",
      },
    };
  },
  methods: {
    openStorage() {
      return JSON.parse(localStorage.getItem("persistedData"));
    },
  },
  mounted() {
    const storedData = this.openStorage();
    if (storedData) {
      this.persistedData = {
        ...this.persistedData,
        ...storedData,
      };
      this.$store.dispatch("setStateData", {
        data: this.persistedData,
        isViewing: this.persistedData.isViewing,
      });
    }

    this.axios
      .get(this.apiPath + "/photos")
      .then(
        (response) =>
          (this.persistedData.photos = response.data.filter(
            (photo) => photo.albumId == this.$route.params.albumId
          ))
      );
    this.axios
      .get(this.apiPath + "/albums")
      .then((response) => {
        this.persistedData.albums = response.data;
        this.persistedData.albumTitle = response.data.filter(
          (album) =>
            album.userId == this.currentDisplayedUser.id &&
            album.id == this.$route.params.albumId
        )[0].title;
        this.$store.dispatch("setStateData", {
          data: this.persistedData,
          isViewing: this.persistedData.isViewing,
        });
      });
  },
};
</script>
<style scoped></style>
