import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Callback from "../views/Callback.vue";
import CodeCoverage from "../views/CodeCoverage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: (to) => {
      return "/home"; //redirecting root path to /home
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    props: true,
  },

  {
    path: "/callback",
    name: "Callback",
    component: Callback, //after auth user gets redirected to /callback (added in connected app of salesforce)
  },
  {
    path: "/codecoverage",
    name: "CodeCoverage",
    component: CodeCoverage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
