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
          <v-spacer></v-spacer>
          <!-- Users -->
          <div class="title">
            <h2>Users</h2>
          </div>
          <v-card>
            <v-list-item-group
              v-model="selected"
              multiple
              active-class="pink--text"
            >
              <template v-for="(item, index) in items">
                <v-list-item :key="item.title">
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.title"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        class="text--primary"
                        v-text="item.headline"
                      ></v-list-item-subtitle>
                      <v-list-item-subtitle
                        v-text="item.subtitle"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="item.action"
                      ></v-list-item-action-text>
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
  computed: {},
  data() {
    return {
      favorites: [
        {
          name: "benny",
          company: "Bontouch AB",
          email: "benny.lam@bontouch.com",
        },
      ],
      selected: [2],
      items: [
        {
          action: "15 min",
          headline: "Brunch this weekend?",
          title: "Ali Connors",
          subtitle:
            "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        {
          action: "2 hr",
          headline: "Summer BBQ",
          title: "me, Scrott, Jennifer",
          subtitle: "Wish I could come, but I'm out of town this weekend.",
        },
        {
          action: "6 hr",
          headline: "Oui oui",
          title: "Sandra Adams",
          subtitle: "Do you have Paris recommendations? Have you ever been?",
        },
        {
          action: "12 hr",
          headline: "Birthday gift",
          title: "Trevor Hansen",
          subtitle:
            "Have any ideas about what we should get Heidi for her birthday?",
        },
        {
          action: "18hr",
          headline: "Recipe to try",
          title: "Britta Holt",
          subtitle:
            "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
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
v-card {
  margin-top: 20px;
}
</style>
