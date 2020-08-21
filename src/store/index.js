import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    albums: [],
    albumTitle: "",
    breadCrumbs: [],
    favorites: [],
    persistedData: {},
    photos: {},
    users: [],
    userInfo: null,
    userName: "",
    isViewing: false,
  },
  mutations: {
    FETCH_USERS(state, payload) {
      state.users = payload.users;
    },
    SET_DISPLAYED_PHOTO(state, payload) {
      // state.photo = payload.photo;
      state.photos = payload.photos;
      state.photoIndex = payload.photoIndex;
    },
    SET_PERSISTED_DATA(state) {
      state.persistedData["users"] = state.users;
      state.persistedData["favorites"] = state.favorites;
      state.persistedData["userInfo"] = state.userInfo;
      state.persistedData["userName"] = state.userName;
      state.persistedData["albums"] = state.albums;
      state.persistedData["albumTitle"] = state.albumTitle;
      state.persistedData["isViewing"] = state.isViewing;
      state.persistedData["photos"] = state.photos;
      state.persistedData["photoIndex"] = state.photoIndex;

      let storedData = JSON.parse(localStorage.getItem("persistedData"));
      if (!storedData) storedData = {};

      storedData["users"] = state.users;
      storedData["favorites"] = state.favorites;
      storedData["userInfo"] = state.userInfo;
      storedData["userName"] = state.userName;
      storedData["albums"] = state.albums;
      storedData["albumTitle"] = state.albumTitle;
      storedData["isViewing"] = state.isViewing;
      storedData["photos"] = state.photos;
      storedData["photoIndex"] = state.photoIndex;
      localStorage.setItem("persistedData", JSON.stringify(storedData));
    },
    SET_STATE_DATA(state, payload) {
      state.users = payload.data.users;
      state.favorites = payload.data.favorites;
      state.userInfo = payload.data.userInfo;
      state.userName = payload.data.userInfo.name.split(/[\s,.]+/).join("");
      state.albums = payload.data.albums;
      state.albumTitle = payload.data.albumTitle;
      state.isViewing = payload.data.isViewing;
      state.photos = payload.data.photos;
      state.photoIndex = payload.data.photoIndex;
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
    setBreadCrumbs: ({ commit }, payload) => {
      commit("SET_BREAD_CRUMBS", payload);
    },
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
    getBreadCrumbs: (state) => {
      return state.breadCrumbs;
    },
    getData: (state) => {
      var data = {
        users: state.users,
        favorites: state.favorites,
        persistedData: state.persistedData
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
