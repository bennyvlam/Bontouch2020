import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    favorites: [],
    userInfo: null,
  },
  mutations: {
    saveUsers(state, payload) {
      state.users = payload.users;
    },
    updateUserInfo(state, payload) {
      state.userInfo = payload.user;
    },
    sortArray(state, sortKey) {
      const favorites = this.state.favorites;
      const users = this.state.users;
      favorites.sort((a, b) => {
        let compare = 0;
        if (a[sortKey] > b[sortKey]) {
          compare = 1;
        } else if (b[sortKey] > a[sortKey]) {
          compare = -1;
        }
        return compare;
      });
      users.sort((a, b) => {
        let compare = 0;
        if (a[sortKey] > b[sortKey]) {
          compare = 1;
        } else if (b[sortKey] > a[sortKey]) {
          compare = -1;
        }
        return compare;
      });
      state.favorites = favorites;
      state.users = users;
    },
    updateFavorites(state, payload) {
      if (state.users.some((user) => user.id === payload.userId)) {
        state.favorites.push(state.users[payload.userIndex]);
        state.users.splice(payload.userIndex, 1);
      } else if (state.favorites.some((user) => user.id === payload.userId)) {
        state.users.push(state.favorites[payload.userIndex]);
        state.favorites.splice(payload.userIndex, 1);
      }
    },
  },
  actions: {
    updateUsersAndFavoritesList: ({ commit }, payload) => {
      commit("updateFavorites", payload);
      commit("sortArray", "name");
    },
    updateCurrentUser: ({ commit }, payload) => {
      commit("updateUserInfo", payload);
    },
    getUsersFromBackend: ({ commit }, payload) => {
      commit("saveUsers", payload);
      commit("sortArray", "name");
    },
  },
  getters: {
    getUsers: (state) => {
      return state.users;
    },
    getFavorites: (state) => {
      return state.favorites;
    },
  },
});
