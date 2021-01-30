<template>
  <div class="callback">
    <h1>this is an a callback page</h1>
    <p>AUTHORISATION CODE = {{ requestToken }}</p>
    <p>ACCESS TOKEN = {{ accessToken }}</p>
    <p>ENVIRONMENT = {{ environment }}</p>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import CodeCoverage from "../views/CodeCoverage.vue";

Vue.use(VueAxios, axios);
export default {
  name: "App",
  response: false,

  data: () => ({
    items: ["Production", "Sandbox"],
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
      url: `https://cors-anywhere.herokuapp.com/https://login.salesforce.com/services/oauth2/token?grant_type=authorization_code&code=${requestToken}&client_id=${clientID}&client_secret=${clientSecret}&redirect_uri=http://localhost:3000/callback`,
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
      this.$router.push("codecoverage");
    });
  },
};
</script>
