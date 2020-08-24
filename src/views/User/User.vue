<template>
  <div class="user">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="9">
          <!-- Breadcrumb -->
          <h1>{{ $store.state.userInfo.name }}</h1>
          <BreadCrumb
            :currentRoute="this.$route.name"
            :userName="currentDisplayedUser.name"
            albumName="empty"
            class="mb-4"
          ></BreadCrumb>
          <v-row>
            <v-col cols="12">
              <v-row justify="center">
                <h1>{{ currentDisplayedUser.name }}</h1>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="mb-10">
            <v-col cols="12">
              <v-row class="mx-10" justify="space-around">
                <span>{{ currentDisplayedUser.company.name }}</span>
                <span class="gray--text text--lighten-4">–</span>
                <span>{{ currentDisplayedUser.email }}</span>
                <span class="gray--text">–</span>
                <span
                  >{{
                    currentDisplayedUser.address.street +
                      ", " +
                      currentDisplayedUser.address.zipcode +
                      " " +
                      currentDisplayedUser.address.city
                  }}
                </span>
              </v-row>
            </v-col>
          </v-row>
          <AlbumGrid
            title="Albums"
            :items="
              persistedData.albums.filter(
                (album) => album.userId == this.currentDisplayedUser.id
              )
            "
          ></AlbumGrid>
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
  computed: {
    currentDisplayedUser() {
      return this.$store.getters.getUser;
    },
    getData() {
      return this.$store.getters.getData;
    },
  },
  // watch: {
  //   currentDisplayedUser(newUser, oldUser) {
  //     alert("NEW: " + newUser.name);
  //     alert("OLD: " + oldUser.name);
  //   },
  // },
  created() {
    const storedData = this.openStorage();
    if (storedData) {
      this.persistedData = {
        ...this.persistedData,
        ...storedData,
      };
      this.$store.dispatch("setStateData", { data: this.persistedData });
    }
  },
  mounted() {
    alert("hej");
    this.$store.dispatch("setView", { isViewing: false }).then(
      this.axios.get(this.albumsAPI).then((response) => {
        this.persistedData.albums = response.data;
        this.$store.dispatch("setStateData", { data: this.persistedData });
      })
    );
  },
  data() {
    return {
      albumsAPI: "https://jsonplaceholder.typicode.com/albums",
      persistedData: {
        albums: [],
        albumTitle: "",
        favorites: [],
        photos: [],
        users: [],
        userInfo: null,
        userName: "",
        isViewing: false,
      },
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
