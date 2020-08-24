<template>
  <div id="PhotoGrid">
    <!-- Users -->
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row justify="space-around" class="mb-10">
            <p class="font-italic">{{ items.length }} photos</p>
          </v-row>
          <v-row :justify="justify">
            <v-card
              v-for="(photo, index) in items"
              :key="index"
              outlined
              tile
              class="ma-2 pa-3"
              min-width="200px"
              max-width="200px"
              min-height="200px"
              max-height="200px"
              @click="openPhoto(index)"
              :img="photo.thumbnailUrl"
            >
            </v-card>
          </v-row>
          <v-row>
            <div v-if="isViewing" class="photoPreview">
              <v-icon class="close" @click.prevent="closePhoto()">cross</v-icon>
              <div class="photoPreview-content">
                <img
                  :src="displayedPhoto"
                  style="width:100%"
                  class="mb-5"
                />
                <!-- Next/previous controls -->
                <v-icon
                  large
                  class="prev"
                  @click.prevent="openPhoto(photoIndex - 1)"
                  >keyboard_arrow_left</v-icon
                >
                <v-icon
                  large
                  class="next"
                  @click.prevent="openPhoto(photoIndex + 1)"
                  >keyboard_arrow_right</v-icon
                >
                <!-- Caption text -->
                <p class="white--text text-center">
                  {{ photos[photoIndex].title }}
                </p>
              </div>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "PhotoGrid",
  props: ["title", "items", "isViewing"],
  computed: {
    photos() {
      return this.$store.getters.getPhotos;
    },
    displayedPhoto() {
      return this.photos[this.photoIndex].url;
    },
  },
  created() {
    const storedData = this.openStorage();
    if (storedData) {
      this.persistedData = {
        ...this.persistedData,
        ...storedData,
      };
      // this.$store.dispatch("setStateData", { data: this.persistedData });
      // this.$store.dispatch("setPersistedData");
      this.photoIndex = this.persistedData.photoIndex;
    }
  },
  mounted() {
    if (this.items.length % 4 != 0) {
      this.justify = "start";
    }
  },
  data() {
    return {
      photo: "",
      photoIndex: 0,
      active: false,
      justify: "space-between",
      slideIndex: 0,
      persistedData: {
        albums: [],
        albumTitle: "",
        favorites: [],
        photos: [],
        users: [],
        userInfo: null,
        userName: "",
        isViewing: false,
        photoIndex: 0,
      },
    };
  },
  methods: {
    // Open the photoPreview
    openPhoto(index) {
      this.$store.dispatch("setView", { isViewing: true });
      if (index < 0) index = 0;
      if (index > this.items.length - 1) index = this.items.length - 1;
      this.photoIndex = index;
      this.$store.dispatch("setDisplayedPhoto", {
        photos: this.items,
        photoIndex: index,
      });
      this.$store.dispatch("setPersistedData");
    },
    // Close the photoPreview
    closePhoto() {
      this.$store.dispatch("setView", { isViewing: false });
      this.$store.dispatch("setPersistedData");
    },
    openStorage() {
      return JSON.parse(localStorage.getItem("persistedData"));
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
.photo {
  width: 60px;
  height: 60px;
}

.photoPreview {
  position: fixed;
  padding-top: 70px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.75);
}

.photoPreview-content {
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 500px;
}

.close {
  color: white;
  position: absolute;
  top: 2%;
  right: 5%;
}

.close:hover,
.close:focus {
  color: #999;
  cursor: pointer;
}

.prev,
.next {
  cursor: pointer;
  position: fixed;
  color: white;
  font-weight: bold;
  transition: 0.6s ease;
  top: 40%;
}

.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

.prev {
  left: 0;
  border-radius: 3px 0 0 3px;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
