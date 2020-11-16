import Vue from 'vue'
import iView from 'view-design'
import App from "./components/app.vue"
import global from './app/GlobalHandler'

Vue.use(iView)

import store from './store'

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