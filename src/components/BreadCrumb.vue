<template>
  <div>
    <v-breadcrumbs :items="items"></v-breadcrumbs>

    <v-breadcrumbs :items="items" large></v-breadcrumbs>
    <v-container>
      <v-breadcrumbs :items="items"></v-breadcrumbs>
    </v-container>
  </div>
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
        href: "breadcrumbs_dashboard"
      },
      {
        text: this.user,
        disabled: false,
        href: "breadcrumbs_link_1"
      },
      {
        text: this.albumName,
        disabled: true,
        href: "breadcrumbs_link_2"
      },
    ],
  }),
};
</script>
