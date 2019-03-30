const codeEditorStore = {
    namespaced: true,
    state: {
        htmlEditorNodes: null,
        theme: "default"
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
        }
    },
    actions: {
        setHtmlEditorNodesAction({ commit, state, rootState }, outlineObj) {
            commit('setHtmlEditorNodes', outlineObj)
        }
    }
}

export default codeEditorStore