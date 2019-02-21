import editorUtil from './editorUtil'
import debounce from 'lodash/debounce'
import chartHandler from './vuiChartHandler'

const widgetCodeReg = /widget-code\s{0,}=\s{0,}["']\s{0,}([\w\S-\.]+)\s{0,}["']/i
const tagEnd = /<\/([\w-\s]+)>/
const tagStart = /<([\w-]+)/
const triggerSuggestCommand = { id: 'editor.action.triggerSuggest', title: 123 }

var editorObj
var isTriggerByBrackets = false

export const vuiIntelliSense = (editor, editorsObj) => {
    if (!editor) {
        console.log('vuiIntelliSense: 必须提供 monaco-editor 示例.')
        return
    }
    editorObj = editorsObj

    editor.onDidChangeModelContent(function (e) {
        isTriggerByBrackets = e.changes[0].text === '<';
    })

    monaco.languages.registerHoverProvider("html", {
        provideHover: hoverHandler
    })

    // triggerCharacters: [" ", "<", "=", "\""],
    monaco.languages.registerCompletionItemProvider("html", {
        triggerCharacters: ["<", "=", "\""],
        provideCompletionItems: autoCompleteHandler
    })
}

/*********** vui ******** */
function autoCompleteHandler(model, position) {

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
    });

    var textTrimed = $.trim(text)
    //空白什么都没
    if (textTrimed === "")
        return createVuiCompletions(isTriggerByBrackets, model)

    //获取开始倒光标位置的文本tokens
    var tokens = monaco.editor.tokenize(textTrimed, "html")

    //将所有的tokens当作一行来处理
    var megerTotens = new Array()
    $.each(tokens, function (index, obj) {
        megerTotens = megerTotens.concat(obj)
    });

    var token1 = megerTotens[megerTotens.length - 1]
    //如果不是html 就不用做处理
    if (token1.language !== "html")
        return []

    var substringText = text.substring(text.lastIndexOf("<"))
    //在结束符后面 空格(</tag>)
    if (tagEnd.test(substringText)) {
        return createVuiCompletions(isTriggerByBrackets, model)
    }

    //在结尾的标签里面空格 </vui 空格 > || </ 空格 vui>
    if (substringText.startsWith("</")) {
        return []
    }

    //在标签的第一个结束符后面 eg:<button >这里</button>
    if ($.trim(substringText).endsWith(">") && token1.type === "delimiter.html") {
        return createVuiCompletions(isTriggerByBrackets, model)
    }

    var tagMatch = substringText.match(tagStart)
    var tagName = ""
    if (tagMatch)
        tagName = tagMatch[1]
    var widgetCode = tagName
    var isExistWidgetCode = false
    var wcodeReg = substringText.match(widgetCodeReg)
    if (wcodeReg) {
        widgetCode = wcodeReg[1]
        isExistWidgetCode = true
    }

    //在标签后面输入eg: <button 这里空格 
    if (substringText.endsWith(" ") && token1.type === "tag.html") {
        return createPropCompletions(tagName, widgetCode, isExistWidgetCode, model)
    }

    if (megerTotens.length > 2) {
        var token2 = megerTotens[megerTotens.length - 2]
        var token3 = megerTotens[megerTotens.length - 3]

        //在标签后面输入eg: <button 这里输入字符 
        if (token1.type === "attribute.name.html" && token2.type === "" && token3.type === "tag.html") {
            return createPropCompletions(tagName, widgetCode, isExistWidgetCode, model)
        }

        //在属性 a="这里" 里面直接输入字符
        if ((token1.type === "" && token2.type === "delimiter.html" && token3.type === "attribute.name.html") ||
            (token1.type === "attribute.name.html" && token2.type === "" && token3.type === "delimiter.html")) {
            return createPropValueCompletions(tagName, substringText, "", widgetCode, model)
        }

        // 在属性后面输入如  eg:<button a="b" 这里
        if ((token1.type === "attribute.value.html" &&
            token2.type === "delimiter.html" &&
            token3.type === "attribute.name.html") ||
            (token1.type === "attribute.name.html" &&
                token2.type === "" &&
                token3.type === "attribute.value.html")) {

            return createPropCompletions(tagName, widgetCode, isExistWidgetCode, model)
        }
    }

    return createVuiCompletions(isTriggerByBrackets, model)
}

/**
* vui 标签自动完成数据
* @param {是否 < 触发的} isFromBrackets 
* @returns {标签自动完成数据} 
*/
function createVuiCompletions(isFromBrackets, model) {

    var comletions = []
    const ds = editorUtil.getDataSource()
    const vuis = ds.getVuiTag()
    if (!vuis)
        return comletions

    const existCodes = editorUtil.getExistWidgetCodes(false, true)

    $.each(vuis, function (vui, vuiData) {
        var insertText;
        var code = editorUtil.newWidgetCode(vui, existCodes);
        var soruce = vuiData.autoCompleteSource;
        if (soruce) {
            soruce = String.format(soruce, code);
            if (isFromBrackets)
                soruce = soruce.substring(1);
            insertText = soruce;
        } else {
            insertText = (isFromBrackets ? "" : "<") + vui;
            //元数据存在widget-code才加上
            if (vuiData.attributes && vuiData.attributes["widget-code"])
                insertText += ' widget-code="' + code + '"';
            insertText += "></" + vui + ">";
        }
        var vui = {
            label: " " + vui,
            kind: monaco.languages.CompletionItemKind.Keyword,
            documentation: vuiData.label,
            insertText: {
                value: insertText
            }
        };
        if ("true".equalIgnoreCase(vuiData.triggerSuggest)) {
            //完成之后要执行的命令，这里是继续提示
            vui.command = triggerSuggestCommand
        }
        comletions.push(vui)
    })
    return comletions
}

/**
* vui 属性自动完成数据
* @param {标签} tag 
* @param {是否已经包含了widgetCode} isExistWidgetCode 
* @returns {ui 属性自动完成数据} 
*/
function createPropCompletions(tag, widgetCode, isExistWidgetCode, model) {
    var props = new Array()

    createVuiPropCompletions(tag, widgetCode, props)
    createVlanuageCompletions(widgetCode, props)

    if (!isExistWidgetCode)
        props.push(editorUtil.getWidgetCodeProperty(tag))

    return props
}

/**
 * 生成vui属性自动完成数据
 * @param {vui标签} tag 
 * @param {widgetcode} widgetCode 
 * @param {自动完成属性集合} props 
 */
function createVuiPropCompletions(tag, widgetCode, props) {
    const vuiData = editorUtil.getVuiData(tag)
    const eixstEvenCodes = editorUtil.getExistEventCodes()

    if (!vuiData || !vuiData.attributes)
        return

    $.each(vuiData.attributes, function (attr, propData) {
        if (attr === "widget-code")
            return

        var insertText;
        if (propData.insertText !== "") {
            insertText = propData.insertText
        } else {
            insertText = attr + '="' + propData.defaultValue + '$0"'
        }

        if (propData.valueType === "event") {
            var tmp = (widgetCode + "_" + attr).replace(/-/g, "")
            insertText = "v-on:" + String.format(insertText, editorUtil.newEventName(tmp, eixstEvenCodes))
            if (IsDevEditorMode()) {
                insertText = insertText.replace(/handleEvent/, "\\$emit")
            }
        }

        var prop = {
            label: " " + attr,
            kind: monaco.languages.CompletionItemKind.Keyword,
            documentation: propData.description,
            insertText: { value: insertText }
        }

        if ("vui-chart".equalIgnoreCase(tag) && "chartSettings".equalIgnoreCase(attr)) {
            // prop.command = {
            //     id: vuiChartHandler.getOpenChartCmdId(),
            //     title: "打开图表设计"
            // }
        } else if ("true".equalIgnoreCase(propData.triggerSuggest)) {
            prop.command = triggerSuggestCommand
        }

        props.push(prop)
    })
}

/**
 * 生成vlang属性自动完成数据
 * @param {*} props 
 */
function createVlanuageCompletions(widgetCode, props) {
    const ds = editorUtil.getDataSource()
    const commons = ds.getVlanguage()
    if (!commons)
        return

    $.each(commons, function (com, p) {
        var insertValue = ""
        if (p.insertText && p.insertText !== "") {
            if (com === "v-on:click") {
                var insertText = p.insertText
                if (IsDevEditorMode()) {
                    insertText = insertText.replace(/handleEvent/, "\\$emit")
                }
                var tmp = (widgetCode + "_click").replace(/-/g, "")
                insertValue = String.format(insertText, editorUtil.newEventName(tmp))
            } else {
                insertValue = p.insertText
            }
        }
        if (insertValue === "")
            insertValue = com + "=\"${1:}\" "
        var propCommon = {
            label: " " + com,
            kind: monaco.languages.CompletionItemKind.Keyword,
            documentation: com,
            insertText: {
                value: insertValue
            }
        }
        if ("true".equalIgnoreCase(p.triggerSuggest)) {
            propCommon.command = triggerSuggestCommand
        }
        props.push(propCommon)
    })
}


function createPropValueCompletions(tagName, htmlText, insertSupplement, widgetCode) {
    const propName = editorUtil.getLastProp(htmlText + "\"")
    if (!propName)
        return

    var options = null
    const propData = editorUtil.getVuiPropData(tagName, propName)
    if (propData) {
        options = editorUtil.getValueOptions(propData.valueOptions)
    } else {
        //如果当前属性在vui标签中没有就找公共的
        const ds = editorUtil.getDataSource()
        const commonOptions = ds.getVlanguage()
        if (commonOptions && commonOptions[propName]) {
            const source = commonOptions[propName].source
            options = editorUtil.getValueOptions(source)
            //如果是事件，则new一个propData，这个为了下面生成call
            if (source === "eventmode")
                propData = { valueType: "event" }
            else if (source.indexOf("resources") !== -1) {
                propData = { valueType: "resources" }
            }
        } else if (propName === "src") {
            options = getValueOptions("devResources")
            propData = { valueType: "resources" }
        }
    }

    //如果是事件,生成js中的call('aa')
    if (propData && propData.valueType === "event" && options) {
        if (IsDevEditorMode()) {
            options.splice(0, options.length)
            options.push("\\$emit('%1')")
        } else {
            var functions = editorUtil.getAllJsFunctions(editorObj.editorData, editorObj.defaultEditorKeys);
            if (functions) {
                $.each(functions, function (index, data) {
                    options.push(`call('${data}')`)
                });
            }
        }
    }

    var props = []
    if ("vui-chart".equalIgnoreCase(tagName) && "chartSettings".equalIgnoreCase(propName)) {
        props.push(chartHandler.getChartCompletion())
    }

    if (options && options.length > 0) {
        $.each(options, function (index, option) {
            if (insertSupplement && insertSupplement !== "") {
                option = String.format(insertSupplement, option)
            } else {
                if (propData) {
                    if (propData.valueType === "event") {
                        var split = propName.split(':')
                        var tmp = (widgetCode + "_" + split[split.length - 1]).replace(/-/g, "")
                        option = String.format(option, editorUtil.newEventName(tmp))
                    }
                } else if (propName === "v-for") {
                    option = "rd in " + option
                }
            }
            var propCommon = {
                label: option,
                kind: monaco.languages.CompletionItemKind.Keyword,
                documentation: option,
                insertText: { value: option }
            }
            props.push(propCommon)
        })
    }

    if (props.length > 0)
        return props

    if ("widget-code".equalIgnoreCase(propName)) {
        props.push(editorUtil.getWidgetCodePropertyValue(tagName))
    }

    return props
}

/**
 * 在验证用户输入数据之后触发
 * @param {editor model} model 
 */
function afterValidationAll(model) {
    debounce(() => {
        try {
            var html = model.getValue();
            editorUtil.getExistWidgetCodes(true, false, html)
            editorUtil.getExistEventCodes(true, html)
        } catch (error) {
            console.error("html验证之后，加载widgetCodes或者eventCodes异常：" + error)
        }
    }, 1)()
}

/************************ */

/*********** hover ******** */
function hoverHandler(model, position) {
    var title = 'titltlt123456'
    var value = 'valualaula'
    return {
        contents: [
            { value: `**${title}**` },
            {
                value: '```html\n' + value + "\n\n更多详细：Shift + F1" + '\n```'
            }
        ]
    };
}
/************************ */
/*********** 公共方法 ******** */




/************************** */

export default {
    afterValidationAll
}