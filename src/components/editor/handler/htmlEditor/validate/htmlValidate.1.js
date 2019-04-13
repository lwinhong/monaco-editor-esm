import eslintHandler from '../../eslint/eslintHandler'
// import util from '../../../../app/util'
// const vueTempCompiler = require("vue-template-compiler");
// const htmlparser = require('htmlparser2');

/********************** eslint 验证 ****************** */
const getLintValue = (model, devEditorKeys, editorKey) => {
    var lintValue = model.getValue()

    if (editorKey === devEditorKeys.script)
        lintValue = "<script>\n " + lintValue + "\n </script>"
    else if (editorKey === devEditorKeys.template)
        lintValue = "<template>\n " + lintValue + "\n </template>"

    return lintValue
}

const eslintValidatePrivate = (model, editor, devEditorKeys, editorKey) => {
    try {
        var lintValue = getLintValue(model, devEditorKeys, editorKey)
        const eslintMsg = eslintHandler.invalidateEslint(lintValue)
        const afterMarker = eslintHandler.updateMarkers(editor, eslintMsg)
        return afterMarker
    } catch (error) {
        console.error('eslintValidate:' + error)
    }
    return null
}

export const eslintValidate = (model, editor, editorKey, devEditorKeys) => {
    //自定义div的template和script才验证eslint
    if (devEditorKeys && (devEditorKeys.template === editorKey || devEditorKeys.script === editorKey))
        return eslintValidatePrivate(model, editor, devEditorKeys, editorKey)
    return null
}
/********************** eslint 验证 END ****************** */

/********************** wigetCode 验证 ****************** */
const widgetCodeReg = /^(?!_)(?!.*?_$)[A-Za-z][a-zA-Z0-9_]*$/i
// var oldDecorations = []
// var newDecorations
var errorData = []

const checkWidgetCode = (model, editor, editorKey, editorObj) => {
    errorData.splice(0, errorData.length)
    try {
        let nodes = editorObj.parentVue.getHtmlEditorNodesSameLevel()
        if (!nodes)
            return errorData

        let currentWidgetCodeAttrs = {}
        //循环验证是否合法
        nodes.forEach(node => {
            if (!node.tag)
                return
            if (node.rawAttrsMap) {
                let wc = node.rawAttrsMap['widget-code']
                if (wc) {
                    if (currentWidgetCodeAttrs[wc.value])
                        currentWidgetCodeAttrs[wc.value].push(wc)
                    else
                        currentWidgetCodeAttrs[wc.value] = [wc]

                    checkWidgetCodePrivate(wc, editorKey, model)
                }
            }
            checkCanNotExistTag(node, model)
        });

        //验证重复
        let existWidgetCodes = checkAndGetRepeatWidgetCode(currentWidgetCodeAttrs, editorKey, editorObj.vuiHandler.editorUtil, model)
        //将当前存在的widgetcode放到vux中
        editorObj.parentVue.setWidgetCodesAction(existWidgetCodes)
        monaco.editor.setModelMarkers(model, editor.getId(), errorData)
    } catch (error) {
        console.error(error)
    } finally {
        return errorData
    }
}

const checkWidgetCodePrivate = (widgetCodeAttrObj, editorKey, model) => {
    let code = widgetCodeAttrObj.value

    //var hoverMessage = ""
    var errorMessage = ""
    var isPass = true

    if (!code || code.trim() === "") {//编码空
        hoverMessage = errorMessage = "无效的编码，编码不能为空"
        isPass = false
    }
    else if (code.length > 64) {//超过64位
        var tmp = "无效的编码%1，编码不能超过64个字符"
        //hoverMessage = String.format(tmp, "")
        errorMessage = String.format(tmp, "[" + code + "]")
        isPass = false
    } else {
        if (!widgetCodeReg.test(code)) { //不合法
            var tmp1 = "无效的编码%1，只能包含字母(A-Z,a-z)、数字(0-9)、下划线(_)。\r\n只能以字母开头，且不能以下划线结尾。"
            //hoverMessage = String.format(tmp1, "")
            errorMessage = String.format(tmp1, "[" + code + "]")
            isPass = false
        }
    }
    if (!isPass) {
        // let startPostion = model.getPositionAt(widgetCodeAttrObj.start)
        // let endPosition = model.getPositionAt(widgetCodeAttrObj.end)
        // let range = new monaco.Range(startPostion.lineNumber, startPostion.column, endPosition.lineNumber, endPosition.column)
        addErrorInfo(errorMessage, editorKey, widgetCodeAttrObj.start, widgetCodeAttrObj.end, model)
    }
}

const checkAndGetRepeatWidgetCode = (widgetCodeAttrs, editorKey, editorUtil, model) => {
    let currentExist = Object.keys(widgetCodeAttrs)
    if (currentExist.length == 0)
        return null

    let existControlCodes = editorUtil.getExistWindowControlCodes()
    for (let index = 0; index < currentExist.length; index++) {
        const existCode = currentExist[index]
        const existNodes = widgetCodeAttrs[existCode]

        if (existNodes.length > 1) {
            existNodes.forEach(node => {
                addErrorInfo(`widget-code [${existCode}] 重复`, editorKey, node.start, node.end, model)
            })
        }
        else if ($.inArray(existCode, existControlCodes) !== -1) {
            let node = existNodes[0]
            addErrorInfo(`widget-code [${existCode}] 在窗体中已被占用`, editorKey, node.start, node.end, model)
        }
    }

    return currentExist
}

/**
 * 检查是否存在不能支持的标签
 * @param {标签节点} node 
 */
const checkCanNotExistTag = (node, model) => {
    if (node.tag == "script") {
        addErrorInfo("template下不能有script标签", "template下不能有script标签", editorKey, node.start, node.end, model)
    }
}

/********************** wigetCode 验证 END ****************** */

function addErrorInfo(message, module, startOffset, endOffset, model) {

    let start = model.getPositionAt(startOffset)
    let end = model.getPositionAt(endOffset)
    let range = new monaco.Range(start.lineNumber, start.column, end.lineNumber, end.column)

    errorData.push({
        severity: monaco.MarkerSeverity.Error,
        // source,
        message,
        startLineNumber: range.startLineNumber,
        startColumn: range.startColumn,
        endLineNumber: range.endLineNumber,
        endColumn: range.endColumn,
        position: range,

        moduleKey: module
    })
}

export const htmlValidate = (model, editor, editorKey, editorObj) => {
    var msgs = []

    //dev模式，验证eslint
    if (isDevEditorMode()) {
        const eslintMsgs = eslintValidate(model, editor, editorKey, editorObj.devEditorKeys)
        if (eslintMsgs && eslintMsgs.length > 0)
            msgs = msgs.concat(eslintMsgs)
    }

    // 验证wigetcode
    var widgetCodeMsgs = checkWidgetCode(model, editor, editorKey, editorObj)
    if (widgetCodeMsgs && widgetCodeMsgs.length > 0)
        msgs = msgs.concat(widgetCodeMsgs)

    return msgs
}

/********************** wigetCode 验证 backup ****************** */

/**
 * 检查并收集重复的widgetcode
 * @returns {}
 */
// const checkAndGetRepeatWidgetCode1 = (existWidgetCodes, editorUtil) => {
//     if (!existWidgetCodes || existWidgetCodes.length === 0)
//         return null

//     var repeatCodes = new Array()
//     //1.判断在当前页面是否重复
//     $.each(existWidgetCodes, function (code, source) {
//         if (source && source.length > 1 && code)
//             repeatCodes.push(code)
//     })
//     if (repeatCodes.length > 0)
//         return repeatCodes

//     //2.判断在当前窗体是否重复
//     const existControlCodes = editorUtil.getExistWindowControlCodes()
//     if (existControlCodes) {
//         $.each(existWidgetCodes, function (code, source) {
//             if ($.inArray(code, existControlCodes) !== -1) {
//                 repeatCodes.push(code)
//             }
//         })
//     }

//     return repeatCodes.length > 0 ? repeatCodes : null
// }

//匹配错误信息
// const matcheAndAddError = (code, hoverMsg, error, editorKey, tokens, model) => {
//     var isAdded = false
//     const setErrorInfo = (matheSource) => {
//         var matches = model.findMatches(matheSource, true, false, false)
//         $.each(matches, function (i, match) {
//             var range = match.range
//             if (validateMathResult(tokens, range.startLineNumber, range.startColumn)) {
//                 pushDecorations(range, hoverMsg, newDecorations)
//                 addErrorInfo(error, range, editorKey)
//                 isAdded = true
//             }
//         })
//     }
//     if (code && code.length > 0) {
//         var dist = code.distinct1()
//         $.each(dist, function (i, o) {
//             setErrorInfo(o)
//         })
//     }
//     return isAdded
// }

/**
  * 验证匹配的信息是否有效
  * 这里用来确定匹配的是否为注释的信息
  * @param {} tokens
  * @param {} startLineNumber
  * @param {} startColumn
  * @returns {}
  */
// const validateMathResult = (tokens, startLineNumber, startColumn) => {
//     if (tokens && tokens.length > startLineNumber) {
//         var targetToten = tokens[startLineNumber - 1]
//         for (var j = targetToten.length - 1; j >= 0; j--) {
//             var token = targetToten[j]
//             if (token.offset <= startColumn &&
//                 (token.type === "comment.html" || token.type === "comment.content.html"))
//                 return false
//         }
//     }
//     return true
// }

/**
 * 收集和生成decoration数组
 * @param {monaco.range} range
 * @param {鼠标提示信息} hoverMsg
 * @param {decoration数组} newDecorations
 */
// const pushDecorations = (range, hoverMsg, newDecorations) => {
//     newDecorations.push({
//         range: range,
//         options: {
//             inlineClassName: "squiggly-error",
//             hoverMessage: { value: hoverMsg },
//             afterContentClassName: "inline-widgetcode-illegal",
//             linesDecorationsClassName: "lineDecoration-error"
//         }
//     })
// }

/**
 * 将Decorations设置到编辑器
 * @param {新的Decorations} newDecorations
 */
// const updateDecorations = (newDecorations, oldDecorations, editor) => {
//     if (newDecorations.length > 0) {
//         return editor.deltaDecorations(oldDecorations, newDecorations)
//     } else {
//         return editor.deltaDecorations(oldDecorations, [])
//     }
// }
