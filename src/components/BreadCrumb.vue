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
  props: ["currentRoute", "userName", "albumName"],
  watch: {
    userName: {
      handler: function() {
        this.setBreadCrumbs();
      },
      immediate: true,
    },
    albumName: {
      handler: function() {
        this.setBreadCrumbs();
      },
      immediate: true,
    },
    currentRoute: function() {
      this.setBreadCrumbs();
    },
  },
  mounted() {
    this.setBreadCrumbs();
  },
  data: () => ({
    items: [],
  }),
  methods: {
    setBreadCrumbs() {
      if (this.currentRoute == "home") {
        this.items = [
          {
            text: "Users",
            exact: true,
            disabled: false,
            to: "/users",
          },
        ];
      } else if (this.currentRoute == "user") {
        this.items = [
          {
            text: "Users",
            exact: true,
            disabled: false,
            to: "/users",
          },
          {
            text: this.userName.toString(),
            exact: true,
            disabled: true,
            to:
              "/users/" +
              this.userName
                .toString()
                .split(/[\s,.]+/)
                .join(""),
          },
        ];
      } else if (this.currentRoute == "album") {
        this.items = [
          {
            text: "Users",
            exact: true,
            disabled: false,
            to: "/users",
          },
          {
            text: this.userName.toString(),
            exact: true,
            disabled: false,
            to:
              "/users/" +
              this.userName
                .toString()
                .split(/[\s,.]+/)
                .join(""),
          },
          {
            text: this.albumName.toString(),
            exact: true,
            disabled: true,
            to:
              "/users/" +
              this.albumName
                .toString()
                .split(/[\s,.]+/)
                .join("") +
              "/",
          },
        ];
      }
    },
  },
};
</script>
