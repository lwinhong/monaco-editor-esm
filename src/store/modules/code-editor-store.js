const codeEditorStore = {
    namespaced: true,
    state: {
        htmlEditorNodes: null,
        theme: "default",
        vuiData: null
    },
    getters: {
        getTheme(state, rootState) {
            return state.theme;
        }
    },
    mutations: {
        setHtmlEditorNodes(state, outlineObj) {
            state.htmlEditorNodes = outlineObj
        },
        setTheme(state, value) {
            state.theme = value == "default" ? "vs" : "vs-dark"
        },
        setVuiData(state, value) {
            state.vuiData = value
        }
    },
    actions: {
        setHtmlEditorNodesAction({ commit, state, rootState }, value) {
            commit('setHtmlEditorNodes', value)
        },
        setVuiDataAction({ commit, state, rootState }, value) {
            commit('setVuiData', value)
        }
    }
}

export default codeEditorStore