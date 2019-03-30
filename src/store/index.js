import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import codeEditorStore from './modules/code-editor-store'

const modules = {
    codeEditorStore
}

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
