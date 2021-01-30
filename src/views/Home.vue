<template>
  <v-app>
    <v-container>
      <v-row align="center" class="d-flex justify-center">
        <div class="col-md-6">
          <h1 style="text-align:center">Salesforce Tool</h1>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </v-row>
      <br />
      <v-form align="center" @submit.prevent="handleClick">
        <v-row align="center" class="d-flex justify-center">
          <v-col cols="4">
            <label><strong> Choose Environment : </strong></label>
            <v-select
              :items="items"
              label="Choose Environment"
              v-model="environment"
              required
            >
            </v-select>
            <v-btn type="submit" color="primary">
              Log In
            </v-btn>
            <p v-if="error">{{ error_message }}</p>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-app>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
  name: "Home",
  response: false,

  data: () => ({
    items: ["Production", "Sandbox"],
    environment: "",
    error: false,
    error_message: "",
  }),
  computed: {
    returnEnv() {
      return $store.state.environment;
    },
  },
  methods: {
    handleClick() {
      if (this.environment == "") {
        this.error = true;
        this.error_message = "Please select an environment";
      } else {
        console.log("Form Submitted");
        if (this.environment == "Production") {
          this.$store.commit("setEnvironment", "login");
          console.log(this.$store.state.environment);

          window.location =
            "https://login.salesforce.com/services/oauth2/authorize?client_id=3MVG9n_HvETGhr3Ao6N8bdy6kmq_n37n2cTUbKSuUVPJSELHZGmjJB1d0BGeCbYm02pvcnx_Pa8XswuPvZ.3i&redirect_uri=http://localhost:3000/callback&response_type=code";
        } else if (this.environment == "Sandbox") {
          this.$store.commit("setEnvironment", "test");
          console.log(this.$store.state.environment);

          window.location =
            "https://test.salesforce.com/services/oauth2/authorize?client_id=3MVG9n_HvETGhr3Ao6N8bdy6kmq_n37n2cTUbKSuUVPJSELHZGmjJB1d0BGeCbYm02pvcnx_Pa8XswuPvZ.3i&redirect_uri=http://localhost:3000/callback&response_type=code";
        }
      }
    },
  },
};
</script>

<style></style>
