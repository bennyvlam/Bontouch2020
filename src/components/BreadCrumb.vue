<template>
  <v-container>
    <v-breadcrumbs
      class="ml-0 pl-3 py-2 grey lighten-5"
      :items="items"
    ></v-breadcrumbs>
  </v-container>
</template>

<script>
export default {
  name: "BreadCrumb",
  props: ["currentRoute"],
  mounted() {
    var i;
    if (this.currentRoute == "home") {
      for (i = 0; i < this.items.length; i++) {
        this.items[i].disabled = false;
      }
      this.items[0].disabled = true;
    } else if (this.currentRoute == "user") {
      for (i = 0; i < this.items.length; i++) {
        this.items[i].disabled = false;
      }
      this.items[1].disabled = true;
    } else if (this.currentRoute == "album") {
      for (i = 0; i < this.items.length; i++) {
        this.items[i].disabled = false;
      }
      this.items[2].disabled = true;
    }
  },
  data: () => ({
    items: [
      {
        text: "Users",
        exact: true,
        disabled: false,
        to: "/users",
      },
      {
        text: "a",
        exact: true,
        disabled: false,
        to: "/users/Benny",
      },
      {
        text: "this.albumName",
        exact: true,
        disabled: false,
        to: "/users/USERNAME/albums/0",
      },
    ],
  }),
};
</script>
