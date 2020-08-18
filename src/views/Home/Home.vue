<template>
  <div class="home">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="9">
          <!-- Breadcrumb -->
          <BreadCrumb
            :currentRoute="this.$route.name"
            class="mb-4"
          ></BreadCrumb>
          <!-- Favorites -->
          <UserGrid :title="titleFavorites" :items="favoritesList"></UserGrid>
          <!-- Users -->
          <UserGrid :title="titleUsers" :items="usersList"></UserGrid>
          <v-row>
            <v-col cols="6" sm="12" md="6">
              <p>Favorites: {{ favoritesList.length }}</p>

              <v-card
                v-for="(user, index) in favoritesList"
                :key="index"
                class="ma-2 pa-3"
                outlined
                tile
                min-width="260px"
                color="blue lighten-4"
                :to="'/users/' + user.name.split(/[\s,\.]+/).join('')"
              >
                <p>UserId: {{ user.id }}</p>
                <p>Name: {{ user.name }}</p>
              </v-card>
            </v-col>
            <v-col cols="6" sm="12" md="6">
              <p>Users: {{ usersList.length }}</p>

              <v-card
                v-for="(user, index) in usersList"
                :key="index"
                class="ma-2 pa-3"
                outlined
                tile
                min-width="260px"
                color="blue lighten-4"
                :to="'/users/' + user.name.split(/[\s,\.]+/).join('')"
              >
                <p>UserId: {{ user.id }}</p>
                <p>Name: {{ user.name }}</p>
              </v-card>
            </v-col>
          </v-row>
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
      this.$store.dispatch("updateData", { data: this.persistedData });
    }
  },
  mounted() {
    this.axios.get(this.usersAPI).then((response) => {
      this.persistedData.users = response.data;
      if (
        this.$store.state.users === undefined ||
        this.$store.state.users.length == 0
      ) {
        this.$store.dispatch("getUsersFromBackend", {
          users: this.persistedData.users
        });
      }
    });
  },
  computed: {
    usersList() {
      return this.$store.getters.getUsers;
    },
    favoritesList() {
      return this.$store.getters.getFavorites;
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
        users: [],
        favorites: [],
        userInfo: null,
        userName: "",
        albums: []
      },
      titleFavorites: "Favorites",
      titleUsers: "Users",
      usersAPI: "https://jsonplaceholder.typicode.com/users",
    };
  },
};
</script>
<style scoped></style>
