import debounce from 'lodash/debounce'
import vuiHandler from './htmlEditor/vuiHandler'
import validateHandler from './htmlEditor/validate/validateHandler'
import { vuiIntelliSense, vuiHelp, emmetHTML, eventBus, themeVarHandler, scriptHandler, cssHandler, cmdData } from './htmlEditor'

const devEditorKeys = { template: 'template', script: 'script', style: 'style', themeLess: 'themeLess', varLess: 'varLess' }
const defaultEditorKeys = { html: 'html', javascript: 'javascript', css: 'css', moduleCss: 'moduleCss', moduleJavascript: 'moduleJavascript' }

const editorData = {}
var parentVue
var isAnyValueChanged = false

/**
 * 初始化
 * @param {编辑器vue对象} editorVue 
 */
const Init = (editorVue) => {
    parentVue = editorVue
    eventBus.$on("executeCmd", executeCommand)//注册一个用来接受来自信息的事件
    validateHandler.validateInit(parentVue, { editorData, devEditorKeys, defaultEditorKeys, vuiHandler })
}

const doLoad = (value) => {
    addEditorTabPage(parentVue.tabs, value)
}

/*************** 页签 **************/

/**
 * 添加编辑器页签页
 * @param {页签集合} tabs 
 */
const addEditorTabPage = (tabs, editorValueJosn) => {
    console.log("loadTabs&MonacoEditor")
    if (isDevEditorMode())
        addDevTab(tabs, editorValueJosn)
    else
        addDefaultTab(tabs, editorValueJosn)
    return tabs
}

/**
 * 新增一个页签页
 * @param {页签页的key} key 
 * @param {页签页的标题} text 
 * @param {编辑器容器id} editorContainerId 
 * @param {编辑器语言} language
 */
const addTab = (tabs, key, text, language, editorValue) => {
    if (!tabs) return

    for (let index = 0; index < tabs.length; index++) {
        if (tabs[index].key === key) return
    }

    tabs.push({ key, text, language, editorValue })
}

/**
 * 添加默认的页签页
 * @param {页签集合} tabs 
 */
const addDefaultTab = (tabs, editorValueJosn) => {
    addTab(tabs, defaultEditorKeys.html, "HTML", "html", editorValueJosn.Html || "")
    addTab(tabs, defaultEditorKeys.moduleCss, "模块Css", "css", editorValueJosn.ModuleCss || "")
    addTab(tabs, defaultEditorKeys.moduleJavascript, "模块JavaScript", "javascript", editorValueJosn.ModuleJavaScript)

    if (editorValueJosn.Css)
        addTab(tabs, defaultEditorKeys.css, "全局Css", "css", editorValueJosn.Css || "")
    if (editorValueJosn.JavaScript)
        addTab(tabs, defaultEditorKeys.javascript, "全局JavaScript", "javascript", editorValueJosn.JavaScript || "")
}

/**
 * 添加dev页签页
 * @param {页签集合} tabs 
 */
const addDevTab = (tabs, editorValueJosn) => {
    addTab(tabs, devEditorKeys.template, "template", "html", editorValueJosn.Template || "")
    addTab(tabs, devEditorKeys.script, "script", "javascript", editorValueJosn.Script || "")
    //if (editorValueJosn.Style)
        addTab(tabs, devEditorKeys.style, "style", "css", editorValueJosn.Style || "")
    addTab(tabs, devEditorKeys.themeLess, "theme.less", "less", editorValueJosn.ThemeLess || "")
    addTab(tabs, devEditorKeys.varLess, "var.less", "less", editorValueJosn.VarLess || "")
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

/**
 * monaco编辑器新建完成之后要处理的事件
 * @param {编辑器} editor 
 * @param {页签数据} tab 
 * @param {是否设置焦点} isSetFocus 
 */
const afterMonacoEditorCreated = (editor, tab, isSetFocus) => {
    const editorKey = tab.key
    const model = editor.getModel()
    const editorObj = { editor, model, text: getTabText(editorKey) }
    editorData[editorKey] = editorObj

    if (tab.editorValue) {
        model.setValue(tab.editorValue)
        tab.editorValue = null
    }

    initEditor(editorObj, tab)
    if (isSetFocus)
        setMonacoEditorFocusDelay(editorKey, 100)
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
    const editorKey = tabData.key

    //template 或者 html编辑器：注册Emmet，vui智能提示相关
    if (editorKey === devEditorKeys.template || editorKey === defaultEditorKeys.html) {
        emmetHTML(editor)
        vuiIntelliSense(editor, { editorData, devEditorKeys, defaultEditorKeys, editorKey, model })
        vuiHelp(editor, model)
    }
    //注册theme页签相关
    if (editorKey === devEditorKeys.themeLess) {
        themeVarHandler(editor, editorData, devEditorKeys)
    }
    //注册script页签提示
    if (editorKey === devEditorKeys.script) {
        scriptHandler(editor)
    }
    //注册css提示
    if (editorKey === defaultEditorKeys.css || editorKey === defaultEditorKeys.moduleCss || editorKey === devEditorKeys.style) {
        cssHandler()
    }
    //鼠标按下
    editor.onMouseDown(e => {
        if (parentVue) //隐藏浮动的错误信息
            parentVue.$refs.messageFlow.tryToHide()
    })
    editor.onKeyDown(e => {
        //alt + z (自动换行)
        if (e.code === 'KeyZ' && e.altKey === true) {
            executeCommand(cmdData.wordWrap)
        }
    })
    //光标位置
    editor.onDidChangeCursorPosition(function (e) {
        //eventBus.$emit('updateCursorPosition', e.position)
        parentVue.v3global.executeCmd("updateCursorPosition", e.position)
    })
    //内容改变
    editor.onDidChangeModelContent(function (e) {
        onDidChangeModelContent(e, editor, model, editorKey)
    })

    addMenuAction(editor, tabData)
}

const onDidChangeModelContent = (e, editor, model, editorKey) => {
    isAnyValueChanged = true

    if (e.changes[0].text === ' ')
        debounce(() => { executeCommand('triggerSuggest', editor) }, 200)()//弹出建议提示

    //验证输入
    validateHandler.doValidate(editorKey, null, () => {
        debounce(function () {
            window.v3global.executeCmdToWinform(cmdData.cacheChangedValue, getAllValue())//将改变的数据发送winform端
            window.v3global.executeCmd(cmdData.editorChanged, { code: model.getValue(), editorKey })
        }, 1)();
    })
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
            return null
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
    debounce(() => setMonacoEditorFocus(editorKey), timeout)()
}

/**
 * 编辑器重新布局
 */
const editorLayout = () => {
    for (var prop in editorData) {
        if (editorData.hasOwnProperty(prop) && editorData[prop].editor) {
            editorData[prop].editor.layout()
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
    debounce(editorLayout, timeout)()
}

window.onresize = editorLayout

/**
 * 获取当前选中编辑器的数据
 */
const getSelectedEditorData = () => {
    var data = editorData[parentVue.tabSelectedIndex]
    return data
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
        case "load":
            doLoad(value)
            break
        case "showMessageFlow"://显示错误列表
            parentVue.$refs.messageFlow.toggleShow(value)
            break
        case "vlist":
            parentVue.$refs.messageFlow.toggleShow(cmd)
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
            break
        case "quickCommand":
            triggerMonacoEditor(monacoEditorCmd.quickCommand)
            break
        case "setEditorFocus":
            setMonacoEditorFocus(parentVue.tabSelectedIndex)
            break
        case "insertValue":
            insertValueToEditor(null, value, null)
            break
        case "theme":
            parentVue.theme = value
            break
        case "loadEvent":
            window.v3global.executeCmdToWinform(cmdData.reloadEvent, getAllValue())
            break
        case cmdData.wordWrap:
            parentVue.wordWrap = !parentVue.wordWrap
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

/*************** 保存 end **************/

//获取全部编辑器的代码
const getAllValue = () => {
    var allValue = {
        IsValueChanged: isAnyValueChanged
    }
    for (var prop in editorData) {
        allValue[prop] = editorData[prop].model.getValue()
    }
    return allValue
}

const save = () => {
    return getAllValue()
}

const saveAndClose = (isValidation) => {

}

const saveViewState = () => {
    var allValue = {
        "selectedIndex": parentVue.tabSelectedIndex,
        // "errorState": errorViewHandler.getState()
    }

    for (var prop in editorData) {
        allValue[prop] = editorData[prop].editor.saveViewState()
    }
    return allValue
}

/*************** 保存 end **************/

export default {
    Init,
    addEditorTabPage,
    devEditorKeys,
    defaultEditorKeys,
    editorData,
    setMonacoEditorFocus,
    setMonacoEditorFocusDelay,
    editorLayout,
    editorLayoutDelay,
    executeCommand,
    getSelectedEditorData,
    insertValueToEditor,
    afterMonacoEditorCreated,
    cmdData,
    save,
    saveAndClose,
    saveViewState
}