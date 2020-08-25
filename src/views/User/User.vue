<template>
  <div class="user">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="9">
          <!-- Breadcrumb -->
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
                    `${currentDisplayedUser.address.street}, 
                      ${currentDisplayedUser.address.zipcode} 
                      ${currentDisplayedUser.address.city}`
                  }}
                </span>
              </v-row>
            </v-col>
          </v-row>
          <AlbumGrid
            title="Albums"
            :items="
              getData.albums.filter(
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
        isViewing: false,
      });
    }
    this.axios.get(`${this.apiPath}/albums`).then((response) => {
      if (
        this.$store.state.albums === undefined ||
        this.$store.state.albums.length == 0
      ) {
        this.$store.commit("SET_ALBUMS", {
          albums: response.data,
        });
      }
      this.$store.dispatch("setPersistedData");
    });
    // );
  },
};
</script>
<style scoped></style>
