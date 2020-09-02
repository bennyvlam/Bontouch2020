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
              :id="'photo_' + index"
              v-for="(photo, index) in items"
              :key="index"
              outlined
              tile
              class="ma-2 pa-3"
              min-width="200px"
              max-width="200px"
              min-height="200px"
              max-height="200px"
              @click="openPhoto(index), animatePhoto()"
              :img="photo.thumbnailUrl"
            >
            </v-card>
          </v-row>
          <!-- Photo-viewer -->
          <v-row>
            <transition>
              <div v-if="isViewing" id="photoPreview" class="show">
                <v-icon class="close" @click.prevent="closePhoto(photoIndex)"
                  >cross</v-icon
                >
                <div class="photoPreviewContent">
                  <img :src="displayedPhoto" style="width:100%" class="mb-5" />
                  <!-- Next/previous buttons -->
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
            </transition>
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
    photoIndex() {
      return this.$store.getters.getPhotoIndex;
    },
  },
  watch: {
    items: function(items) {
      if (items.length % 4 != 0) {
        this.justify = "start";
      }
    },
  },
  data() {
    return {
      componentKey: 0,
      photo: "",
      active: false,
      justify: "space-around",
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
    // Open the photoPreview
    openPhoto(index) {
      this.$store.dispatch("setView", { isViewing: true });
      if (index < 0) index = 0;
      if (index > this.items.length - 1) index = this.items.length - 1;
      // this.photoIndex = index;
      this.$store.dispatch("setDisplayedPhoto", {
        photos: this.items,
        photoIndex: index,
      });
      this.$store.dispatch("setPersistedData").then(() => {});
    },
    // Close the photoPreview
    closePhoto(index) {
      this.$store.dispatch("setView", { isViewing: false });
      this.$store.dispatch("setPersistedData");

      var element = document.getElementById("photo_" + index);
      var elemRect = element.getBoundingClientRect();
      var photoPreview = document.getElementById("photoPreview");
      photoPreview.className = "off";
      photoPreview.style.left = elemRect.x + "px";
      photoPreview.style.top = elemRect.y + "px";
      photoPreview.style.width = "200px";
      photoPreview.style.height = "200px";
      photoPreview.style.paddingTop = "0px";
    },
    animatePhoto() {
      var photoPreview = document.getElementById("photoPreview");
      photoPreview.className = "show";
      photoPreview.style.width = "100%";
      photoPreview.style.height = "100%";
      photoPreview.style.left = "0";
      photoPreview.style.top = "0";
      photoPreview.style.paddingTop = "70px";
    },
    openStorage() {
      return JSON.parse(localStorage.getItem("persistedData"));
    },
  },
  mounted() {
    this.animatePhoto();
    if (this.items.length % 4 != 0) {
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
.v-card:hover {
  border-style: solid;
  border-width: 10px;
  border-color: white;
}

#photoPreview {
  transition: all 1.5s;
  opacity: 1;
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  width: 200px;
  height: 200px;
}

#photoPreview.off {
  transition: all 1.5s;
  opacity: 1;
  z-index: 1;
  overflow: hidden;
  position: fixed;
}

#photoPreview.show {
  transition: all 1.5s;
  position: fixed;
  padding-top: 5%;
  overflow: auto;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
}

.photoPreviewContent {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
  min-width: 35%;
  max-width: 35%;
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
