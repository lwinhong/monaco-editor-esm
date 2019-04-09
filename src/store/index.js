import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import modules from './modules'

const state = {
    theme: 'default'
}

const mutations = {
    setTheme: (state, theme) => state.theme = theme
}

const actions = {
    setThemeAction: ({ commit, state }, theme) => {
        commit('setTheme', theme)
        commit('codeEditorStore/setTheme', theme)
    }
}

export default new Vuex.Store({
    modules,
    state,
    mutations,
    actions
})
