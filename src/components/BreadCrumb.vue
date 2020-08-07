<template>
  <v-breadcrumbs
    class="ml-0 pl-3 py-2 grey lighten-5"
    :items="items"
  ></v-breadcrumbs>
</template>

<script>
export default {
  name: "BreadCrumb",

  data: () => ({
    user: "Pelle Svanslös",
    albumName: "Orange birds",
    items: [
      {
        text: "Users",
        disabled: false,
        href: "/",
      },
      {
        text: "this.user",
        disabled: false,
        href: "/User/",
      },
      {
        text: "this.albumName",
        disabled: true,
        href: "/Album/",
      },
    ],
  }),
};
</script>
