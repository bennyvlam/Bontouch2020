<template>
  <v-container>
    <v-breadcrumbs
      class="ml-0 pl-3 py-2 grey lighten-5"
      :items="items"
    ></v-breadcrumbs>
    <span>{{ currentRoute }}</span>
  </v-container>
</template>

<script>
export default {
  name: "BreadCrumb",
  props: ["currentRoute"],
  computed: {
    bread() {
      if (this.currentRoute == "home") {
        return "users";
      } else {
        return "nej";
      }
    },
  },
  data: () => ({
    user: "Pelle Svanslös",
    albumName: "Orange birds",
    items: [
      {
        text: "Users",
        disabled: true,
        href: "/",
      },
      {
        text: "this.user",
        disabled: false,
        href: "/user/",
      },
      {
        text: "this.albumName",
        disabled: false,
        href: "/album/",
      },
    ],
  }),
};
</script>
