<template>
  <div class="home">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="9">
          <!-- Breadcrumb -->
          <BreadCrumb
            :currentRoute="this.$route.name"
            userName=""
            albumName=""
            class="mb-4"
          ></BreadCrumb>
          <!-- Favorites -->
          <UserGrid :title="titleFavorites" :items="list.favorites"></UserGrid>
          <!-- Users -->
          <UserGrid :title="titleUsers" :items="list.users"></UserGrid>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import BreadCrumb from "@/components/BreadCrumb.vue";
import UserGrid from "@/components/UserGrid.vue";

export default {
  name: "Home",
  components: {
    BreadCrumb,
    UserGrid,
  },
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
    this.axios.get(this.usersAPI).then((response) => {
      this.persistedData.users = response.data;
      if (
        this.$store.state.users === undefined ||
        this.$store.state.users.length == 0
      ) {
        this.$store.commit("FETCH_USERS", {
          users: this.persistedData.users,
        });
        this.$store.commit("SORT_ARRAY", "name");
      }
      this.$store.dispatch("setStateData", { data: this.persistedData });
    });
  },
  computed: {
    list() {
      return this.$store.getters.getData;
    },
    getData() {
      return this.$store.getters.getData;
    },
  },
  methods: {
    openStorage() {
      return JSON.parse(localStorage.getItem("persistedData"));
    },
  },
  data() {
    return {
      myStorage: null,
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
      titleFavorites: "Favorites",
      titleUsers: "Users",
      usersAPI: "https://jsonplaceholder.typicode.com/users",
    };
  },
};
</script>
<style scoped></style>
