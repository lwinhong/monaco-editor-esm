import util from '../../../app/util'

const propReg = /([\w-:\.]+)(\s*=\s*)("[^"]*"|'[^']*')/g
const tagStart = /<([\w-]+)/

function getDataSource() {
    return window.v3global.dataSourceHandler.getDataSource()
}

/**
* 新建一个唯一性code
* @param {} baseName 
* @param {} existCodes 
* @returns {} 
*/
function newUniqueCode(baseName, existCodes) {
    var index = 1
    while (true) {
        if ($.inArray(baseName + index, existCodes) !== -1) {
            index++
            continue
        }
        break
    }
    return baseName + index
}

/**
 * 根据正则获取已存在的编码
 * @param {reg} reg 
 * @param {html代码} htmlString 
 * @param {是否先除移注释代码} isRemoveComments 
 * @param {是否除移code前后的空格} isTrimCode 
 * @param {是否返回code和匹配的原数据} isReturnCodeAndSource 
 */
function getExistCodeCommon(reg, htmlString, isRemoveComments, isTrimCode, isReturnCodeAndSource) {
    var existCodes = []
    if (isReturnCodeAndSource)
        existCodes = {}

    var sourceString = htmlString

    if (isRemoveComments)
        sourceString = util.removeComments(sourceString)
    if (isTrimCode === undefined)
        isTrimCode = true

    while (true) {
        const results = reg.exec(sourceString)
        if (results) {
            const result = results[1]
            const code = isTrimCode ? result.trim() : result
            if (isReturnCodeAndSource) {
                const exist = existCodes[code]
                if (exist)
                    exist.push(results[0])
                else
                    existCodes[code] = [results[0]]
            } else
                existCodes.push(isTrimCode ? result.trim() : result)

            continue
        }
        break
    }
    return existCodes
}

/**
* 获取html片段中最后的属性
* @param {} htmlText 
* @returns {} 
*/
function getLastProp(htmlText) {
    try {
        var lastProp = null
        while (true) {
            var match = propReg.exec(htmlText)
            if (match) {
                lastProp = match[1]
            } else {
                return lastProp
            }
        }
    } catch (e) {
        console.error(e)
    }
    return null
}

/**
 * 获取属性值候选项数据
 * @param {} optionKey 
 * @returns {} 
 */
function getValueOptions(optionKey) {
    if (optionKey) {
        const ds = getDataSource()
        var options = ds.getVuiPropValueOptions()
        if (options) {
            var result = new Array()
            const keys = optionKey.split("|")
            $.each(keys, function (index, obj) {
                const option = options[obj]
                if (option) {
                    result = result.concat(option)
                }
            })
            return result
        }
    }
    return null
}

/**
 * 获取新的事件code
 * @param {} baseName 
 * @param {} existEvents 
 * @returns {} 
 */
function newEventName(baseName) {
    return newUniqueCode(baseName, existEventCodes)
}

/**
 * 匹配html标签
 * @param {匹配文本} text 
 */
function matchTagStart(text) {
    return text.match(tagStart)
}

/************************************************** js 相关处理 *************************************************** */
/**
* 获取所有js函数名称
* @returns {} 
*/
function getAllJsFunctions(editorData, editorKey) {

    /**
     * 获取js行数名称
     * @param {} script 
     * @returns {} 
     */
    function getJsFunctionName(script) {
        if (!script)
            return null

        const newFunction = /(var)(\s+)((?:[a-z][a-z0-9_]*))(\s{0,})(=)(\s{0,})(new)(\s+)(Function)/gi
        const normalFunction = /(function)(\s+)((?:[a-z][a-z0-9_]*))/gi
        const varFunction = /(var)(\s+)((?:[a-z][a-z0-9_]*))(\s{0,})(=)(\s{0,})(function)/gi

        const regexs = [newFunction, normalFunction, varFunction]
        const value = util.removeJsComments(script)

        var functions = []
        $.each(regexs, function (j, regex) {
            while (true) {
                var results = regex.exec(value)
                if (results) {
                    functions.push(results[3].trim())
                } else {
                    break
                }
            }
        })

        return functions
    }

    const editors = [editorData[editorKey.javascript], editorData[editorKey.moduleJavaScript]]
    var result = []
    $.each(editors, function (i, editor) {
        if (editor && editor.editor) {
            const functions = getJsFunctionName(editor.editor.getValue())
            if (functions) 
                result = result.concat(functions)
        }
    })
    return result
}

/************************************************** js 相关处理 END *************************************************** */

/************************************************** 新建 WidgetCode *************************************************** */

const widgetCodeRegGlobal = /widget-code\s{0,}=\s{0,}["']\s{0,}([\w\S-\.]{0,})\s{0,}["']/gi
const handleEventReg = /handleEvent\s{0,}\(\s{0,}'([^<](\w|\s|-)*)'/gi
const emitEventReg = /\$emit\s{0,}\(\s{0,}'([^<](\w|\s|-)*)'/gi

var existWidgetCodes
var existEventCodes

/**
* 获取新的widgetCode
* @param {标签} tag 
* @param {已存在的编码} existCodes 
* @returns {新编码} 
*/
function newWidgetCode(tag, existCodes) {
    if (!tag)
        tag = "vuicontrol"

    if (!existCodes)
        existCodes = getExistWidgetCodes()

    var existControlCodes = getExistWindowControlCodes()
    if (existControlCodes) {
        existCodes = existCodes.concat(existControlCodes)
    }

    return newUniqueCode(divCode + "_" + tag.split("-").join(""), existCodes)
}

/**
 * 获取在窗体中已存在的控件编码
 */
function getExistWindowControlCodes() {
    const ds = getDataSource()
    const existCodesDs = ds.getExistWindowControlCodes()
    return existCodesDs.existControlCodes
}

/**
* 获取所有存在的widgetcode
* @returns {} 
*/
function getExistWidgetCodes(want2Update, isRemoveComments, html) {
    if (want2Update || !existWidgetCodes)
        existWidgetCodes = getExistCodeCommon(widgetCodeRegGlobal, html, isRemoveComments)
    if (!existWidgetCodes)
        existWidgetCodes = []
    return existWidgetCodes
}

function getExistWidgetCodesWithSources(html) {
    return getExistCodeCommon(widgetCodeRegGlobal, html, true, false, true)
}

/**
 * 获取已存在的事件Code
 * @returns {} 
 */
function getExistEventCodes(want2Update, html) {
    if (want2Update || !existEventCodes) {
        existEventCodes = isDevEditorMode()
            ? getExistCodeCommon(emitEventReg, html) : getExistCodeCommon(handleEventReg, html)
    }
    if (!existEventCodes)
        existEventCodes = []
    return existEventCodes
}

/**
* widget-code 属性自动完成数据
* @param {vui标签} tag 
* @param {已存在的widget-code编码} existCodes 
* @returns {} 
*/
function getWidgetCodeProperty(tag) {
    return {
        label: " widget-code",
        kind: monaco.languages.CompletionItemKind.Keyword,
        documentation: "widget-code 全局唯一标识",
        insertText: {
            value: 'widget-code="' + newWidgetCode(tag, existWidgetCodes) + '"$0'
        }
    }
}

/**
 * widget-code 属性值自动完成数据
 * @param {vui标签} tag 
 * @param {已存在的widget-code编码} existCodes 
 * @returns {} 
 */
function getWidgetCodePropertyValue(tag) {
    var newCode = newWidgetCode(tag, existWidgetCodes)
    return {
        label: newCode,
        kind: monaco.languages.CompletionItemKind.Keyword,
        documentation: "widget-code 全局唯一标识",
        insertText: {
            value: newCode
        }
    }
}
/************************************************** 新建 WidgetCode *************************************************** */

/************************************************** vui相关数据获取 *************************************************** */
/**
* 获取指定vui标签的数据
* @param {vui 标签} vuiTag 
* @returns {vuidata {vui{label:"xxx",attributesWithDefaultValue:[]}}} 
*/
function getVuiData(vuiTag) {
    const ds = getDataSource()
    const allTags = ds.getVuiTag()

    var result
    $.each(allTags, function (vui, data) {
        if (vui.equalIgnoreCase(vuiTag)) {
            result = data
            return false
        }
        return true
    })
    return result
}

/**
* 获取vui属性完成数据
* @param {vui数据} vuiData 
* @param {属性编码} propName 
* @returns {属性数据对象} 
*/
function getVuiPropDataExt(vuiData, propName) {
    var result
    $.each(vuiData.attributes, function (prop, data) {
        if (prop.equalIgnoreCase(propName)) {
            result = data
            return false
        }
        return true
    })
    return result
}
/**
 * 获取指定标签和属性名词的属性数据
 * @param {vui标签} vuiTag 
 * @param {属性名称} propName 
 * @returns {数据相关数据} 
 */
function getVuiPropData(vuiTag, propName) {
    var vuiData = getVuiData(vuiTag)
    if (vuiData && vuiData.attributes) {
        var result = getVuiPropDataExt(vuiData, propName)
        if (result)
            return result

        if (propName.indexOf(":") !== -1) {
            result = getVuiPropDataExt(vuiData,
                propName.substring(propName.lastIndexOf(":")));
            if (result)
                return result

            var clearName = propName.substring(propName.lastIndexOf(":") + 1)
            result = getVuiPropDataExt(vuiData, clearName);
            if (result)
                return result
        }
    }
    return null
}

/**
   * 根据vlang的编码获取相应的数据
   * @param {} code 
   * @returns {} 
   */
function getVlangWithCode(code) {
    const ds = getDataSource()
    var vlang = ds.getVlanguage()
    if (vlang) {
        var result = null
        var isExist = vlang[code]
        if (isExist) {
            result = isExist
        } else {
            $.each(vlang, function (com, data) {
                if (com.equalIgnoreCase(code)) {
                    result = data
                    return false
                }
                return true
            })
        }
        return result
    }
}
/************************************************** vui相关数据获取 END *************************************************** */

/************************************************** 根据光标位置获取编辑器中字符数据 *************************************************** */

/**
 * 根据位置获取 位置下的值
 * @param {model} model 
 * @param {位置} position 
 * @param {是否获取属性值} isGetAttributeValue 
 */
function getEditorValueAtPoint(model, position, isGetAttributeValue) {

    var data = getTokensAtLine(position.lineNumber, model);

    var token1Index = 0;
    for (var i = data.tokens1.length - 1; i >= 0; i--) {
        var t = data.tokens1[i];
        if (position.column - 1 >= t.offset) {
            token1Index = i;
            break;
        }
    }

    //var token2Index = 0;
    //for (var ii = (data.tokens2.length >>> 1) ; ii >= 0; ii--) {
    //    if (position.column - 1 >= data.tokens2[(ii << 1)]) {
    //        token2Index = ii;
    //        break;
    //    }
    //}

    //var result = '';

    var tokenText;
    if (token1Index < data.tokens1.length) {

        var lineContent = model.getLineContent(position.lineNumber);
        var tokenStartIndex = data.tokens1[token1Index].offset;
        var tokenEndIndex = token1Index + 1 < data.tokens1.length ? data.tokens1[token1Index + 1].offset : lineContent.length;
        if (isGetAttributeValue) {
            tokenStartIndex = tokenStartIndex + 1;
            tokenEndIndex = Math.max(tokenStartIndex, tokenEndIndex - 1);
        }
        tokenText = lineContent.substring(tokenStartIndex, tokenEndIndex);
    }

    return {
        value: tokenText,
        startColumn: tokenStartIndex + 1,
        endColumn: tokenEndIndex + 1
    };
}

// function getStateBeforeLine(lineNumber, model) {
//     const tokenizationSupport = model._tokens.tokenizationSupport;
//     var state = tokenizationSupport.getInitialState();

//     for (let i = 1; i < lineNumber; i++) {
//         var tokenizationResult = tokenizationSupport.tokenize(model.getLineContent(i), state, 0);
//         state = tokenizationResult.endState;
//     }

//     return state;
// }

function getTokensAtLine(lineNumber, model) {
    var tokenizationSupport = model._tokens.tokenizationSupport;
    var state = tokenizationSupport.getInitialState();

    for (let i = 1; i < lineNumber; i++) {
        var tokenizationResult = tokenizationSupport.tokenize(model.getLineContent(i), state, 0);
        state = tokenizationResult.endState;
    }

    var stateBeforeLine = state;
    var tokenizationResult1 = tokenizationSupport.tokenize(model.getLineContent(lineNumber), stateBeforeLine, 0);
    //var tokenizationResult2 = tokenizationSupport.tokenize2(model.getLineContent(lineNumber), stateBeforeLine, 0);

    return {
        startState: stateBeforeLine,
        tokens1: tokenizationResult1.tokens,
        //tokens2: tokenizationResult2.tokens,
        endState: tokenizationResult1.endState
    };
}

/**
 * 获取当前光标下前50行的html 文本
 * @param {postion} position 
 * @param {model} model 
 * @param {currentWord} currentWord 
 * @returns {LastHtml} 
 */
function getLastHtml(position, model, currentWord, lineCount) {

    lineCount = lineCount || 50
    const startLineNumber = position.lineNumber > lineCount ? position.lineNumber - lineCount : 1
    const endCol = currentWord ? currentWord.endColumn : position.column;

    //获取开始倒光标位置的文本
    const text = model.getValueInRange({
        startLineNumber: startLineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: endCol
    })

    const textTrimed = $.trim(text);
    //空白什么都没
    if (!textTrimed)
        return null

    const substringText = text.substring(text.lastIndexOf("<"))
    return substringText
}

/************************************************** 根据光标位置获取编辑器中字符数据 END *************************************************** */

/**
 * 收集和生成decoration数组
 * @param {monaco.range} range 
 * @param {鼠标提示信息} hoverMsg 
 * @param {decoration数组} newDecorations 
 */
const pushDecorations = (range, hoverMsg, newDecorations) => {
    newDecorations.push({
        range: range,
        options: {
            inlineClassName: "squiggly-error",
            hoverMessage: { value: hoverMsg },
            afterContentClassName: "inline-widgetcode-illegal",
            linesDecorationsClassName: "lineDecoration-error"
        }
    })
}

/**
 * 将Decorations设置到编辑器
 * @param {新的Decorations} newDecorations 
 */
const updateDecorations = (newDecorations, oldDecorations, editor) => {
    if (newDecorations.length > 0) {
        return editor.deltaDecorations(oldDecorations, newDecorations)
    } else {
        return editor.deltaDecorations(oldDecorations, [])
    }
}

export default {
    getVuiData, getVuiPropData, getValueOptions, newWidgetCode,
    getExistWidgetCodes, getExistEventCodes, getDataSource, newEventName,
    getWidgetCodeProperty, getLastProp, getAllJsFunctions, getWidgetCodePropertyValue,
    getEditorValueAtPoint, getTokensAtLine, getLastHtml, matchTagStart,
    getVlangWithCode, getExistWidgetCodesWithSources, getExistWindowControlCodes,
    pushDecorations, updateDecorations
}