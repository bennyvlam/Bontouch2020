<template>
  <div id="AlbumGrid">
    <!-- Users -->
    <div class="title">
      <h2>{{ title }}</h2>
    </div>
    <v-row>
      <v-col cols="12">
        <v-row :justify="justify">
          <!-- <router-link :to="{ name: 'Album' }"> -->
          <v-card
            v-for="(album, index) in items"
            :key="index"
            class="ma-2 pa-3"
            outlined
            tile
            min-width="260px"
            max-width="260px"
            color="blue lighten-4"
            :to="{
              name: 'album',
              params: { userId: userName, albumId: album.id },
            }"
          >
            <v-card-text class="mb-0 pa-0 blue-grey--text text--darken-2">{{
              album.title
            }}</v-card-text>
          </v-card>
          <!-- </router-link> -->
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "AlbumGrid",
  props: ["title", "items"],
  // watch: {
  //   userName: {
  //     handler: function() {
  //       if (this.userName != this.$route.params.userId.toString()) {
  //         alert(this.userName);
  //         this.userName = this.$route.params.userId.toString();
  //       }
  //     },
  //     immediate: true
  //   }
  // },
  computed: {
    userName() {
      if (this.$route.params.userId === undefined) return "userId";
      return this.$route.params.userId.toString();
    },
  },
  mounted() {
    if (this.items.length % 3 != 0) {
      this.justify = "space-between";
    }
  },
  data() {
    return {
      active: false,
      justify: "space-between",
      items2: [
        {
          userId: 1,
          id: 1,
          title: "quidem molestiae enim",
        },
        {
          userId: 1,
          id: 2,
          title: "sunt qui excepturi placeat culpa",
        },
        {
          userId: 1,
          id: 3,
          title: "omnis laborum odio",
        },
        {
          userId: 1,
          id: 4,
          title: "non esse culpa molestiae omnis sed optio",
        },
      ],
    };
  },
  methods: {},
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
