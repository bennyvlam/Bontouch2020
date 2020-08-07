<template>
  <div class="home">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <!-- Breadcrumb -->
          <BreadCrumb></BreadCrumb>
          <!-- Favorites -->
          <div class="title">
            <h2>Favorites</h2>
          </div>
          <v-card>
            <v-list-item-group
              v-model="selected"
              multiple
              active-class="blue--text"
            >
              <template v-for="(item, index) in favorites">
                <v-list-item :key="item.name">
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                      <v-list-item-subtitle
                        class="text--primary"
                        v-text="item.company"
                      ></v-list-item-subtitle>
                      <v-list-item-subtitle
                        v-text="item.email"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-icon v-if="!active" color="grey lighten-1">
                        star_border
                      </v-icon>

                      <v-icon v-else color="yellow">
                        star
                      </v-icon>
                    </v-list-item-action>
                  </template>
                </v-list-item>
                <v-divider
                  v-if="index + 1 < items.length"
                  :key="index"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-card>
          <v-spacer></v-spacer>
          <!-- Users -->
          <div class="title">
            <h2>Users</h2>
          </div>

          <v-col cols="12">
            <v-row :align="alignment" :justify="justify" class="grey lighten-5">
              <v-card
                v-for="(user, index) in users"
                :key="index"
                class="ma-2 pa-6"
                outlined
                tile
              >
                <v-card-title class="mb-0 px-0">{{ user.name }}</v-card-title>
                <v-card-subtitle class="mb-0 px-0">{{
                  user.company.name
                }}</v-card-subtitle>
                <v-card-text class="mb-0 px-0">{{ user.email }}</v-card-text>
                <v-card-actions>
                  <v-btn icon v-slot:default="{ active }">
                    <v-icon v-if="!active" color="grey lighten-1">
                      star_border
                    </v-icon>
                    <v-icon v-else color="yellow">
                      star
                    </v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-col>
          <v-card>
            <v-list-item-group
              v-model="selected"
              multiple
              active-class="blue--text"
            >
              <template v-for="(item, index) in items">
                <v-list-item :key="item.name">
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                      <v-list-item-subtitle
                        class="text--primary"
                        v-text="item.company"
                      ></v-list-item-subtitle>
                      <v-list-item-subtitle
                        v-text="item.email"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-icon v-if="!active" color="grey lighten-1">
                        star_border
                      </v-icon>

                      <v-icon v-else color="yellow">
                        star
                      </v-icon>
                    </v-list-item-action>
                  </template>
                </v-list-item>
                <v-divider
                  v-if="index + 1 < items.length"
                  :key="index"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import BreadCrumb from "@/components/BreadCrumb.vue";

export default {
  name: "Home",
  components: {
    BreadCrumb,
  },
  mounted() {
    this.axios
      .get(this.usersAPI)
      .then(response => (this.users = response.data));
  },
  data() {
    return {
      users: [],
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
          company: "Bontouch AB",
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
        {
          name: "Claudia",
          company: "Bontouch AB",
          email: "Claudia@bontouch.com",
        },
      ],
    };
  },
};
</script>

<style scoped>
h2 {
  font-weight: 300;
}
.title {
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;
}
.v-card {
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>
