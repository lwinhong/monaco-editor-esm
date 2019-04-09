export const cmdData = {
    save: "Save",
    saveAndClose: "SaveAndClose",
    saveAs: "SaveAs",
    openPreview: "OpenPreview",
    deploy: "Deploy",
    openImport: "OpenImport",
    editorChanged: "EditorChanged",
    onLoaded: "Loaded",
    reloadEvent: "ReloadEvent",
    f1Help: "F1Help",
    saveViewState: "SaveViewState",
    runBackup: "RunBackup",
    openValidateRule: "OpenValidateRule",
    editChart: "EditChart",
    showChartButton: "ShowChartButton",
    cacheChangedValue: "CacheChangedValue",
    reloadEvent: "ReloadEvent",
    openSourceSelector: "OpenSourceSelector",//选择构件资源
    openDevShareSelector: "OpenDevShareSelector",//选择share资源
    generateTemplate: "GenerateTemplate",//生成模板
    applyTemplate: "ApplyTemplate",//应用模板

    /**以下为编辑器内部交互命令 */
    executeCmd: "executeCmd",
    dataLoaded: "dataLoaded",
    wordWrap: "wordWrap",
    showPreviewForm: "showPreviewForm",
    setPreview: "setPreview",
    editorIndexChanged: "editorIndexChanged",
    updateCursorPosition: "updateCursorPosition",
    updateMessageCount: "updateMessageCount",
    insertValue: "insertValue",
    insertValueAsSnippet: "insertValueAsSnippet",
    setPosition: "setPosition",
    reLayoutEditor: "reLayoutEditor",
    showMessageFlow: "showMessageFlow"
}

export const devEditorKeys =
{
    template: 'template',
    script: 'script',
    style: 'style',
    themeLess: 'themeLess',
    varLess: 'varLess'
}

export const defaultEditorKeys =
{
    html: 'html',
    javascript: 'javascript',
    css: 'css',
    moduleCss: 'moduleCss',
    moduleJavascript: 'moduleJavascript'
}

class AllCommand {
    static devEditorKeys() { return devEditorKeys }
    static defaultEditorKeys() { return defaultEditorKeys }
    static cmdData() { return cmdData }
}

export default AllCommand