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
    ],
    info: [],
  }),
  mounted: function() {
    this.clientID = this.$store.state.clientID;
    this.clientSecret = this.$store.state.clientSecret;
    this.environment = this.$store.state.environment;
    this.authCode = this.$store.state.authCode;
    this.accessToken = this.$store.state.accessToken;

    console.log("accessToken = ", this.$store.state.accessToken);

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
      this.resdata = JSON.parse(JSON.stringify(response.data.records));
      console.log(this.resdata);

      Object.keys(this.resdata).forEach((key) => {
        //looping through response data
        let linesCovered = this.resdata[key].NumLinesCovered;
        let linesNotCovered = this.resdata[key].NumLinesUncovered;
        let totalLines = linesCovered + linesNotCovered;
        let percentage = ((linesCovered / totalLines) * 100).toFixed(2);
        //creating object to store relevent data
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

      console.log(this.info);
    });
  },
};
</script>

<style></style>
