import Vue from 'vue'
import iView from 'iview'
import App from "./app.vue"
import global from './app/global'

Vue.use(iView)
Vue.prototype.v3global = global
window.v3global = global

export const app = new Vue({
    el: "#main",
    render: h => h(App, { ref: "app" }),
    mounted() {
        global.init(this.$refs.app)
    }
})