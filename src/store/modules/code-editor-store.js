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
    getters: {
        getHtmlEditorNodesSameLevel(state) {
            let nodes = state.htmlEditorNodes;
            let sameLevel = []
            setToSameLevelRecursion([nodes], sameLevel)
            return sameLevel
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

function setToSameLevelRecursion(elements, list) {
    if (!elements)
        return

    for (const element of elements) {
        list.push(element)
        setToSameLevelRecursion(element.children, list)
    }
}

export default codeEditorStore