<template>
  <div class="callback">
    <!-- <h1>Loading CodeCoverage ...</h1> -->
    <!-- <p>AUTHORISATION CODE = {{ requestToken }}</p>
    <p>ACCESS TOKEN = {{ accessToken }}</p>
    <p>ENVIRONMENT = {{ environment }}</p> -->
    <v-container style="height: 400px;">
      <v-row class="fill-height" align-content="center" justify="center">
        <v-col class="subtitle-1 text-center" cols="12">
          Loading CodeCoverage ...
        </v-col>
        <v-col cols="12">
          <v-progress-linear
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="12"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

// In this component - callback // 1 - we are redirected to
localhost:3000/callback after authentication with authentication code in url
parameter // 2 - receving auth code from param and saving in state // 3 -
sending post request to get access token saving it in state // 4 - we are
redirected to codecoverage page
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import CodeCoverage from "../views/CodeCoverage.vue";

Vue.use(VueAxios, axios);
export default {
  name: "App",

  data: () => ({
    requestToken: "",
    accessToken: "",
    environment: "",
  }),
  components: {
    CodeCoverage,
  },
  mounted: function() {
    const clientID = this.$store.state.clientID;
    const clientSecret = this.$store.state.clientSecret;
    const requestToken = this.$route.query.code;

    console.log("environment = ", this.$store.state.environment);
    console.log("clientID = ", this.$store.state.clientID);
    console.log("clientSecret = ", this.$store.state.clientSecret);

    this.environment = this.$store.state.environment;
    this.requestToken = requestToken;
    this.$store.commit("setAuthCode", requestToken);
    axios({
      // make a POST request
      method: "post",
      mode: "cors",
      url: `https://cors-anywhere.herokuapp.com/https://ap5.salesforce.com/services/oauth2/token?grant_type=authorization_code&code=${requestToken}&client_id=${clientID}&client_secret=${clientSecret}&redirect_uri=http://localhost:3000/callback`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
      },
      crossdomain: true,
    }).then((response) => {
      console.log(response);
      const accessToken = response.data.access_token;
      console.log("AUTHORISATION CODE = ", requestToken);
      console.log(" ");
      console.log("ACCESS TOKEN = ", accessToken);
      this.accessToken = accessToken;
      this.$store.commit("setAccessToken", accessToken);
      console.log(this.$store.state.environment);
      this.$router.push("codecoverage"); //after getting access token redirecting to code-coverage
    });
  },
};
</script>
