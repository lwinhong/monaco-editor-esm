import editorUtil from "./editorUtil"

/**
 * 生成hover数据对象
 * @param {标题} title 
 * @param {内容} value 
 * @returns {} 
 */
function getHoverObject(title, value) {
    return {
        contents: [
            { value: String.format("**%1**", title) },
            {
                value: '```html\n' + value + "\n\n更多详细：Shift + F1" + '\n```'
            }
        ]
    }
}

/**
 * 获取标签提示信息
 * @param {标签} tag 
 * @returns {} 
 */
function getVuiHoverData(tag) {
    var vui = editorUtil.getVuiData(tag);
    if (vui) {
        var title = vui.label
        var value = vui.desc + "\n\n" + vui.example
        return getHoverObject(title, value)
    }
    return null
}

/**
 * 获取属性hover数据
 * @param {标签} tag 
 * @param {属性名称} prop 
 * @returns {} 
 */
function getVuiPropHoverData(tag, prop) {
    var propData = editorUtil.getVuiPropData(tag, prop)
    if (propData) {
        var value = propData.desc + "\n" + propData.example
        return getHoverObject(propData.name, value)
    } else {
        //如果当前属性在vui标签中没有就找公共的
        const ds = editorUtil.getDataSource()
        const commonOptions = ds.getVlanguage()
        if (commonOptions) {
            var p = commonOptions[prop]
            if (p)
                return getHoverObject(p.name, p.desc)
        }
    }
    return null
}

function hoverHandler(model, position) {
    const word = model.getWordAtPosition(position)
    if (!word)
        return null

    const tokensAtLine = editorUtil.getTokensAtLine(position.lineNumber, model).tokens1
    if (!tokensAtLine) 
        return null

    var result = null
    for (var i = tokensAtLine.length - 1; i >= 0; i--) {
        var token = tokensAtLine[i]
        if (position.column - 1 >= token.offset) {
            //属性
            if (token.type === "attribute.name.html") {
                const substringText = editorUtil.getLastHtml(position, model, word)
                const startTag = editorUtil.matchTagStart(substringText)
                if (startTag) {
                    const prop = editorUtil.getLastProp(substringText + '=""')
                    result = getVuiPropHoverData(startTag[1], prop || word.word)
                }
            } else if (token.type === "tag.html") {//标签
                result = getVuiHoverData(word.word)
            }
            break
        }
    }

    return result
}

export default hoverHandler