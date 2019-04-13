const state = {
    currentEditorKey: "template",
    cursorPosition: { lineNumber: 0, column: 0 },
    cursorPositionOffset: 0,
    errorMessage: { errorMsgCount: 0, suggestMsgCount: 0 },
    htmlEditorNodes: null,
    widgetCodes: [],
    theme: "default",
    vuiData: null,
    wordWrap: true,
    minimap: false
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
    },
    getNearestNode: (state) => (nodes, offset) => {
        if (!nodes || !offset || nodes.length == 0)
            return null

        let nearestNode
        let os = 0
        for (let index = 0; index < nodes.length; index++) {
            const node = nodes[index];
            if (node.start <= offset && node.end >= offset) {
                let tmp = node.end - node.start;
                if (index == 0)
                    os = tmp
                if (os >= tmp) {
                    os = tmp
                    nearestNode = node
                }
            }
        }
        return nearestNode
    },
    getWidgetCodes(state) {
        return state.widgetCodes
    }
}

const mutations = {
    setWordWrap(state, value) {
        state.wordWrap = value;
    },
    setChangeWordWrap(state, value) {
        state.wordWrap = value;
    },
    setMinimap(state, value) {
        state.minimap = value;
    },
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
    setCursorPosition(state, value) {
        state.cursorPosition = value
    },
    setErrorMessage(state, value) {
        state.errorMessage = value
    },
    setCursorPositionOffset(state, value) {
        state.cursorPositionOffset = value
    },
    setWidgetCodes(state, value) {
        state.widgetCodes = value
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
    setCursorPositionAction({ commit }, value) {
        commit("setCursorPosition", value)
    },
    setErrorMessageAction({ commit }, value) {
        commit("setErrorMessage", value)
    },
    setCursorPositionOffsetAction({ commit }, value) {
        commit("setCursorPositionOffset", value)
    },
    setWidgetCodesAction({ commit }, value) {
        commit("setWidgetCodes", value)
    },
    setChangeWordWrapAction({ commit, state, rootState }, value){
        commit("setChangeWordWrap", !state.wordWrap)
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