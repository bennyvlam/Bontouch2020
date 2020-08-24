<template>
  <div id="AlbumGrid">
    <!-- Users -->
    <div class="title">
      <h2>{{ title }}</h2>
    </div>
    <v-row>
      <v-col cols="12">
        <v-row :justify="justify">
          <v-card
            v-for="(album, index) in items"
            :key="index"
            class="ma-2 pa-3"
            outlined
            tile
            min-width="260px"
            max-width="260px"
            color="blue lighten-4"
            @click="setView"
            :to="{
              name: 'album',
              params: { userId: userName, albumId: album.id },
            }"
          >
            <v-card-text class="mb-0 pa-0 blue-grey--text text--darken-2">{{
              album.title
            }}</v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "AlbumGrid",
  props: ["title", "items"],
  computed: {
    userName() {
      if (this.$route.params.userId === undefined) return "userId";
      return this.$route.params.userId.toString();
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
    setView() {
      this.$store.dispatch("setView", { isViewing: false });
      this.$store.dispatch("setPersistedData");
    },
  },
  mounted() {
    if (this.items.length % 3 != 0) {
      this.justify = "start";
    }
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
