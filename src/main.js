import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dayjs from "dayjs";
// import http from "http";
// import axios from "axios";
import Vant from "vant";
import "vant/lib/index.css";
import api from "./http/api";
import city from "./http/city";

Vue.config.productionTip = false;
Vue.prototype.$dayjs = dayjs;
// Vue.prototype.$axios = http;
Vue.prototype.$api = api;
Vue.prototype.$city = city;
Vue.use(Vant);

// axios.defaults.timeout = 10000; // 设置超时时间
// // 过滤请求结果 只返回结果的data
// axios.interceptors.response.use(
//   response => {
//     return response.data;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
