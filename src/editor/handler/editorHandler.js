import debounce from 'lodash/debounce'
import vuiHandler from './htmlEditor/vuiHandler'
import monacoLoader from "../../monaco-editor/monaco-loader"
import validateHandler from './htmlEditor/validate/validateHandler'
import { vuiIntelliSense, vuiHelp, emmetHTML, eventBus, themeVarHandler, scriptHandler, cssHandler } from './htmlEditor'

const devEditorKeys = { template: 'template', script: 'script', style: 'style', themeLess: 'themeLess', varLess: 'varLess' }
const defaultEditorKeys = { html: 'html', javascript: 'javascript', css: 'css', moduleCss: 'moduleCss', moduleJavascript: 'moduleJavascript' }

var editorData = {}
var parentVue

/**
 * 初始化
 * @param {编辑器vue对象} editorVue 
 */
const Init = (editorVue) => {
    parentVue = editorVue
    eventBus.$on('executeCmdFromWinform', executeCommand)
    validateHandler.validateInit(parentVue, { editorData, devEditorKeys, defaultEditorKeys, vuiHandler })
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
    if (!tabs) return

    for (let index = 0; index < tabs.length; index++) {
        if (tabs[index].key === key) return
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
    addTab(tabs, devEditorKeys.style, "style", "editor_style", "css")
    addTab(tabs, devEditorKeys.themeLess, "theme.less", "editor_theme", "less")
    addTab(tabs, devEditorKeys.varLess, "var.less", "editor_var", "less")
}

/**
 * 获取编辑器页签text
 * @param {编辑器页签key} tabKey 
 */
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
        monacoLoader.load("resource/monaco-editor", () => {
            $.each(tabs, function (i, d) {
                let obj = newMonacoEditor(d.key, d.editorContainerId, d.language)
                initEditor(obj, d)
            })
            setMonacoEditorFocusDelay(tabs[0].key, 100)
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
        vuiIntelliSense(editor, { editorData, devEditorKeys, defaultEditorKeys, editorKey: tabData.key, model })
        vuiHelp(editor, model)
    }
    //注册theme页签相关
    if (tabData.key === devEditorKeys.themeLess) {
        themeVarHandler(editor, editorData, devEditorKeys)
    }
    //注册script页签提示
    if (tabData.key === devEditorKeys.script) {
        scriptHandler(editor)
    }
    //注册css提示
    if (tabData.key === defaultEditorKeys.css || tabData.key === defaultEditorKeys.moduleCss || tabData.key === devEditorKeys.style) {
        cssHandler()
    }
    //鼠标按下
    editor.onMouseDown(function (e) {
        if (parentVue) //隐藏浮动的错误信息
            parentVue.$refs.messageFlow.tryToHide()
    })
    //光标位置
    editor.onDidChangeCursorPosition(function (e) {
        eventBus.$emit('updateCursorPosition', e.position)
    })
    //内容改变
    editor.onDidChangeModelContent(function (e) {
        if (e.changes[0].text === ' ') {
            debounce(() => { executeCommand('triggerSuggest', editor) }, 200)()
        }
    })

    validateHandler.validateRegisterEvent(editor, parentVue)
    addMenuAction(editor, tabData)
}

/**
 * 添加一个编辑器右键上下文菜单
 * @param {编辑器} editor 
 * @param {页签数据} tabData 
 */
const addMenuAction = (editor, tabData) => {
    //添加右键菜单（在资源管理器中打开）
    editor.addAction({
        id: 'openWidthExplorer-' + tabData.key,
        label: '在资源管理器中打开',
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 0,
        run: function (ed) {
            //executeCmd(cmdData.openWidthExplorer);
            return null;
        }
    })
}

/**
 * 设置编辑器焦点
 * @param {编辑器} editor 
 */
const setMonacoEditorFocus = (editorKey) => {
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
    debounce(() => setMonacoEditorFocus(editorKey), timeout)();
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

/**
 * 异步设置编辑器重新布局
 * @param {超时时间} timeout 
 */
const editorLayoutDelay = (timeout) => {
    if (!timeout || !isNaN(timeout))
        timeout = 200
    debounce(editorLayout, timeout)();
}

window.onresize = editorLayout;

/**
 * 获取当前选中编辑器的数据
 */
const getSelectedEditorData = () => {
    var data = editorData[parentVue.tabSelectedIndex];
    return data;
}

/*************** monaco editor end **************/

/*************** 执行命令 **************/

/**
 * 常用编辑器的命令
 */
const monacoEditorCmd = {
    format: "editor.action.formatDocument",
    commentLine: "editor.action.commentLine",
    triggerSuggest: "editor.action.triggerSuggest",
    find: "actions.find",
    quickCommand: 'editor.action.quickCommand'
}

/**
 * 执行命令
 * @param {命令} cmd 
 * @param {值} value 
 */
const executeCommand = (cmd, value) => {
    console.log("cmd: " + cmd + "-> value:" + value)
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
        case "insertValue":
            insertValueToEditor(null, value, null)
            break;
    }
}

/**
 * 根据actionId 触发一个action
 * @param {action} actionId 
 * @param {是否设置焦点} focus 
 */
const triggerMonacoEditor = (actionId, focus) => {
    const editor = editorData[parentVue.tabSelectedIndex].editor
    triggerMonacoEditorAction(actionId, editor, focus)
}

/**
 * 根据actionId 触发一个action
 * @param {action} actionId 
 * @param {编辑器} editor 
 * @param {是否设置焦点} focus 
 */
const triggerMonacoEditorAction = (actionId, editor, focus) => {
    if (!editor)
        return
    if (focus)
        editor.focus()
    editor.trigger('', actionId, {})
}

/**
 * 插入数据到编辑器
 * @param {编辑器} editor 
 * @param {待插入的值} value 
 * @param {位置} range 
 * @param {插入之后是否设置焦点} setFocus 
 */
const insertValueToEditor = (editor, value, range, setFocus) => {
    try {
        if (!editor)
            editor = getSelectedEditorData().editor
        if (!editor)
            return

        if (!range) {
            var p = editor.getPosition()
            range = new monaco.Range(p.lineNumber, p.column, p.lineNumber, p.column)
        }
        editor.executeEdits("", [{
            range: range,
            text: value
        }])
        if (setFocus)
            setMonacoEditorFocus(parentVue.tabSelectedIndex)
    } catch (error) {
        console.error(error)
    }
}

/*************** 执行命令 end **************/

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
    executeCommand,
    getSelectedEditorData,
    insertValueToEditor
}