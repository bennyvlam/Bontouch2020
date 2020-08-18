import Vue from "vue";
import Vuex, { Store } from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    breadcrumbs: [],
    users: [],
    favorites: [],
    albums: [],
    albumTitle: "",
    persistedData: {},
    userInfo: null,
    userName: "",
    initialized: false,
  },
  mutations: {
    saveUsers(state, payload) {
      if (!state.initialized) state.users = payload.users;
    },
    update(state, payload) {
      state.users = payload.data.users;
      state.favorites = payload.data.favorites;
      state.userInfo = payload.data.userInfo;
      state.userName = payload.data.userInfo.name.split(/[\s,\.]+/).join("");
      state.albums = payload.data.albums;
      state.albumTitle = payload.data.albumTitle;
    },
    saveData(state) {
      state.persistedData["users"] = state.users;
      state.persistedData["favorites"] = state.favorites;
      state.persistedData["userInfo"] = state.userInfo;
      state.persistedData["userName"] = state.userName;
      state.persistedData["albums"] = state.albums;
      state.persistedData["albumTitle"] = state.albumTitle;

      let storedData = JSON.parse(localStorage.getItem("persistedData"));
      if (!storedData) storedData = {};

      storedData["users"] = state.users;
      storedData["favorites"] = state.favorites;
      storedData["userInfo"] = state.userInfo;
      storedData["userName"] = state.userName;
      storedData["albums"] = state.albums;
      storedData["albumTitle"] = state.albumTitle;
      localStorage.setItem("persistedData", JSON.stringify(storedData));
    },
    updateUserInfo(state, payload) {
      state.userInfo = payload.user;
    },
    saveAlbums(state, payload) {
      state.albums = payload.albums;
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
    storeData: ({ commit }) => {
      commit("saveData");
    },
    updateData: ({ commit }, payload) => {
      commit("update", payload);
    },
    storeAlbums: ({ commit }, payload) => {
      commit("saveAlbums", payload);
    },
  },
  getters: {
    getUsers: (state) => {
      return state.users;
    },
    getFavorites: (state) => {
      return state.favorites;
    },
    getData: (state) => {
      var data = {
        users: state.users,
        favorites: state.favorites,
      };
      return data;
    },
    getUser: (state) => {
      return state.userInfo;
    },
    getUserName: (state) => {
      return state.userName;
    },
    getAlbums: (state) => {
      return state.albums;
    },
    getAlbumTitle: (state) => {
      return state.albumTitle;
    },
  },
});
