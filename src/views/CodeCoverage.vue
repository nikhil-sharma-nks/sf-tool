<template>
  <v-container>
    <v-card>
      <v-card-title>
        Code-Coverage
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table :headers="headers" :items="info"></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);
export default {
  data: () => ({
    clientID: "",
    clientSecret: "",
    environment: "",
    authCode: "",
    accessToken: "",
    resdata: [],
    headers: [
      {
        text: "Serial No.",
        align: "start",
        sortable: true,
        value: "sno",
      },
      {
        text: "Name",
        sortable: false,
        value: "name",
      },
      { text: "Total Number Of Lines", value: "totalLines" },
      { text: "NumLinesCovered", value: "NumLinesCovered" },
      { text: "NumLinesUncovered", value: "NumLinesUncovered" },
      { text: "Code Coverage Percentage", value: "percentage" },
      //   { text: "Carbs", value: "carbs" },
      //   { text: "Protein", value: "protein" },
      //   { text: "Iron", value: "iron" },
    ],
    info: [],
  }),
  mounted: function() {
    this.clientID = this.$store.state.clientID;
    this.clientSecret = this.$store.state.clientSecret;
    this.environment = this.$store.state.environment;
    this.authCode = this.$store.state.authCode;
    this.accessToken = this.$store.state.accessToken;
    let number = [];
    let resultNumLineCov = [];
    let resultNumLineNotCov = [];
    console.log("accessToken = ", this.$store.state.accessToken);
    //console.log(typeof this.resdata);
    axios({
      method: "get",
      url: `https://cors-anywhere.herokuapp.com/https://ap5.salesforce.com/services/data/v50.0/tooling/query/?q=SELECT+NumLinesCovered,+NumLinesUncovered,+Coverage+FROM+ApexCodeCoverage`,
      headers: {
        Authorization: "Bearer " + this.accessToken,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
      },

      crossdomain: true,
    }).then((response) => {
      //console.log(response.data.records);
      this.resdata = JSON.parse(JSON.stringify(response.data.records));
      console.log(this.resdata);
      const keys = Object.keys(this.resdata);
      console.log(keys);
      number = keys;
      // const values = Object.values(this.resdata);
      // this.resdata = values;
      //console.log(this.resdata);
      Object.keys(this.resdata).forEach((key) => {
        //console.log(key, this.resdata[key].NumLinesCovered);
        let linesCovered = this.resdata[key].NumLinesCovered;
        let linesNotCovered = this.resdata[key].NumLinesUncovered;
        // resultNumLineCov.push(linesCovered);
        // resultNumLineNotCov.push(linesNotCovered);

        let totalLines = linesCovered + linesNotCovered;
        let percentage = ((linesCovered / totalLines) * 100).toFixed(2);
        let obj = {
          sno: Number(key) + 1,
          name: this.resdata[key].attributes.url,
          totalLines: totalLines,
          NumLinesCovered: this.resdata[key].NumLinesCovered,
          NumLinesUncovered: this.resdata[key].NumLinesUncovered,
          percentage: percentage,
        };
        this.info.push(obj);
      });
      // console.log(number);
      // console.log(resultNumLineCov);
      // console.log(resultNumLineNotCov);
      console.log(this.info);
    });
    // console.log(number);
    // console.log(resultNumLineCov);
    // console.log(resultNumLineNotCov);
  },
};
</script>

<style></style>
