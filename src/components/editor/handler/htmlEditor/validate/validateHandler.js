import eslintHandler from '../../eslint/eslintHandler'
import debounce from 'lodash/debounce'
import { htmlValidate, eslintValidate } from './htmlValidate'
import { validateCssHandler } from './cssLessValidate'
import { cmdData } from '../../../../../app/command';

var isValidating //标识是否正在验证
var inputTimeoutTimer //计时器
var devEditorKeys
var defaultEditorKeys
var cssValidateEditors
var htmlViladateEditors
var scriptValidateEditors

var flow
var errorData
var suggestData
var editorData
var editorObj
var parentVue
/**
 * 初始化验证信息
 * @param {编辑器vue示例} pVue 
 * @param {所有编辑器示例对象} editorObjs 
 */
const validateInit = (pVue, editorObjs) => {
    editorObj = editorObjs
    parentVue = pVue

    devEditorKeys = editorObj.devEditorKeys
    defaultEditorKeys = editorObj.defaultEditorKeys
    cssValidateEditors = [defaultEditorKeys.css, defaultEditorKeys.moduleCss, devEditorKeys.style, devEditorKeys.themeLess, devEditorKeys.varLess]
    htmlViladateEditors = [devEditorKeys.template, defaultEditorKeys.html]
    scriptValidateEditors = [devEditorKeys.script, defaultEditorKeys.moduleJavascript, defaultEditorKeys.javascript]

    flow = parentVue.$refs.messageFlow
    errorData = flow.errorData
    suggestData = flow.suggestData
    editorData = editorObj.editorData

    eslintHandler.init(editorData)
}

/**
 * 处理验证
 * @param {编辑器key} editorKey 
 */
const doValidate = (editorKey, beforeValidate, afterValidate) => {
    // if (!isValidating)
    //     triggerValidate(editorKey, beforeValidate, afterValidate)

    if (beforeValidate && typeof beforeValidate === 'function')
        beforeValidate()

    isValidating = true
    validationAll(editorKey)

    if (afterValidate && typeof afterValidate === 'function')
        afterValidate()
    editorObj.vuiHandler.afterValidationAll(isDevEditorMode()
        ? editorData[devEditorKeys.template].model
        : editorData[defaultEditorKeys.html].model)
}

/**
 * 触发数据校验
 * @param {编辑器key} editorKey 
 */
const triggerValidate = (editorKey, beforeValidate, afterValidate) => {

    //触发值改变之前，清除重置之前的计时器
    if (inputTimeoutTimer)
        window.clearInterval(inputTimeoutTimer)

    inputTimeoutTimer = window.setTimeout(() => {
        debounce(() => {
            if (beforeValidate && typeof beforeValidate === 'function')
                beforeValidate()

            isValidating = true
            validationAll(editorKey)

            if (afterValidate && typeof afterValidate === 'function')
                afterValidate()
            editorObj.vuiHandler.afterValidationAll(isDevEditorMode()
                ? editorData[devEditorKeys.template].model
                : editorData[defaultEditorKeys.html].model)
        }, 1)()
    }, 999)
}

/**
 * 根据编辑器key获取编辑器相关数据
 * @param {编辑器key} editorKey 
 */
const getEditorData = (editorKey) => {
    let model = editorData[editorKey].model
    let editor = editorData[editorKey].editor
    return { model, editor }
}

/********************** html 验证信息 **********************/

/**
 * 验证html
 * @param {是否设置到信息区域} isSetToFlow 
 */
const validateHtml = () => {

    const editorKey = isDevEditorMode() ? devEditorKeys.template : defaultEditorKeys.html
    const editorData = getEditorData(editorKey)

    var msgs = htmlValidate(editorData.model, editorData.editor, editorKey, editorObj)
    if (msgs)
        setMessageFlowData(msgs, editorKey)
}

/********************** html 验证信息END **********************/

/********************** script 信息验证 **********************/
/**
 * 验证js
 */
const validateJavaScript = (editorKey) => {
    const editorKeys = [defaultEditorKeys.moduleJavascript, defaultEditorKeys.javascript]
    var msgs

    if (isDevEditorMode()) {
        editorKey = devEditorKeys.script
        const editorData = getEditorData(editorKey)
        msgs = eslintValidate(editorData.model, editorData.editor, editorKey, devEditorKeys)
        editorKeys.push(editorKey)
        if (msgs)
            setMessageFlowData(msgs, editorKey)
    }
    for (const key of editorKeys) {
        msgs = checkAndAddErrorInfo([key])
        if (msgs)
            setMessageFlowData(msgs, key)
    }
}
/********************** script 信息验证 END **********************/

/********************** css 信息验证 **********************/

/**
 * 验证css/less
 */
const validateCss = (editorKey) => {
    const editorKeys = isDevEditorMode() ?
        [devEditorKeys.style, devEditorKeys.themeLess, devEditorKeys.varLess] :
        [defaultEditorKeys.css, defaultEditorKeys.moduleCss]

    var msgs
    if (isDevEditorMode()) {
        const vCss = (editorKey) => {
            msgs = validateCssHandler(editorKey, editorData, editorObj.vuiHandler.editorUtil, creatErrorInfo)
            if (msgs)
                setMessageFlowData(msgs)
        }
        if (editorKey) {
            vCss(editorKey)
        }
        else {
            vCss(devEditorKeys.themeLess)
            vCss(devEditorKeys.varLess)
        }
    }

    const vSystemCss = (editorKey) => {
        msgs = checkAndAddErrorInfo([editorKey])
        if (msgs)
            setMessageFlowData(msgs)
    }
    if (editorKey) {
        vSystemCss(editorKey)
    } else {
        for (const key of editorKeys)
            vSystemCss(key)
    }
}

/********************** css 信息验证 END **********************/

/********************** 验证结果填充到界面 **********************/

/**
 * 设置信息到底部信息显示区域
 * @param {要设置的信息数据} messages 
 * @param {编辑器key} editorKey 
 */
const setMessageFlowData = (messages, editorKey) => {
    try {
        if (messages) {
            for (let index = 0; index < messages.length; index++) {
                const msg = messages[index]
                msg.moduleKey = msg.moduleKey || editorKey
                msg.moduleName = editorData[msg.moduleKey].text
                if (monaco.MarkerSeverity.Error === msg.severity) {
                    errorData.push(msg)
                } else if (monaco.MarkerSeverity.Hint === msg.severity) {
                    suggestData.push(msg)
                }
            }
        }
    } catch (error) {
        console.error("设置验证错误信息到界面异常" + error)
    }
}

/**
 * 清除提示、错误信息
 * @param {编辑器key} editorKey 
 * @param {数据类型 error or suggest} dataType 
 */
const clearMessageFlowData = (editorKey, dataType) => {
    const datas = [errorData, suggestData]

    for (let index = 0; index < datas.length; index++) {
        const data = datas[index]
        if (editorKey) {
            for (var i = data.length - 1; i >= 0; i--) { //校验指定的编辑器之前删除该编辑器之前校验的数据
                if (data[i].moduleKey === editorKey)
                    data.splice(i, 1)
            }
        }
        else {
            if (!dataType || dataType === 'error')
                data.splice(0, data.length)
            if (!dataType || dataType === 'suggest')
                data.splice(0, data.length)
        }
    }
}

/**
 * 更新状态栏下的错误、建议信息
 */
const updateFootbarMsg = () => {
    var obj = { errorMsgCount: errorData.length, suggestMsgCount: suggestData.length }
    //window.v3global.executeCmd(cmdData.updateMessageCount, obj)
    parentVue.setErrorMessageAction(obj)
}

/**
 * 检查指定的编辑器中错误，并把错误信息添加到错误列表
 * @param {编辑key集合} editorKeys 
 * @returns {检查结果 true/false} 
 */
const checkAndAddErrorInfo = (editorKeys) => {
    var error = []
    for (var i = 0; i < editorKeys.length; i++) {
        var editorName = editorKeys[i]
        var editor = editorData[editorName]
        if (editor && editor.model && editor.model._decorations) {
            $.each(editor.model._decorations, function (index, d) {
                if (d.options.className === "squiggly-error") {
                    error.push(creatErrorInfo(d.options.hoverMessage.value, d.range, editorName))
                }
            })
        }
    }
    return error
}

/********************** 验证结果填充到界面 END **********************/

/**
 * 验证用户输入
 * @param {编辑器编码} editorKey
 * @param {回调函数} saveCallBack
 * @returns {验证通过true 失败 false} 
 */
const validationAll = (editorKey, saveCallBack) => {
    clearMessageFlowData(editorKey)

    try {
        if (!editorKey) { // 验证所有
            validateHtml()
            validateJavaScript()
            validateCss()
        }
        else {
            if ($.inArray(editorKey, htmlViladateEditors) != -1)
                validateHtml()
            else if ($.inArray(editorKey, scriptValidateEditors) != -1)
                validateJavaScript(editorKey)
            else if ($.inArray(editorKey, cssValidateEditors) != -1)
                validateCss(editorKey)
        }

    } catch (error) {
        console.error("验证用户输入异常:" + error)
    } finally {
        isValidating = false
        updateFootbarMsg()

        if (saveCallBack && typeof saveCallBack === 'function')
            saveCallBack()
    }
}

/**
 * 新建错误信息
 * @param {信息文本} message 
 * @param {位置范围} range 
 * @param {模块} module 
 * @param {错误信息来源} source 
 */
const creatErrorInfo = (message, range, module, source) => {
    return {
        severity: monaco.MarkerSeverity.Error,
        source,
        message,
        startLineNumber: range.startLineNumber,
        startColumn: range.startColumn,
        endLineNumber: range.endLineNumber,
        endColumn: range.endColumn,
        position: range,
        moduleKey: module
    }
}

export default { doValidate, validateInit, creatErrorInfo, validationAll }