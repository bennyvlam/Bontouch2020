<template>
  <div id="UserGrid">
    <!-- Users -->
    <div class="title">
      <h2>{{ title }}</h2>
    </div>

    <v-col cols="12">
      <v-row :align="alignment" :justify="justify" class="grey lighten-5">
        <v-card
          v-for="(user, index) in items"
          :key="index"
          class="ma-2 pa-6"
          outlined
          tile
        >
          <v-card-title class="mb-0 px-0">{{ user.name }}</v-card-title>
          <v-card-subtitle class="mb-0 px-0">{{
            user.company.name
          }}</v-card-subtitle>
          <v-card-text class="mb-0 px-0">{{ user.email }}</v-card-text>
          <v-card-actions>
            <v-btn icon v-slot:default="{ active }">
              <v-icon v-if="!active" color="grey lighten-1">
                star_border
              </v-icon>
              <v-icon v-else color="yellow">
                star
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "UserGrid",
  props: ["title", "items"],
};
</script>
<style scoped>
h2 {
  font-weight: 300;
}
.title {
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;
}
.v-card {
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>
