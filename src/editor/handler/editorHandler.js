import debounce from 'lodash/debounce'
import eslintHandler from '../handler/eslintHandler'
import { vuiIntelliSense, vuiHelp, emmetHTML } from './htmlEditor'

const devEditorKeys = { template: 'template', script: 'script', style: 'style', themeLess: 'themeLess', varLess: 'varLess' }
const defaultEditorKeys = { html: 'html', javascript: 'javascript', css: 'css', moduleCss: 'moduleCss', moduleJavascript: 'moduleJavascript' }

var editorData = {}
var parentVue

eslintHandler.init(editorData)

const Init = (editorVue) => {
    parentVue = editorVue;
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
    addTab(tabs, devEditorKeys.style, "style", "editor_style", "css")
    addTab(tabs, devEditorKeys.themeLess, "theme.less", "editor_theme", "less")
    addTab(tabs, devEditorKeys.varLess, "var.less", "editor_var", "less")
}
/*************** 页签 end **************/

/***************monaco editor **************/

const options = {
    // model: editorModel,
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
            { model: model },
            options
        ))

        editorData[editorKey] = {
            editor: editor, model: model,
        };
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
        window.addMonacoEditor(() => {
            $.each(tabs, function (i, d) {
                let obj = newMonacoEditor(d.key, d.editorContainerId, d.language)
                initEditor(obj, d)
            })
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

    editor.onMouseDown(function (e) {
        if (parentVue) {
            //隐藏浮动的错误信息
            parentVue.$refs.messageFlow.tyrToHide()
        }
    });
    editor.onDidChangeCursorPosition(function (e) {
        //updateRowColumn(e.position);
    });

    model.onDidChangeContent(() => {
        if (isEditing)
            return

        debounce(() => {
            isEditing = true
            debugger
            const eslintMsg = eslintHandler.invalidateEslint(editor)
            const afterMarker = eslintHandler.updateMarkers(editor, eslintMsg)
            //editorVue.eslintVerifyMessage = eslintMsg
            isEditing = false
        }, 667)();
    })
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

const setMonacoEditorFocusDelay = (editorKey) => {
    debounce(() => setMonacoEditorFocus(editorKey), 100)()
}

/**
 * 大小改变重新布局
 */
window.onresize = function () {
    editorLayout()
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
/*************** monaco editor end **************/

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
    eslintHandler
}