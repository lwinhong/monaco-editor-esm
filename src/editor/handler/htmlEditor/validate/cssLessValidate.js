
const invalidateChar = ["'", '"', '(', ')', ' ', '~', '+']

export const validateCssHandler = (editorKey, editorData, editorUtil, creatErrorInfo) => {
    try {
        const devResource = editorUtil.getDataSource().getVuiPropValueOptions().devResources
        if (!devResource || devResource.length === 0)
            return
        const model = editorData[editorKey].model

        var msgs = []
        for (const res of devResource) {
            for (const c of res) {
                if ($.inArray(c, invalidateChar) !== -1) { //非法资源名称
                    findMatches(model, res, msgs, creatErrorInfo, editorKey)
                    break
                }
            }
        }
        return msgs
    } catch (error) {
        console.log(error)
    }
    return null
}

const findMatches = (model, source, msgs, creatErrorInfo, editorKey) => {
    var matches = model.findMatches(source, true, false, false)
    if (matches) {
        for (const match of matches) {
            var range = match.range
            msgs.push(creatErrorInfo(getErrorMessage(source), range, editorKey, source))
        }
    }
}

const getErrorMessage = (source) => {
    return `文件资源：“${source}” 存在非法字符! 不能有 单双引号、+ 、~ 、( 、)`
}