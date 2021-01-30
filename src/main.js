import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import "@/assets/styles.css"; //for global css
import store from "./store/store"; //using vuex for data

new Vue({
  vuetify,
  store: store,
  render: (h) => h(App),
  router,
}).$mount("#app");
