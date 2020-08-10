<template>
  <div class="home">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="9">
          <!-- Breadcrumb -->
          <BreadCrumb :currentRoute="currentRoute" class="mb-4"></BreadCrumb>
          <!-- Favorites -->
          <UserGrid :title="titleFavorites" :items="favorites"></UserGrid>
          <!-- Users -->
          <UserGrid :title="titleUsers" :items="users"></UserGrid>
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
  mounted() {
    this.axios
      .get(this.usersAPI)
      .then((response) => (this.users = response.data));
  },
  data() {
    return {
      users: [],
      currentRoute: this.$route.name,
      titleFavorites: "Favorites",
      titleUsers: "Users",
      albums: [],
      photos: [],
      usersAPI: "https://jsonplaceholder.typicode.com/users",
      albumsAPI: "https://jsonplaceholder.typicode.com/albums/",
      photosAPI: this.albumsAPI + "/" + this.user + "/photos",
      user: 0,
      album: 0,
      photo: 0,
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
