<template>
  <div class="user">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="9">
          <!-- Breadcrumb -->
          <BreadCrumb :currentRoute="this.$router" class="mb-4"></BreadCrumb>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
// @ is an alias to /src
import BreadCrumb from "@/components/BreadCrumb.vue";

export default {
  name: "User",
  components: {
    BreadCrumb,
  },
  mounted() {
    this.axios
      .get(this.usersAPI)
      .then((response) => (this.users = response.data));
  },
  data() {
    return {
      users: [],
      albumsAPI: "https://jsonplaceholder.typicode.com/albums/",
    };
  },
};
</script>
<style scoped></style>
