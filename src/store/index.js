import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import modules from './modules'

const state = {
    theme: 'default',
    executeCmd: null
}

const mutations = {
    setTheme: (state, theme) => state.theme = theme,
    setExecuteCmd: (state, value) => {
        state.executeCmd = value
    }
}

const actions = {
    setThemeAction({ commit, state }, theme) {
        commit('setTheme', theme)
        commit('codeEditorStore/setTheme', theme)
    },
    executeCmd({ state }, cmd, value) {
        state.executeCmd(cmd, value)
    }
}

export default new Vuex.Store({
    modules,
    state,
    mutations,
    actions,
    strict: process.env.NODE_ENV !== 'production'
})
