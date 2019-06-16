import { debounceWrapper } from '../../app/util'

const state = {
    editorData: {},
    currentEditorKey: "template",
    cursorPosition: { lineNumber: 0, column: 0 },
    cursorPositionOffset: 0,
    currentNodeAndAttr: null,
    currentNode: null,
    errorMessage: { errorMsgCount: 0, suggestMsgCount: 0 },
    htmlEditorNodes: null,
    widgetCodes: [],
    theme: "default",
    vuiData: null,
    wordWrap: true,
    minimap: false,
}

const getters = {
    getTheme(state, rootState) {
        return state.theme
    },
    getEditorData(state) {
        return state.editorData
    },
    getHtmlEditorNodesSameLevel(state) {
        let nodes = state.htmlEditorNodes;
        let sameLevel = []
        if (nodes)
            setToSameLevelRecursion([nodes], sameLevel)
        return sameLevel
    },
    getHtmlEditorNodesSameLevelByNode: () => (node) => {
        if (node)
            setToSameLevelRecursion([node], sameLevel)
        return sameLevel
    },
    getNearestNode: (state, getters, rootState) => (offset) => {
        let nodes = getters.getHtmlEditorNodesSameLevel
        let nearestNode = getNearestNodeWidthNodes(nodes, offset)
        return nearestNode
    },
    getNearestNodeWidthNodes: () => (nodes, offset) => {
        let nearestNode = getNearestNodeWidthNodes(nodes, offset)
        return nearestNode
    },
    getNearestNodeAndAttribute: (state, getters) => (offset) => {
        let node = getters.getNearestNode(offset)
        let attr = getNearestAttribute(node, offset)
        return { node, attr }
    },
    getNearestAttribute: () => (node, offset) => {
        let attr = getNearestAttribute(node, offset)
        return attr
    },
    getWidgetCodes(state) {
        return state.widgetCodes
    }
}

const mutations = {
    setEditorData(state, value) {
        state.editorData = value
    },
    setWordWrap(state, value) {
        state.wordWrap = value;
    },
    setChangeWordWrap(state, value) {
        state.wordWrap = value;
    },
    setMinimap(state, value) {
        state.minimap = value;
    },
    setHtmlEditorNodes(state, value) {
        state.htmlEditorNodes = value
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
    },
    setCurrentNodeAndAttr(state, value) {
        state.currentNodeAndAttr = value
    },
    setCurrentNode(state, value) {
        state.currentNode = value
    }
}

const actions = {
    setEditorDataAction({ commit }, value) {
        commit('setEditorData', value)
    },
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
    setCursorPositionOffsetAction({ commit, getters }, value) {
        commit("setCursorPositionOffset", value)
        if (!getNearestNodeAndAttributeDebouncer) {
            getNearestNodeAndAttributeDebouncer = debounceWrapper(args => {
                let nodeAttr = getters.getNearestNodeAndAttribute(args[0])
                commit('setCurrentNodeAndAttr', nodeAttr)
                commit('setCurrentNode', nodeAttr.node)
            }, 667);
        }
        getNearestNodeAndAttributeDebouncer(value)
    },
    setWidgetCodesAction({ commit }, value) {
        commit("setWidgetCodes", value)
    },
    setChangeWordWrapAction({ commit, state, rootState }, value) {
        commit("setChangeWordWrap", !state.wordWrap)
    }
}

let getNearestNodeAndAttributeDebouncer

function setToSameLevelRecursion(elements, list) {
    if (!elements)
        return
    for (const element of elements) {
        list.push(element)
        if (element.hasOwnProperty('children'))
            setToSameLevelRecursion(element['children'], list)
    }
}

function getNearestNodeWidthNodes(nodes, offset) {
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
}

function getNearestAttribute(node, offset) {
    let attr
    if (node && node.tag) {
        for (const _attr of node.attrsList) {
            if (_attr.start <= offset && _attr.end >= offset) {
                attr = _attr
                break
            }
        }
    }
    return attr
}

const codeEditorStore = {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}

export default codeEditorStore