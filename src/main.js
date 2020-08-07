import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/axios";
import mdi from "../node_modules/material-design-icons-iconfont/dist/material-design-icons.css";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  mdi,
  render: h => h(App)
}).$mount("#app");
