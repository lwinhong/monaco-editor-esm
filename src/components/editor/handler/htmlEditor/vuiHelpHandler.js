import editorUtil from './editorUtil'

export const vuiHelp = (editor, model) => {
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.F1, function () {
        const helpKey = tryToGetSelectedHelpKey(editor, model)
        //executeCmdWithValue(cmdData.f1Help, helpKey);
        console.log(helpKey)
    })
}

/**
 * 获取vui标签的helpkey
 * @param {标签名称} tag 
 * @returns {helpkey} 
 */
function getVuiHelpKey(tag) {
    if (tag) {
        const allVui = editorUtil.getVuiData(tag)
        if (allVui) {
            const result = "helpType=vui&helpKey=" + tag
            return result
        }
    }
    return null
}

/**
* 获取鼠标所在的helpky
* @param {} editor 
* @param {} model 
* @returns {} 
*/
function tryToGetSelectedHelpKey(editor, model) {
    const position = editor.getPosition()
    const wordAtPosition = model.getWordAtPosition(position)
    if (!wordAtPosition)
        return null

    var result = null
    var currentWord = wordAtPosition.word

    const tokensAtLine = editorUtil.getTokensAtLine(position.lineNumber, model).tokens1
    for (var i = tokensAtLine.length - 1; i >= 0; i--) {
        const token = tokensAtLine[i]
        if (position.column - 1 < token.offset)
            continue

        if (token.type === "attribute.value.html") { //属性值
            const tagName1 = tryToGetTag(position, model, wordAtPosition)
            result = getVuiHelpKey(tagName1)
        } else if (token.type === "attribute.name.html") {//属性
            var isExist = editorUtil.getVlangWithCode(currentWord)
            if (!isExist) {
                currentWord = tryToGetLastAttr(position, model, wordAtPosition)
                if (currentWord) {
                    isExist = editorUtil.getVlangWithCode(currentWord)
                }
            }
            if (isExist)
                result = `helpType=vlang&helpKey=${currentWord}`

            //如果找不到v指令的属性，就试着找该属性所在的标签名称
            if (!result) {
                const tagName = tryToGetTag(position, model, wordAtPosition)
                result = getVuiHelpKey(tagName)
                if (result) {
                    result += `&attr=${currentWord}`
                }
            }

        } else if (token.type === "tag.html") {
            result = getVuiHelpKey(currentWord)
        }
        break
    }
    return result
}

/**
* 获取最后一个属性
* @param {} position 
* @param {} model 
* @param {} currentWord 
* @returns {} 
*/
function tryToGetLastAttr(position, model, currentWord) {
    const substringText = editorUtil.getLastHtml(position, model, currentWord)
    if (!substringText)
        return null

    var prop = editorUtil.getLastProp(substringText + '=""')
    if (prop)
        prop = prop.trimStr(":", "left")
    return prop
}

/**
 * 获取标签名称
 * @param {} position 
 * @param {} model 
 * @returns {} 
 */
function tryToGetTag(position, model, currentWord) {

    const substringText = editorUtil.getLastHtml(position, model, currentWord)
    if (!substringText)
        return null

    const tagMatch = editorUtil.matchTagStart(substringText)
    if (tagMatch) {
        return tagMatch[1]
    }

    return null
}