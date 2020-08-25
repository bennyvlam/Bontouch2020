<template>
  <div id="UserGrid">
    <!-- Users -->
    <div class="title">
      <h2>{{ title }}</h2>
    </div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row :justify="justify">
            <v-card
              v-for="(user, index) in items"
              :key="index"
              class="ma-2 pa-3"
              outlined
              tile
              min-width="260px"
              color="blue lighten-4"
              @click.native="goTo(user, index)"
              :to="{
                name: 'user',
                params: {
                  userId: `${user.name
                    .toString()
                    .split(/[\s,.]+/)
                    .join('')}`,
                },
              }"
            >
              <v-row class="ma-0 pa-0">
                <v-col class="ma-0 pa-0 mr-auto" cols="auto">
                  <v-card-title
                    class="mb-0 pa-0 blue-grey--text text--darken-2"
                    >{{ user.name }}</v-card-title
                  >
                </v-col>
                <v-col class="ma-0 pa-0" cols="auto">
                  <v-card-actions>
                    <v-icon
                      small
                      @click.prevent="favorite(index, user.id)"
                      v-if="title != 'Favorites'"
                      color="blue-grey darken-2"
                    >
                      star_border
                    </v-icon>
                    <v-icon
                      small
                      @click.prevent="favorite(index, user.id)"
                      v-else
                      color="blue-grey darken-2"
                    >
                      star
                    </v-icon>
                  </v-card-actions>
                </v-col>
              </v-row>
              <v-card-subtitle
                class="mb-0 pa-0 blue-grey--text text--darken-2"
                >{{ user.company.name }}</v-card-subtitle
              >
              <v-card-text class="mb-0 pa-0 blue-grey--text text--darken-2">{{
                user.email
              }}</v-card-text>
            </v-card>
            <!-- </router-link> -->
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "UserGrid",
  props: ["title", "items", "index"],
  computed: {
    userName() {
      return this.$store.getters.getUserName;
    },
  },
  watch: {
    items: function(items) {
      if (items.length % 3 != 0) {
        this.justify = "start";
      }
    },
  },
  data() {
    return {
      active: false,
      justify: "space-around",
    };
  },
  methods: {
    goTo(user, index) {
      this.$store.dispatch("setCurrentUser", { user: user, index: index });
      this.$store.dispatch("setPersistedData");
    },
    favorite(index, id) {
      this.$store.dispatch("setUsersAndFavorites", {
        userIndex: index,
        userId: id,
      });
      this.$store.dispatch("setPersistedData");
    },
  },
};
</script>
<style scoped>
h2 {
  font-weight: 300;
}
.title {
  border-bottom: 1px solid lightgray;
}
.v-card {
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>
