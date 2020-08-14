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
          <!-- <v-btn @click="hej">AA</v-btn> -->
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

          <!-- </router-link> -->
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
    this.myStorage = window.localStorage;
  },
  mounted() {
    this.axios.get(this.usersAPI).then((response) => {
      this.users = response.data;
      if (
        this.$store.state.users === undefined ||
        this.$store.state.users.length == 0
      ) {
        this.$store.commit("saveUsers", { users: this.users });
      }
    });
  },
  computed: {
    usersList() {
      return this.$store.state.users;
    },
    favoritesList() {
      return this.$store.state.favorites;
    },
  },
  methods: {
    GetSortOrder(key) {
      return function(a, b) {
        if (a[key] > b[key]) {
          return 1;
        } else if (a[key] < b[key]) {
          return -1;
        }
        return 0;
      };
    },
  },
  data() {
    return {
      myStorage: null,
      users: [],
      titleFavorites: "Favorites",
      titleUsers: "Users",
      usersAPI: "https://jsonplaceholder.typicode.com/users",
      user: 0,
      favorites: [
        {
          name: "Benny",
          company: { name: "Bontouch AB" },
          email: "benny.lam@bontouch.com",
        },
      ],
      selected: [2],
      items: [
        {
          name: "Benny",
          company: "Bontouch AB",
          email: "Andreas@bontouch.com",
        },
        {
          name: "Andreas",
          company: "Bontouch AB",
          email: "benny.lam@bontouch.com",
        },
        {
          name: "Karin",
          company: "Bontouch AB",
          email: "Karin@bontouch.com",
        },
      ],
    };
  },
};
</script>
<style scoped></style>
