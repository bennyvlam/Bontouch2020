import Vue from "vue";
import Vuex, { Store } from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    albums: [],
    albumTitle: "",
    breadCrumbs: [],
    favorites: [],
    persistedData: {},
    users: [],
    userInfo: null,
    userName: "",
  },
  mutations: {
    FETCH_USERS(state, payload) {
      state.users = payload.users;
    },
    SET_PERSISTED_DATA(state) {
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
    SET_STATE_DATA(state, payload) {
      state.users = payload.data.users;
      state.favorites = payload.data.favorites;
      state.userInfo = payload.data.userInfo;
      state.userName = payload.data.userInfo.name.split(/[\s,\.]+/).join("");
      state.albums = payload.data.albums;
      state.albumTitle = payload.data.albumTitle;
    },
    SET_USERS_AND_FAVORITES(state, payload) {
      if (state.users.some((user) => user.id === payload.userId)) {
        state.favorites.push(state.users[payload.userIndex]);
        state.users.splice(payload.userIndex, 1);
      } else if (state.favorites.some((user) => user.id === payload.userId)) {
        state.users.push(state.favorites[payload.userIndex]);
        state.favorites.splice(payload.userIndex, 1);
      }
    },
    SET_USER_INFO(state, payload) {
      state.userInfo = payload.user;
    },
    SORT_ARRAY(state, sortKey) {
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
  },
  actions: {
    setBreadCrumbs: ({ commit }, payload) => {
      commit("SET_BREAD_CRUMBS", payload);
    },
    setCurrentUser: ({ commit }, payload) => {
      commit("SET_USER_INFO", payload);
    },
    setPersistedData: ({ commit }) => {
      commit("SET_PERSISTED_DATA");
    },
    setStateData: ({ commit }, payload) => {
      commit("SET_STATE_DATA", payload);
    },
    setUsersAndFavorites: ({ commit }, payload) => {
      commit("SET_USERS_AND_FAVORITES", payload);
      commit("SORT_ARRAY", "name");
    },
  },
  getters: {
    getAlbums: (state) => {
      return state.albums;
    },
    getAlbumTitle: (state) => {
      return state.albumTitle;
    },
    getBreadCrumbs: (state) => {
      return state.breadCrumbs;
    },
    getData: (state) => {
      var data = {
        users: state.users,
        favorites: state.favorites,
      };
      return data;
    },
    getFavorites: (state) => {
      return state.favorites;
    },
    getUser: (state) => {
      return state.userInfo;
    },
    getUsers: (state) => {
      return state.users;
    },
    getUserName: (state) => {
      return state.userName;
    },
  },
});
