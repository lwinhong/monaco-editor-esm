import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
import App from "./app.vue"

import global from './app/global'
Vue.prototype.global = global

window.global = global

export const app = new Vue({
    el: "#main",
    render: h => h(App, { ref: "app" }),
    mounted() {
        global.init(this.$refs.app)
    }
})


