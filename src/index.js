import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
import global from './util/global';
import App from "./app.vue"

const app = new Vue({
    el: "#main",
    render: h => h(App, { ref: "app" }),
})

export default { App }

