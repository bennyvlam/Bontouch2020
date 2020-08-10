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
        href: "/User/",
      },
      {
        text: "this.albumName",
        disabled: false,
        href: "/Album/",
      },
    ],
  }),
};
</script>
