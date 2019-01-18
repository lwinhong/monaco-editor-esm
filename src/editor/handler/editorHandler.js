import debounce from 'lodash/debounce'
import eslintHandler from '../handler/eslintHandler'
import { vuiIntelliSense, vuiHelp, emmetHTML, eventBus, themeVarHandler } from './htmlEditor'

const devEditorKeys = { template: 'template', script: 'script', style: 'style', themeLess: 'themeLess', varLess: 'varLess' }
const defaultEditorKeys = { html: 'html', javascript: 'javascript', css: 'css', moduleCss: 'moduleCss', moduleJavascript: 'moduleJavascript' }

var editorData = {}
var parentVue

eslintHandler.init(editorData)

const Init = (editorVue) => {
    parentVue = editorVue
    eventBus.$on('executeCmdFromWinform', executeCommand)
}

/*************** 页签 **************/

/**
 * 添加编辑器页签页
 * @param {页签集合} tabs 
 */
const addEditorTabPage = (tabs) => {
    if (editorMode == editorModeEnum.dev)
        addDevTab(tabs)
    else
        addDefaultTab(tabs)
    return tabs
}

/**
 * 新增一个页签页
 * @param {页签页的key} key 
 * @param {页签页的标题} text 
 * @param {编辑器容器id} editorContainerId 
 * @param {编辑器语言} language
 */
const addTab = (tabs, key, text, editorContainerId, language) => {
    if (!tabs)
        return

    for (let index = 0; index < tabs.length; index++) {
        const element = tabs[index];
        if (element.key === key)
            return
    }

    tabs.push({ key: key, text: text, editorContainerId: editorContainerId, language: language })
}

/**
 * 添加默认的页签页
 * @param {页签集合} tabs 
 */
const addDefaultTab = (tabs) => {
    addTab(tabs, defaultEditorKeys.html, "HTML", "editor_html", "html")
    addTab(tabs, defaultEditorKeys.moduleCss, "模块Css", "editor_module_css", "javascript")
    addTab(tabs, defaultEditorKeys.moduleJavascript, "模块JavaScript", "editor_module_javaScript", "css")
}

/**
 * 添加dev页签页
 * @param {页签集合} tabs 
 */
const addDevTab = (tabs) => {
    addTab(tabs, devEditorKeys.template, "template", "editor_template", "html")
    addTab(tabs, devEditorKeys.script, "script", "editor_script", "javascript")
    // addTab(tabs, devEditorKeys.style, "style", "editor_style", "css")
    addTab(tabs, devEditorKeys.themeLess, "theme.less", "editor_theme", "less")
    addTab(tabs, devEditorKeys.varLess, "var.less", "editor_var", "less")
}

const getTabText = tabKey => {
    if (parentVue) {
        for (var i = 0; i < parentVue.tabs.length; i++) {
            var tab = parentVue.tabs[i]
            if (tab.key === tabKey)
                return tab.text
        }
    }
    return null
}

/*************** 页签 end **************/

/***************monaco editor **************/

const options = {
    // wordWrap: editorWordWrap,
    // minimap: { enabled: editorMinimapEnabled },
    formatOnPaste: true,
    mouseWheelZoom: true,
    renderLineHighlight: "none",
    showFoldingControls: "mouseover",
    folding: true
    //glyphMargin:true
}

var isEditing = false;

/**
 * 新增monaco编辑器
 * @param {编辑器key} editorKey 
 * @param {编辑器容器id} containerId 
 * @param {编辑器语言} language 
 * @param {值} value 
 */
const newMonacoEditor = (editorKey, containerId, language, value) => {
    const container = document.getElementById(containerId)
    if (container) {
        const model = monaco.editor.createModel(value, language)
        const editor = monaco.editor.create(container, Object.assign(
            { model: model }, options
        ))
        editorData[editorKey] = { editor: editor, model: model, text: getTabText(editorKey) };
        return { editor, model }
    } else {
        console.log('newMonacoEditor: container is undefined')
    }
    return null
}

/**
 * 根据页签集合添加monaco编辑器
 * @param {页签集合} tabs 
 */
const addMonacoEditor = (tabs) => {
    debounce(() => {
        window.addMonacoEditor((monaco) => {
            $.each(tabs, function (i, d) {
                let obj = newMonacoEditor(d.key, d.editorContainerId, d.language)
                initEditor(obj, d)
            })
            setMonacoEditorFocusDelay(devEditorKeys.template, 100)
        })
    }, 100)()
}

/**
 * 初始化monaco编辑器
 * @param {编辑器数据} editorObj 
 * @param {页签数据} tabData 
 */
const initEditor = (editorObj, tabData) => {
    if (!editorObj || !editorObj.editor)
        return

    const editor = editorObj.editor
    const model = editorObj.model
    //template 或者 html编辑器：注册Emmet，vui智能提示相关
    if (tabData.key === devEditorKeys.template || tabData.key === defaultEditorKeys.html) {
        emmetHTML(editor)
        vuiIntelliSense(editor)
        vuiHelp(editor)
    }

    if (tabData.key === defaultEditorKeys.themeLess) {
        themeVarHandler(editor)
    }

    editor.onMouseDown(function (e) {
        if (parentVue) {
            //隐藏浮动的错误信息
            parentVue.$refs.messageFlow.tryToHide()
        }
    });
    editor.onDidChangeCursorPosition(function (e) {
        eventBus.$emit('updateCursorPosition', e.position)
    });

    editor.onDidChangeModelContent(function (e) {
        if (e.changes[0].text === ' ') {
            debounce(() => {
                executeCommand('triggerSuggest', editor)
            }, 200)();
        }

        const currentKey = parentVue.tabSelectedIndex
        if (!isEditing &&
            (currentKey === devEditorKeys.template || currentKey === devEditorKeys.script))
            didChangedContent(model, editor, currentKey)
    })
}

const didChangedContent = (model, editor, tabKey) => {
    isEditing = true
    debounce(() => {
        try {
            var lintValue = getLintValue(model, tabKey)
            const eslintMsg = eslintHandler.invalidateEslint(lintValue)
            const afterMarker = eslintHandler.updateMarkers(editor, eslintMsg)
            setMessageFlowData(afterMarker, tabKey, null, true)
        } catch (error) {
            console.error('onDidChangeContent:' + error)
        } finally {
            isEditing = false
        }
    }, 1000)();
}

const getLintValue = (model, editorKey) => {
    var lintValue = model.getValue()

    if (editorKey === devEditorKeys.script)
        lintValue = "<script>\n " + lintValue + "\n </script>"
    else if (editorKey === devEditorKeys.template)
        lintValue = "<template>\n " + lintValue + "\n </template>"

    return lintValue
}

/**
 * 设置编辑器焦点
 * @param {编辑器} editor 
 */
function setMonacoEditorFocus(editorKey) {
    try {
        const editor = editorData[editorKey].editor
        if (editor)
            editor.focus()
    } catch (error) {
        console.error('setMonacoEditorFocus:' + error)
    }
}

/**
 * 设置编辑器焦点
 * @param {编辑器key} editorKey 
 */
const setMonacoEditorFocusDelay = (editorKey, timeout) => {
    debounce(() => setMonacoEditorFocus(editorKey), timeout)()
}

/**
 * 编辑器重新布局
 */
const editorLayout = () => {
    for (var prop in editorData) {
        if (editorData.hasOwnProperty(prop) && editorData[prop].editor) {
            editorData[prop].editor.layout();
        }
    }
}
const editorLayoutDelay = (timeout) => {
    if (!timeout || !isNaN(timeout))
        timeout = 200
    debounce(editorLayout, timeout)();
}

window.onresize = editorLayout;

const getSelectedEditorData = () => {
    return editorData[parentVue.tabSelectedIndex];
}

/*************** monaco editor end **************/

/*************** 执行命令 **************/
const monacoEditorCmd = {
    format: "editor.action.formatDocument",
    commentLine: "editor.action.commentLine",
    triggerSuggest: "editor.action.triggerSuggest",
    find: "actions.find",
    quickCommand: 'editor.action.quickCommand'
}

const executeCommand = (cmd, value) => {
    switch (cmd) {
        case "showMessageFlow"://显示错误列表
            parentVue.$refs.messageFlow.toggleShow(value);
            break
        case "vlist":
            parentVue.$refs.messageFlow.toggleShow(cmd);
            break
        case "format"://格式化
            triggerMonacoEditor(monacoEditorCmd.format, true)
            break
        case "commentLine"://格式化
            triggerMonacoEditor(monacoEditorCmd.commentLine, true)
            break
        case "triggerSuggest": //打开智能提示面板
            triggerMonacoEditor(monacoEditorCmd.triggerSuggest)
            break
        case "find":
            triggerMonacoEditor(monacoEditorCmd.find)
            break;
        case "quickCommand":
            triggerMonacoEditor(monacoEditorCmd.quickCommand)
            break
        case "setEditorFocus":
            setMonacoEditorFocus(parentVue.tabSelectedIndex)
            break
    }
}

const triggerMonacoEditor = (actionId, focus) => {
    const editor = editorData[parentVue.tabSelectedIndex].editor
    triggerMonacoEditorAction(actionId, editor, focus)
}

const triggerMonacoEditorAction = (actionId, editor, focus) => {
    if (editor) {
        if (focus)
            editor.focus()
        editor.trigger('', actionId, {})
    }
}

/*************** 执行命令 end **************/

/********************** 验证信息 **********************/

const setMessageFlowData = (messages, editorKey, dataType, clearBefore) => {
    if (parentVue) {

        const flow = parentVue.$refs.messageFlow
        const errorData = flow.errorData
        const suggestData = flow.suggestData

        if (clearBefore) {
            clearMessageFlowData(editorKey, dataType);
        }
        if (messages) {
            const editorName = editorData[editorKey].text
            for (let index = 0; index < messages.length; index++) {
                const msg = messages[index]
                msg.moduleKey = editorKey
                msg.moduleName = editorName
                if (monaco.MarkerSeverity.Error === msg.severity) {
                    errorData.push(msg)
                } else if (monaco.MarkerSeverity.Hint === msg.severity) {
                    suggestData.push(msg)
                }
            }
        }
        updateFootbarMsg()
    }
}

const clearMessageFlowData = (editorKey, dataType) => {
    if (!parentVue)
        return

    const flow = parentVue.$refs.messageFlow
    const datas = [flow.errorData, flow.suggestData]

    for (let index = 0; index < datas.length; index++) {
        const data = datas[index];
        if (editorKey) {
            for (var i = data.length - 1; i >= 0; i--) { //校验指定的编辑器之前删除该编辑器之前校验的数据
                var element = data[i];
                if (element.moduleKey === editorKey) {
                    data.splice(i, 1);
                }
            }
        }
        else {
            if (!dataType || dataType === 'error')
                data.splice(0, data.length)
            if (!dataType || dataType === 'suggest')
                data.splice(0, data.length)
        }
    }
}

const updateFootbarMsg = () => {
    var obj = { errorMsgCount: 0, suggestMsgCount: 0 }
    if (parentVue) {
        const flow = parentVue.$refs.messageFlow

        obj.errorMsgCount = flow.errorData.length
        obj.suggestMsgCount = flow.suggestData.length
    }
    eventBus.$emit('updateMessageCount', obj)
}
/********************** 验证信息 end **********************/

export default {
    Init,
    addEditorTabPage,
    addMonacoEditor,
    devEditorKeys,
    defaultEditorKeys,
    editorData,
    setMonacoEditorFocus,
    setMonacoEditorFocusDelay,
    editorLayout,
    editorLayoutDelay,
    eslintHandler,
    getLintValue,
    executeCommand,
    getSelectedEditorData
}