const invalidateChar = ["'", '"', '(', ')', ' ', '~', '+']
const oldDecorations = {}

export const validateCssHandler = (editorKey, editorData, editorUtil, creatErrorInfo) => {
    var newDecorations = []
    const findMatches = (model, source, msgs, creatErrorInfo, editorKey, tokens) => {
        var matches = model.findMatches(source, true, false, false)
        if (matches) {
            for (const match of matches) {
                var range = match.range
                if (!isComment(tokens, range.startLineNumber, range.startColumn)) {
                    var error = getErrorMessage(source)
                    msgs.push(creatErrorInfo(error, range, editorKey, source))
                    editorUtil.pushDecorations(range, error, newDecorations)
                }
            }
        }
    }

    try {
        const devResource = editorUtil.getDataSource().getVuiPropValueOptions().devResources
        if (!devResource || devResource.length === 0)
            return
        const model = editorData[editorKey].model
        const tokens = monaco.editor.tokenize(model.getValue(), "less")
        var msgs = []
        for (const res of devResource) {
            for (const c of res) {
                if ($.inArray(c, invalidateChar) !== -1) { //非法资源名称
                    findMatches(model, res, msgs, creatErrorInfo, editorKey, tokens)
                    break
                }
            }
        }
        return msgs
    } catch (error) {
        console.log(error)
    } finally {
        var old = editorUtil.updateDecorations(newDecorations, oldDecorations[editorKey] || [], editorData[editorKey].editor)
        oldDecorations[editorKey] = old
    }
    return null
}

/**
 * 验证匹配的文本是否已注释
 * @param {当前编辑器所有标记} tokens 
 * @param {验证的起点行} startLineNumber 
 * @param {验证起点列} startColumn 
 */
const isComment = (tokens, startLineNumber, startColumn) => {
    if (tokens && tokens.length >= startLineNumber) {
        var targetToten = tokens[startLineNumber - 1]
        for (var j = targetToten.length - 1; j >= 0; j--) {
            var token = targetToten[j]
            if (token.offset <= startColumn &&
                (token.type === "comment.less")) {
                return true
            }
        }
    }
    return false
}

const getErrorMessage = (source) => {
    return `文件资源：“${source}” 存在非法字符! 不能有空格、单双引号、+ 、~ 、( 、)`
}

