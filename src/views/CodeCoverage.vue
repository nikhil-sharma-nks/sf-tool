<template>
  <v-container fluid>
    <v-card
      elevation="24"
      outlined
      shaped
      class="card-curved mx-auto"
      max-width="100%"
    >
      <v-card-title>
        Code-Coverage
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="info"
        :search="search"
        :loading="myloadingvariable"
        loading-text="Loading... Please wait"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
      >
        <template v-slot:top>
          <v-text-field v-model="search" label="Search" class="mx-5 px-auto">
          </v-text-field>
          <!-- <v-select
            v-model="sortBy"
            flat
            solo-inverted
            hide-details
            :items="keys"
            prepend-inner-icon="mdi-magnify"
            label="Sort by"
            class="mx-4"
          ></v-select> -->
        </template>

        <template v-slot:[`item.percentage`]="{ item }">
          <v-chip :color="getColor(item.percentage)">
            {{ item.percentage }}
          </v-chip>
        </template>
      </v-data-table>
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
    myloadingvariable: true,
    search: "",
    clientID: "",
    clientSecret: "",
    environment: "",
    authCode: "",
    accessToken: "",
    resdata: [],
    sortBy: "name",
    keys: ["covered", "not covered"],
    headers: [
      {
        text: "Serial No.",
        align: "start",
        sortable: true,
        value: "sno",
      },
      {
        text: "Name",
        sortable: true,
        value: "name",
      },
      { text: "Total Number Of Lines", value: "totalLines" },
      { text: "NumLinesCovered", value: "NumLinesCovered" },
      { text: "NumLinesUncovered", value: "NumLinesUncovered" },
      { text: "Code Coverage Percentage", value: "percentage" },
      // { text: "Status", value: "status" },
    ],
    info: [],
    filter: {},
    sortDesc: false,
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
        let status = "not covered";
        if (percentage >= 75) {
          status = "covered";
        }
        //creating object to store relevent data
        let obj = {
          sno: Number(key) + 1,
          name: this.resdata[key].attributes.url,
          totalLines: totalLines,
          NumLinesCovered: this.resdata[key].NumLinesCovered,
          NumLinesUncovered: this.resdata[key].NumLinesUncovered,
          percentage: percentage,
          status: status,
        };
        this.info.push(obj);
      });

      console.log(this.info);
      if (this.info.length > 0) {
        this.myloadingvariable = false;
      }
    });
  },
  methods: {
    getColor(percentage) {
      let percent = Number(percentage);
      if (percent >= 90) return "green";
      else if (percent >= 75 && percent < 90) return "orange";
      else return "red";
    },
    customFilter(items, search, filter) {
      search = search.toString().toLowerCase();
      return items.filter((row) => filter(row["status"], search));
    },
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
};
</script>

<style></style>
