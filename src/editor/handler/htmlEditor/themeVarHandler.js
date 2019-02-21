import util  from '../../../app/util'

const reg = /(@[\w-_]+)\s*\:/gi

const newCompletionItem = (label, documentation, insertText) => {
    var prop = {
        label: label,
        kind: monaco.languages.CompletionItemKind.Variable,
        documentation: documentation,
        insertText: { value: insertText }
    }
    return prop
}

/**
 * 添加var变量提示数据
 * @param {智能提示集合} items 
 */
const appendVarItems = (items, editorData, devEditorKeys) => {
    if (!editorData || !devEditorKeys)
        return
    if (!editorData.hasOwnProperty(devEditorKeys.varLess))
        return

    const model = editorData[devEditorKeys.varLess].model
    if (!model)
        return
    var varString = model.getValue()
    if (!varString)
        return

    varString = util.removeJsComments(varString)
    while (true) {
        const results = reg.exec(varString)
        if (results) {
            var prop = newCompletionItem(results[1], results[1], results[1])
            items.push(prop)
            continue
        }
        break
    }
}

/**
 * 添加dev 的share 资源提示数据
 * @param {智能提示集合} items 
 */
const applendDevResrouceItems = items => {
    window.global.dataSourceHandler.getDataSource().getVuiPropValueOptions(props => {
        if (!props)
            return;
        if (props && props.hasOwnProperty("devResources")) {
            var resources = props["devResources"]
            if (resources) {
                $.each(resources, function (i, d) {
                    var prop = newCompletionItem(d, d, d)
                    items.push(prop)
                })
            }
        }
    });
}

/**
 * 添加构件中全局主题变量提示数据
 * @param {智能提示集合} items 
 */
const appendComponentThemeVars = items => {
    window.global.dataSourceHandler.getDataSource().getThemeVars(data => {
        if (!data)
            return
        if (data) {
            $.each(data, function (i, d) {
                var prop = newCompletionItem(d, d, d)
                items.push(prop)
            })
        }
    })
}

export const themeVarHandler = (editor, editorData, devEditorKeys) => {
    if (!editor) {
        console.log('themeVarHandler: 必须提供 monaco-editor 示例.')
        return
    }

    if (!monaco) {
        console.log('themeVarHandler: monaco-editor 还没加载完成.')
        return
    }

    monaco.languages.registerCompletionItemProvider("less", {
        triggerCharacters: ["@"],
        provideCompletionItems: function (model, position) {
            var lineContent = model.getLineContent(position.lineNumber)
            var trimedContent = lineContent.substring(0, position.column - 1)

            var items = []

            //简单的判断当前光标是否以@结尾
            if (trimedContent && trimedContent.trim().endsWith('@')) {
                //VarLess变量
                appendVarItems(items, editorData, devEditorKeys)
                //dev资源变量
                applendDevResrouceItems(items)
                //构件中全局主题变量
                appendComponentThemeVars(items)
            }

            return items
        }
    })
}