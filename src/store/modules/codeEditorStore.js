const state = {
    currentEditorKey: "template",
    cursorPostion: { lineNumber: 0, column: 0 },
    errorMessage: { errorMsgCount: 0, suggestMsgCount: 0 },
    htmlEditorNodes: null,
    theme: "default",
    vuiData: null
}

const getters = {
    getTheme(state, rootState) {
        return state.theme
    },
    getHtmlEditorNodesSameLevel(state) {
        let nodes = state.htmlEditorNodes;
        let sameLevel = []
        if (nodes)
            setToSameLevelRecursion([nodes], sameLevel)
        return sameLevel
    }
}

const mutations = {
    setHtmlEditorNodes(state, outlineObj) {
        state.htmlEditorNodes = outlineObj
    },
    setTheme(state, value) {
        state.theme = value == "default" ? "vs" : "vs-dark"
    },
    setVuiData(state, value) {
        state.vuiData = value
    },
    setEditorKey(state, value) {
        state.currentEditorKey = value
    },
    setCursorPostion(state, value) {
        state.cursorPostion = value
    },
    setErrorMessage(state, value) {
        state.errorMessage = value
    }

}

const actions = {
    setHtmlEditorNodesAction({ commit, state, rootState }, value) {
        commit('setHtmlEditorNodes', value)
    },
    setVuiDataAction({ commit, state, rootState }, value) {
        commit('setVuiData', value)
    },
    setEditorKeyAction({ commit }, value) {
        commit('setEditorKey', value)
    },
    setCursorPostionAction({ commit }, value) {
        commit("setCursorPostion", value)
    },
    setErrorMessageAction({ commit }, value) {
        commit("setErrorMessage", value)
    }
}

const setToSameLevelRecursion = (elements, list) => {
    if (!elements)
        return

    for (const element of elements) {
        list.push(element)
        if (element.hasOwnProperty('children'))
            setToSameLevelRecursion(element['children'], list)
    }
}

const codeEditorStore = {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}

export default codeEditorStore