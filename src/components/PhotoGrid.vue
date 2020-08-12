<template>
  <div id="PhotoGrid">
    <!-- Users -->
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row class="mb-10" justify="space-around">
            {{ items.length }} photos
          </v-row>
          <v-row :justify="justify">
            <!-- <router-link :to="{ name: 'Album' }"> -->
            <!-- <v-card
              v-for="(photo, index) in items"
              :key="index"
              class="ma-2 pa-3"
              outlined
              tile
              min-width="200px"
              max-width="200px"
              min-height="200px"
              max-height="200px"
              @click="goTo"
            > -->
            <!-- :to="'/album/' + user.name.split(' ').join('')" -->
            <v-img
              v-for="(photo, index) in items"
              :key="index"
              class="ma-2 pa-3"
              max-height="200px"
              :src="photo.thumbnailUrl"
              contain
              
            >
            </v-img>
            <!-- </v-card> -->
            <!-- </router-link> -->
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "PhotoGrid",
  props: ["title", "items"],
  mounted() {
    if (this.items.length % 4 != 0) {
      this.justify = "start";
    }
  },
  data() {
    return {
      active: false,
      justify: "space-between",
      items2: [
        {
          albumId: 1,
          id: 1,
          title: "accusamus beatae ad facilis cum similique qui sunt",
          url: "https://via.placeholder.com/600/92c952",
          thumbnailUrl: "https://via.placeholder.com/150/92c952",
        },
        {
          albumId: 1,
          id: 2,
          title: "reprehenderit est deserunt velit ipsam",
          url: "https://via.placeholder.com/600/771796",
          thumbnailUrl: "https://via.placeholder.com/150/771796",
        },
        {
          albumId: 1,
          id: 3,
          title: "officia porro iure quia iusto qui ipsa ut modi",
          url: "https://via.placeholder.com/600/24f355",
          thumbnailUrl: "https://via.placeholder.com/150/24f355",
        },
        {
          albumId: 1,
          id: 4,
          title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
          url: "https://via.placeholder.com/600/d32776",
          thumbnailUrl: "https://via.placeholder.com/150/d32776",
        },
        {
          albumId: 1,
          id: 5,
          title: "natus nisi omnis corporis facere molestiae rerum in",
          url: "https://via.placeholder.com/600/f66b97",
          thumbnailUrl: "https://via.placeholder.com/150/f66b97",
        },
        {
          albumId: 1,
          id: 6,
          title: "accusamus ea aliquid et amet sequi nemo",
          url: "https://via.placeholder.com/600/56a8c2",
          thumbnailUrl: "https://via.placeholder.com/150/56a8c2",
        },
        {
          albumId: 1,
          id: 7,
          title:
            "officia delectus consequatur vero aut veniam explicabo molestias",
          url: "https://via.placeholder.com/600/b0f7cc",
          thumbnailUrl: "https://via.placeholder.com/150/b0f7cc",
        },
        {
          albumId: 1,
          id: 8,
          title: "aut porro officiis laborum odit ea laudantium corporis",
          url: "https://via.placeholder.com/600/54176f",
          thumbnailUrl: "https://via.placeholder.com/150/54176f",
        },
        {
          albumId: 1,
          id: 9,
          title: "qui eius qui autem sed",
          url: "https://via.placeholder.com/600/51aa97",
          thumbnailUrl: "https://via.placeholder.com/150/51aa97",
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
.photo {
  width: 60px;
  height: 60px;
}
</style>
