import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clientID:
      "3MVG9n_HvETGhr3Ao6N8bdy6kmq_n37n2cTUbKSuUVPJSELHZGmjJB1d0BGeCbYm02pvcnx_Pa8XswuPvZ.3i",
    clientSecret:
      "E5A84ACB55F3ED8F9D87A191DC18E4A345FC74A8DEEF950E92A9BD0CA42F81ED",
    environment: "",
    authCode: "",
    accessToken: "",
  },
  getters: {},
  plugins: [createPersistedState()],
  mutations: {
    setEnvironment(state, payload) {
      console.log("Inside setEnvironment Mutation payload = ", payload);
      state.environment = payload;
    },
    setAuthCode(state, payload) {
      console.log("Inside setAuthCode Mutation payload = ", payload);
      state.authCode = payload;
    },
    setAccessToken(state, payload) {
      console.log("Inside setAccessToken Mutation payload = ", payload);
      state.accessToken = payload;
    },
  },
  actions: {},
  strict: false,
});
