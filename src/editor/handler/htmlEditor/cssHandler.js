/**获取url资源自动完成数据
 * @return {urls}
 */
const getUrlResourcesComps = () => {
    const urls = []
    const ds = window.global.dataSourceHandler.getDataSource()

    const options = ds.getVuiPropValueOptions()
    if (!options)
        return urls

    var resources = options.resources
    if (!resources)
        return urls

    const buildItems = function (sources, opFormat) {
        $.each(sources, function (i, data) {
            var result = String.format(opFormat, data)
            urls.push({
                label: " " + result,
                kind: monaco.languages.CompletionItemKind.Keyword,
                documentation: result,
                insertText: {
                    value: result
                }
            })
        })
    }

    const existCodes = ds.getExistWindowControlCodes()
    if (existCodes) {
        const res = "url(\"${getResource('" + existCodes.currentComponent + "',%1)}\")"
        buildItems(resources, res)
    }

    //自定义div还要加上share资源
    if (isDevEditorMode()) {
        var devRes = "url(\"%1\")"
        resources = options.devResources
        if (resources)
            buildItems(resources, devRes)
    }
    return urls
}

const autoCompleteHandler = (model, position) => {
    //var lineCount = model.getLineCount()
    var startLineNumber = 1
    if (position.lineNumber > 50) {
        startLineNumber = position.lineNumber - 50
    }
    //获取开始倒光标位置的文本
    var text = model.getValueInRange({
        startLineNumber: startLineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
    })

    var textTrimed = $.trim(text)
    var substringText = textTrimed.substring(textTrimed.lastIndexOf(";"))
    //获取开始倒光标位置的文本tokens
    var tokens = monaco.editor.tokenize(substringText, "css")

    var megerTotens = new Array()
    $.each(tokens, function (index, obj) {
        megerTotens = megerTotens.concat(obj)
    })
    var token1 = megerTotens[megerTotens.length - 1]
    if (megerTotens.length > 2) {
        var token2 = megerTotens[megerTotens.length - 2]

        if (/background\s{0,}:/gi.test(substringText) || /background-image\s{0,}:/gi.test(substringText)) {
            //第一个
            if ((token1.type === '' && token2.type === 'delimiter.bracket.css')) {
                return getUrlResourcesComps()
            }

            if (token1.type === 'delimiter.css' || (token1.type === '' && token2.type === 'delimiter.css')
                || (token1.type === 'attribute.value.css') || token1.type === 'tag.css') {
                return getUrlResourcesComps()
            }
        }
    }
    return []
}

export const cssHandler = () => {
    if (!monaco) {
        console.log("csshander: 找不到monaco示例")
        return
    }

    monaco.languages.registerCompletionItemProvider("css", {
        triggerCharacters: [":"],
        provideCompletionItems: autoCompleteHandler
    })
}