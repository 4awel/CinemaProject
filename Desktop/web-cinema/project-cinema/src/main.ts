// import './assets/main.css'
// Requst as server
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3005";


import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n, useI18n } from "vue-i18n";
import { languages } from "./i18n";
import { defaultLocale } from "./i18n";

const localStorageLang = localStorage.getItem('langCountry');
const messages = Object.assign(languages);

const i18n = createI18n({
  legacy: false,
  locale: localStorageLang || defaultLocale,
  fallbackLocale: "en",
  messages,
});

const app = createApp(App);
app.use(router).use(i18n).mount("#app");
