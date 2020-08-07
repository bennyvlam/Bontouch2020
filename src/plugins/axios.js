import Vue from "vue";
import Axios from "axios";

Vue.use({
  install() {
    Vue.prototype.axios = Axios.create({
      // Make axios available to components with 'this.axios'
      baseURL: process.env.VUE_APP_API_URL
    });
  }
});
