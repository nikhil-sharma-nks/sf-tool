<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import Vue from "vue";
import NavBar from "./components/NavBar";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
export default {
  name: "App",
  response: false,
  components: { NavBar },

  data: () => ({
    //
  }),
};
</script>

<style></style>
