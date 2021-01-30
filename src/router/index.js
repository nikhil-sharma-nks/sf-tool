import Vue from "vue";
import VueRouter from "vue-router";
import cors from "cors";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Callback from "../views/Callback.vue";
import CodeCoverage from "../views/CodeCoverage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: (to) => {
      return "/home";
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    props: true,
  },

  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/callback",
    name: "Callback",
    component: Callback,
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

// const express = require("express");
// const bodyParser = require("body-parser");
// const axios = require("axios");
// const app = express();
// const https = require("https");
// app.use(express.static("public"));

// app.use(
//   bodyParser.urlencoded({ extended: true }, { useUnifiedTopology: true })
// );

// app.get("/", function(request, response) {
//   //response.sendFile("./respons");
//   response.send("Working");
//   // response.redirect(
//   //   "https://ap5.salesforce.com/services/oauth2/authorize?client_id=3MVG9n_HvETGhr3Ao6N8bdy6kmq_n37n2cTUbKSuUVPJSELHZGmjJB1d0BGeCbYm02pvcnx_Pa8XswuPvZ.3i&redirect_uri=http://localhost:3000/callback&response_type=code"
//   // );
// });

// const clientID =
//   "3MVG9n_HvETGhr3Ao6N8bdy6kmq_n37n2cTUbKSuUVPJSELHZGmjJB1d0BGeCbYm02pvcnx_Pa8XswuPvZ.3i";
// const clientSecret =
//   "E5A84ACB55F3ED8F9D87A191DC18E4A345FC74A8DEEF950E92A9BD0CA42F81ED";

// app.get("/callback", function(req, res) {
//   res.setHeader("Content-Type", "application/json");
//   console.log(res);
//   console.log("");
//   console.log("INSIDE GET METHOD");
//   console.log("");
//   console.log("STATUS CODE = ", res.statusCode);
//   console.log("");

//   const requestToken = req.query.code;
//   axios({
//     // make a POST request
//     method: "post",
//     url: `https://ap5.salesforce.com/services/oauth2/token?grant_type=authorization_code&code=${requestToken}&client_id=${clientID}&client_secret=${clientSecret}&redirect_uri=http://localhost:3000/callback`,
//     headers: {
//       accept: "application/json",
//     },
//   }).then((response) => {
//     const accessToken = response.data.access_token;
//     res.write("AUTHORISATION CODE = " + requestToken);
//     res.write("ACCESS TOKEN = " + accessToken);
//     res.send();
//     console.log("AUTHORISATION CODE = ", requestToken);
//     console.log(" ");
//     console.log("ACCESS TOKEN = ", accessToken);
//     res.send();
//   });
// });

// app.post("/callback", function(req, res) {
//   res.send("Post Working");
//   console.log(res);
//   console.log("POST");
// });
// const api_url =
//   "https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9n_HvETGhr3Ao6N8bdy6kmq_n37n2cTUbKSuUVPJSELHZGmjJB1d0BGeCbYm02pvcnx_Pa8XswuPvZ.3i&client_secret=E5A84ACB55F3ED8F9D87A191DC18E4A345FC74A8DEEF950E92A9BD0CA42F81ED&username=nikhil.harsh.sharma@cunning-moose-pf7l87.com&password=Nikhil@111MicZ47NV6KyperPez3P3CDc2";

// app.listen(3000, function() {
//   console.log("Port running on port 3000");
// });
