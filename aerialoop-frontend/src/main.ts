import { createApp } from "vue";
import "./style.css";
import "sweetalert2/dist/sweetalert2.min.css";
import App from "./App.vue";
import VueSweetalert2 from "vue-sweetalert2";

const vue = createApp(App);
vue.use(VueSweetalert2);

vue.mount("#app");
