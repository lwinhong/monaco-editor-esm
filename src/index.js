import Vue from 'vue'
import iView from 'iview'
import App from "./components/app.vue"
import global from './app/global'

Vue.use(iView)

import store from './store'

import ts1 from './ts1'
let tsss = new ts1();
console.log(tsss.test("ss","22"))
Vue.config.errorHandler = function (err, vm, info) {
    console.error(arguments)
}

Vue.prototype.v3global = global
window.v3global = global

export const app = new Vue({
    el: "#main",
    store,
    render: h => h(App, { ref: "app" }),
    mounted() {
        global.init(this.$refs.app)
    }
})