import eslintHandler from '../../eslint/eslintHandler'
import debounce from 'lodash/debounce'
import { eventBus } from '../../../../app/event-bus'
import { htmlValidate, eslintValidate } from './htmlValidate'

var isValidating //标识是否正在验证
var inputTimeoutTimer //计时器
const validateHandler = (editor, model, parentVue, editorObj) => {
    if (!editor) {
        console.log("validateHandler：editor 对象 null")
        return null
    }

    const devEditorKeys = editorObj.devEditorKeys
    const defaultEditorKeys = editorObj.defaultEditorKeys
    const cssValidateEditors = [defaultEditorKeys.css, defaultEditorKeys.moduleCss, devEditorKeys.style, devEditorKeys.themeLess, devEditorKeys.varLess]
    const htmlViladateEditors = [devEditorKeys.template, defaultEditorKeys.html]
    const scriptValidateEditors = [devEditorKeys.script, defaultEditorKeys.moduleJavascript, defaultEditorKeys.javascript]

    const flow = parentVue.$refs.messageFlow
    const errorData = flow.errorData
    const suggestData = flow.suggestData

    const editorData = editorObj.editorData
    eslintHandler.init(editorData)

    //内容改变
    editor.onDidChangeModelContent(function (e) {
        if (!isValidating)
            triggerValidate(parentVue.tabSelectedIndex)
    })

    /**
     * 触发数据校验
     * @param {编辑器key} editorKey 
     */
    const triggerValidate = (editorKey) => {

        //触发值改变之前，清除重置之前的计时器
        if (inputTimeoutTimer)
            window.clearInterval(inputTimeoutTimer)

        inputTimeoutTimer = window.setTimeout(function () {
            debounce(() => {
                isValidating = true
                validationAll(editorKey)
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
        const editorData = editorObj.editorData
        let model = editorData[editorKey].model
        let editor = editorData[editorKey].editor
        return { model, editor }
    }

    /********************** html 验证信息 **********************/

    /**
     * 验证html
     * @param {是否设置到信息区域} isSetToFlow 
     */
    const validateHtml = (isSetToFlow) => {

        const editorKey = isDevEditorMode() ? devEditorKeys.template : defaultEditorKeys.html
        const editorData = getEditorData(editorKey)

        var msgs = htmlValidate(editorData.model, editorData.editor, editorKey, editorObj)
        if (msgs && isSetToFlow)
            setMessageFlowData(msgs, editorKey)

        return msgs
    }

    /********************** html 验证信息END **********************/

    /********************** script 信息验证 **********************/
    /**
     * 验证js
     */
    const validateJavaScript = (editorKey) => {
        var msgs = []
        const editoyKeys = [defaultEditorKeys.moduleJavascript, defaultEditorKeys.javascript]
        if (isDevEditorMode()) {
            editorKey = devEditorKeys.script
            const editorData = getEditorData(editorKey)
            msgs = eslintValidate(editorData.model, editorData.editor, editorKey, devEditorKeys)
            editoyKeys.push(editorKey)
        }

        var tmpMsgs = checkAndAddErrorInfo(editoyKeys)
        if (tmpMsgs)
            msgs = msgs.concat(tmpMsgs)

        if (msgs.length > 0)
            setMessageFlowData(msgs, editorKey)
    }
    /********************** script 信息验证 END **********************/

    /********************** css 信息验证 **********************/

    /**
     * 验证css/less
     */
    const validateCss = () => {
        const editorKeys = isDevEditorMode() ?
            [devEditorKeys.style, devEditorKeys.themeLess, devEditorKeys.varLess] :
            [defaultEditorKeys.css, defaultEditorKeys.moduleCss]

        if (isDevEditorMode()) {

        }

        var msgs = checkAndAddErrorInfo(editorKeys)
        if (msgs)
            setMessageFlowData(msgs)
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
        var obj = { errorMsgCount: 0, suggestMsgCount: 0 }
        if (parentVue) {
            obj.errorMsgCount = errorData.length
            obj.suggestMsgCount = suggestData.length
        }
        eventBus.$emit('updateMessageCount', obj)
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
            var editor = editorData[editorKeys[i]]
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
                validateHtml(true)
                validateJavaScript()
            }
            else {
                if ($.inArray(editorKey, htmlViladateEditors) !== -1)
                    validateHtml(true)
                else if ($.inArray(editorKey, scriptValidateEditors) !== -1)
                    validateJavaScript(editorKey)
                else if ($.inArray(editorKey, cssValidateEditors) !== -1)
                    validateCss()
            }

        } catch (error) {
            console.error(error)
        } finally {
            isValidating = false
            updateFootbarMsg()

            if (saveCallBack && typeof saveCallBack === 'function')
                saveCallBack()
        }
    }

    return validationAll
}

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

export default { validateHandler, creatErrorInfo }