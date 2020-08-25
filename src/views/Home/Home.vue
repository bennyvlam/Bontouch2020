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
          <UserGrid title="Favorites" :items="list.favorites"></UserGrid>
          <!-- Users -->
          <UserGrid title="Users" :items="list.users"></UserGrid>
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
  computed: {
    list() {
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
    this.axios.get(`${this.apiPath}/users`).then((response) => {
      if (
        this.$store.state.users === undefined ||
        this.$store.state.users.length == 0
      ) {
        this.$store.commit("SET_USERS", {
          users: response.data,
        });
        this.$store.commit("SORT_ARRAY", "name");
      }
      this.$store.dispatch("setPersistedData");
    });
  },
};
</script>
<style scoped></style>
