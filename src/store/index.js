import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    favorites: [],
    userInfo: null,
    count: 0,
  },
  mutations: {
    saveUsers(state, payload) {
      state.users = payload.users;
    },
    updateUsers(state, payload) {
      state.users.splice(payload.userInfo, 1);
    },
    updateFavorites(state, payload) {
      state.favorites.push(state.users[payload.userInfo]);
    },
  },
  actions: {
    updateUsersAndFavoritesList: ({ commit }, payload) => {
      commit("updateFavorites", payload);
      commit("updateUsers", payload);
    },
  },
  modules: {},
});
