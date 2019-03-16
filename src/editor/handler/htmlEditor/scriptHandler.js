
const buildItems = () => {

    const sources = window.v3global.dataSourceHandler.getDataSource().getVuiPropValueOptions();
    if (!sources || !sources.scriptResource)
        return

    const urls = new Array()
    $.each(sources.scriptResource, function (i, data) {
        urls.push({
            label: " " + data,
            kind: monaco.languages.CompletionItemKind.Keyword,
            documentation: data,
            insertText: {
                value: "'" + data + "';"
            }
        })
    })
    return urls
}

const autoCompleteHandler = (model, position) => {
    var lineContont = model.getLineContent(position.lineNumber)
    lineContont = lineContont.substring(0, position.column)
    const tokens = monaco.editor.tokenize(lineContont, "javascript")

    const lineTokens = tokens[position.lineNumber - 1]
    if (lineTokens && lineTokens.length > 1) {
        const last1 = lineTokens[lineTokens.length - 1]
        const last2 = lineTokens[lineTokens.length - 2]
        if (last1.type === "" && last2.type === "keyword.js" || last2.type === "keyword.js") {
            const text = $.trim(lineContont)
            if (text.endsWith("from")) {
                return buildItems()
            }
        }
    }
    return [];
}

export const scriptHandler = editor => {
    if (!monaco) {
        console.log("scriptHandler: 找不到monaco示例")
        return
    }

    monaco.languages.registerCompletionItemProvider("javascript", {
        provideCompletionItems: autoCompleteHandler
    })
}