import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Manter apenas o CSS
import 'bootstrap/dist/css/bootstrap.min.css';

createApp(App).use(store).use(router).mount("#app");