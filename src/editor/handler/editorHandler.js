import emmet from '../emmet/monaco-emmet'

const devEditorKeys = { template: 'template', script: 'script', style: 'style', themeLess: 'themeLess', varLess: 'varLess' }
const defaultEditorKeys = { html: 'html', javascript: 'javascript', css: 'css', moduleCss: 'moduleCss', moduleJavascript: 'moduleJavascript' }

var editorData = {}
var appEditorVue;

function Init(editorVue) {
    appEditorVue = editorVue;
}

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

const newMonacoEditor = (editorKey, containerId, language, value) => {
    const container = document.getElementById(containerId)
    if (container) {
        const model = monaco.editor.createModel(value, language)
        const editor = monaco.editor.create(container, Object.assign(
            { model: model },
            options
        ))
        debugger;
        editorData = Object.assign(editorData, {
            editorKey: {
                editor: editor, model: model,
            }
        })
        return { editor, model }
    } else {
        console.log('newMonacoEditor: container is undefined')
    }
    return null;
}

function addMonacoEditor(tabs) {
    setTimeout(() => {
        window.addMonacoEditor(() => {
            $.each(tabs, function (i, d) {
                let obj = newMonacoEditor(d.key, d.editorContainerId, d.language)
                initEditor(obj, d)
            })
        })
    }, 100)
}

function initEditor(editorObj, tabData) {
    if (!editorObj)
        return

    if (tabData.key === devEditorKeys.template) {
        emmet(editorObj.editor)
    }
}

function setMonacoEditorFocus(editor) {
    if (!editor)
        editor = editorData[this.editorVue.tabSelectedIndex].editor;

    if (editor)
        editor.focus();
}


export default {
    Init, addEditorTabPage, addMonacoEditor, devEditorKeys, defaultEditorKeys, editorData, setMonacoEditorFocus
}