<template>
  <div id="PhotoGrid">
    <!-- Users -->
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row justify="space-around" class="mb-10">
            <p class="font-italic">{{ items.length }} photos</p>
          </v-row>
          <h1>{{ gubbePos.x }}</h1>
          <h1>{{ gubbePos.y }}</h1>
          <v-row :justify="justify">
            <transition name="expand">
              <div id="gubbe" :style="style"></div>
            </transition>
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
              @click="openPhoto(index), animatePhoto(index)"
              :img="photo.thumbnailUrl"
            >
            </v-card>
          </v-row>
          <v-row>
            <transition :id="'anime_' + photoIndex" name="bounce">
              <div v-if="isViewing" id="photo" class="photoPreview">
                <v-icon class="close" @click.prevent="closePhoto(photoIndex)"
                  >cross</v-icon
                >
                <div class="photoPreviewContent">
                  <img :src="displayedPhoto" style="width:100%" class="mb-5" />
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
      gubbePos: {
        x: 0,
        y: 0,
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

      var bodyRect = document.body.getBoundingClientRect();
      var element = document.getElementById("photo_" + index);
      var elemRect = element.getBoundingClientRect();
      var offset_top = elemRect.top - bodyRect.top;
      var offset_right = elemRect.right - bodyRect.right;
      var offset_left = elemRect.left - bodyRect.left;
      var offset_bottom = elemRect.bottom - bodyRect.bottom;
      alert(
        index +
          "\nelem(x,y): (" +
          elemRect.x +
          ", " +
          elemRect.y +
          ")" +
          "\noffset_top: " +
          offset_top +
          "\noffset_right: " +
          offset_right +
          "\noffset_left: " +
          offset_left +
          "\noffset_bottom: " +
          offset_bottom
      );
      var gubbe = document.getElementById("gubbe");
      gubbe.style.left = elemRect.x + "px";
      gubbe.style.top = elemRect.y + "px";
      this.gubbePos.x = gubbe.style.left;
      this.gubbePos.y = gubbe.style.top;
    },
    animatePhoto(index) {
      var bodyRect = document.body.getBoundingClientRect();
      var element = document.getElementById("photo_" + index);
      var elemRect = element.getBoundingClientRect();
      var offset_top = elemRect.top - bodyRect.top;
      var offset_right = elemRect.right - bodyRect.right;
      var offset_left = elemRect.left - bodyRect.left;
      var offset_bottom = elemRect.bottom - bodyRect.bottom;
      alert(
        index +
          "\nelem(x,y): (" +
          elemRect.x +
          ", " +
          elemRect.y +
          ")" +
          "\noffset_top: " +
          offset_top +
          "\noffset_right: " +
          offset_right +
          "\noffset_left: " +
          offset_left +
          "\noffset_bottom: " +
          offset_bottom
      );
      var gubbe = document.getElementById("gubbe");
      gubbe.style.left = elemRect.x + "px";
      gubbe.style.top = elemRect.y + "px";
      this.gubbePos.x = gubbe.style.left;
      this.gubbePos.y = gubbe.style.top;
    },
    openStorage() {
      return JSON.parse(localStorage.getItem("persistedData"));
    },
  },
  mounted() {
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

.photo-expand-enter-active {
  transition: all 0.3s ease;
}
.photo-expand-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.photo-expand-enter, .photo-expand-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.expand-enter-active {
  animation: bounce-in 0.5s;
}
.expand-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
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

.photoPreviewContent {
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

#gubbe {
  height: 200px;
  width: 200px;
  background-color: blueviolet;
  position: fixed;
  z-index: 1;
}
</style>
