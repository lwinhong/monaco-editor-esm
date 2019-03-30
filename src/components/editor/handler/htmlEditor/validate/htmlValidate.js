import eslintHandler from '../../eslint/eslintHandler'
// import util from '../../../../app/util'
// const vueTempCompiler = require("vue-template-compiler");
const htmlparser = require('htmlparser2');

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
var oldDecorations = []
var newDecorations
var errorData

const checkWidgetCode = (model, editor, editorKey, editorObj) => {

    let editorUtil = editorObj.vuiHandler.editorUtil
    let templateScript = model.getValue();
    const existWidgetCodes = editorUtil.getExistWidgetCodesWithSources(templateScript)
    const tokens = monaco.editor.tokenize(templateScript, "html")
    newDecorations = []
    errorData = []

    //widgetCode不合法的
    $.each(existWidgetCodes, function (code, source) {
        var hoverMessage = ""
        var errorMessage = ""
        var isPass = true

        if (!code || code.trim() === "") {//编码空
            hoverMessage = errorMessage = "无效的编码，编码不能为空"
            isPass = false
        }
        else if (code.length > 64) {//超过64位
            var tmp = "无效的编码%1，编码不能超过64个字符"
            hoverMessage = String.format(tmp, "")
            errorMessage = String.format(tmp, "[" + code + "]")
            isPass = false
        } else {
            if (!widgetCodeReg.test(code)) { //不合法
                var tmp1 = "无效的编码%1，只能包含字母(A-Z,a-z)、数字(0-9)、下划线(_)。\r\n只能以字母开头，且不能以下划线结尾。"
                hoverMessage = String.format(tmp1, "")
                errorMessage = String.format(tmp1, "[" + code + "]")
                isPass = false
            }
        }

        if (!isPass)
            matcheAndAddError(source, hoverMessage, errorMessage, editorKey, tokens, model)
    })

    //widgetCode验证重复
    var repearResult = checkAndGetRepeatWidgetCode(existWidgetCodes, editorUtil)
    if (repearResult && repearResult.length > 0) {
        var errorMsg = "widget-code [%1] 重复"
        $.each(repearResult, function (index, code) {
            matcheAndAddError(existWidgetCodes[code], "编码重复,请修正", String.format(errorMsg, code), editorKey, tokens, model)
        })
    }

    //验证不能出现在template下的标签
    let canNotExistTags = checkCanNotExistTag(templateScript)
    if (canNotExistTags.length > 0) {
        matcheAndAddError(canNotExistTags, "template下不能有script标签", "template下不能有script标签", editorKey, tokens, model)
    }

    //将错误装饰添加编辑器
    oldDecorations = updateDecorations(newDecorations, oldDecorations, editor)

    return errorData
}

/**
 * 检查并收集重复的widgetcode
 * @returns {} 
 */
const checkAndGetRepeatWidgetCode = (existWidgetCodes, editorUtil) => {
    if (!existWidgetCodes || existWidgetCodes.length === 0)
        return null

    var repeatCodes = new Array()
    //1.判断在当前页面是否重复
    $.each(existWidgetCodes, function (code, source) {
        if (source && source.length > 1 && code)
            repeatCodes.push(code)
    })
    if (repeatCodes.length > 0)
        return repeatCodes

    //2.判断在当前窗体是否重复
    const existControlCodes = editorUtil.getExistWindowControlCodes()
    if (existControlCodes) {
        $.each(existWidgetCodes, function (code, source) {
            if ($.inArray(code, existControlCodes) !== -1) {
                repeatCodes.push(code)
            }
        })
    }

    return repeatCodes.length > 0 ? repeatCodes : null
}

//匹配错误信息
const matcheAndAddError = (code, hoverMsg, error, editorKey, tokens, model) => {
    var isAdded = false
    const setErrorInfo = (matheSource) => {
        var matches = model.findMatches(matheSource, true, false, false)
        $.each(matches, function (i, match) {
            var range = match.range
            if (validateMathResult(tokens, range.startLineNumber, range.startColumn)) {
                pushDecorations(range, hoverMsg, newDecorations)
                addErrorInfo(error, range, editorKey)
                isAdded = true
            }
        })
    }
    if (code && code.length > 0) {
        var dist = code.distinct1()
        $.each(dist, function (i, o) {
            setErrorInfo(o)
        })
    }
    return isAdded
}

/**
  * 验证匹配的信息是否有效
  * 这里用来确定匹配的是否为注释的信息
  * @param {} tokens 
  * @param {} startLineNumber 
  * @param {} startColumn 
  * @returns {} 
  */
const validateMathResult = (tokens, startLineNumber, startColumn) => {
    if (tokens && tokens.length > startLineNumber) {
        var targetToten = tokens[startLineNumber - 1]
        for (var j = targetToten.length - 1; j >= 0; j--) {
            var token = targetToten[j]
            if (token.offset <= startColumn &&
                (token.type === "comment.html" || token.type === "comment.content.html"))
                return false
        }
    }
    return true
}

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

/********************** wigetCode 验证 END ****************** */

/********************** 不能有script节点 验证 END ****************** */

const checkCanNotExistTag = (templateScript) => {
    let canNotExistTag = []
    let parser = new htmlparser.Parser({
        onopentag: (tagName, attrs) => {
            if (tagName == "script") {
                if (canNotExistTag.indexOf("<script") == -1)
                    canNotExistTag.push("<script")
            }
        }
    }, { decodeEntities: true, lowerCaseTags: false })
    parser.write(templateScript)
    parser.end()


    // var handler = new htmlparser.DomHandler(function (error, dom) {
    //     if (error) {
    //         throw new error()
    //     } else {
    //         //console.log(dom[2].childs);
    //     }

    // });
    // parser = new htmlparser.Parser(handler);
    // parser.write(templateScript);
    // parser.done();

    // var aa = handler.dom

    return canNotExistTag
}

/********************** 不能有script节点 验证 END ****************** */

function addErrorInfo(message, range, module, source) {
    errorData.push({
        severity: monaco.MarkerSeverity.Error,
        source,
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

        // let script = model.getValue()
        // let parser = new htmlparser.Parser({
        //     onopentag: (tagName, attrs,a,b) => {
        //         //this.analyzeDomNode(tagName, attrs);

        //         if(tagName == "script"){
        //             console.log("不能有script")

        //         }
        //     }
        // }, { decodeEntities: true, lowerCaseTags: false });
        // parser.write(script);
        // parser.end();

        //let rs = vueTempCompiler.parseComponent("<template>"+script+"</template>");

    }

    // 验证wigetcode
    var widgetCodeMsgs = checkWidgetCode(model, editor, editorKey, editorObj)
    if (widgetCodeMsgs && widgetCodeMsgs.length > 0)
        msgs = msgs.concat(widgetCodeMsgs)

    return msgs
}