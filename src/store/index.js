import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    albums: [],
    albumTitle: "",
    favorites: [],
    persistedData: {},
    photos: {},
    photoIndex: 0,
    users: [],
    userInfo: {},
    userName: "",
    isViewing: false,
  },
  mutations: {
    SET_USERS(state, payload) {
      state.users = payload.users;
    },
    SET_ALBUMS(state, payload) {
      state.albums = payload.albums;
    },
    SET_DISPLAYED_PHOTO(state, payload) {
      state.photos = payload.photos;
      state.photoIndex = payload.photoIndex;
    },
    SET_PERSISTED_DATA(state) {
      state.persistedData["albums"] = state.albums;
      state.persistedData["albumTitle"] = state.albumTitle;
      state.persistedData["favorites"] = state.favorites;
      state.persistedData["isViewing"] = state.isViewing;
      state.persistedData["photos"] = state.photos;
      state.persistedData["photoIndex"] = state.photoIndex;
      state.persistedData["users"] = state.users;
      state.persistedData["userInfo"] = state.userInfo;
      state.persistedData["userName"] = state.userName;

      let storedData = JSON.parse(localStorage.getItem("persistedData"));
      if (!storedData) storedData = {};

      storedData["albums"] = state.albums;
      storedData["albumTitle"] = state.albumTitle;
      storedData["favorites"] = state.favorites;
      storedData["isViewing"] = state.isViewing;
      storedData["photos"] = state.photos;
      storedData["photoIndex"] = state.photoIndex;
      storedData["users"] = state.users;
      storedData["userInfo"] = state.userInfo;
      storedData["userName"] = state.userName;
      localStorage.setItem("persistedData", JSON.stringify(storedData));
    },
    SET_STATE_DATA(state, payload) {
      state.albums = payload.data.albums;
      state.albumTitle = payload.data.albumTitle;
      state.favorites = payload.data.favorites;
      state.isViewing = payload.isViewing;
      state.photos = payload.data.photos;
      state.photoIndex = payload.data.photoIndex;
      state.users = payload.data.users;
      state.userInfo = payload.data.userInfo;
      state.userName = payload.data.userInfo.name.split(/[\s,.]+/).join("");
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
      state.userName = payload.user.name.split(/[\s,.]+/).join("");
    },
    SET_VIEW(state, payload) {
      state.isViewing = payload.isViewing;
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
    setCurrentUser: ({ commit }, payload) => {
      commit("SET_USER_INFO", payload);
    },
    setDisplayedPhoto: ({ commit }, payload) => {
      commit("SET_DISPLAYED_PHOTO", payload);
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
    setView: ({ commit }, payload) => {
      commit("SET_VIEW", payload);
    },
  },
  getters: {
    getAlbums: (state) => {
      return state.albums;
    },
    getAlbumTitle: (state) => {
      return state.albumTitle;
    },
    getData: (state) => {
      var data = {
        users: state.users,
        favorites: state.favorites,
        persistedData: state.persistedData,
        userInfo: state.userInfo,
        albums: state.albums,
      };
      return data;
    },
    getPhotos: (state) => {
      return state.photos;
    },
    getPhotoIndex: (state) => {
      return state.photoIndex;
    },
    getUser: (state) => {
      return state.userInfo;
    },
    getUserName: (state) => {
      return state.userName;
    },
    getViewState: (state) => {
      return state.isViewing;
    },
  },
});
