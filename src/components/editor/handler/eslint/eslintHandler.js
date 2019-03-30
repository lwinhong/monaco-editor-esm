import eslintState from "./eslint-state"
import { getRuleUrl } from "./eslint-state"
import v3Config from "./v3-config"
import debounce from "lodash/debounce"

const suggestRules = v3Config.suggest
const playgroundState = new eslintState()
//var editorData = {}

const init = (editorDataMap) => {
    //editorData = editorDataMap
}

/**
 * 更新eslint信息（同步）
 * @param {monaco editor} editor 
 */
const invalidateEslint = (lintValue) => {
    if (lintValue) {
        var msg = playgroundState.lint(lintValue)
        return msg
    }
    return null
}

/**
 * 更新eslint信息（异步）
 * @param {monaco editor} editor 
 * @param {回调函数} callBack 
 */
const invalidateEslintDelay = (editor, callBack) => {
    debounce(() => {
        var msg = invalidateEslint(editor);
        if (callBack)
            callBack(msg)
    }, 667)()
}

/**
 * Ensure that a given value is a positive value.
 * @param {number|undefined} value The value to check.
 * @param {number} defaultValue The default value which is used if the `value` is undefined.
 * @returns {number} The positive value as the result.
 */
function ensurePositiveInt(value, defaultValue) {
    return Math.max(1, (value !== undefined ? value : defaultValue) | 0)
}

/**
 * Convert a message of ESLint to a marker of MonacoEditor.
 * @param {ESLintMessage} message The message to convert.
 * @returns {monaco.editor.IMarkerData} The marker data.
 */
function messageToMarker(message) {
    const startLineNumber = ensurePositiveInt(message.line - 1, 1)
    const startColumn = ensurePositiveInt(message.column, 1)
    const endLineNumber = ensurePositiveInt(message.endLine - 1, startLineNumber)
    const endColumn = ensurePositiveInt(message.endColumn, startColumn + 1)

    var severity = monaco.MarkerSeverity.Error
    var source = "ESLint"
    var msg = message.message
    if (suggestRules && $.inArray(message.ruleId, suggestRules) >= 0) {
        severity = monaco.MarkerSeverity.Hint
        source = null
        msg += ` (${message.ruleId || "FATAL"})`;
    }

    return {
        severity: severity,
        source: source,
        message: msg,
        ruleId: message.ruleId,
        ruleUrl: getRuleUrl(message.ruleId),
        startLineNumber,
        startColumn,
        endLineNumber,
        endColumn,
        position: {
            startLineNumber: startLineNumber,
            startColumn: startColumn,
            endLineNumber: endLineNumber,
            endColumn: endColumn
        }
    }
}

/**
 * Update the markers of a given editor.
 * @param {monaco.editor.IStandaloneEditor} editor The editor to update.
 * @param {ESLintMessage[]} messages The messages of new markers.
 * @returns {void}
 */
function updateMarkers(editor, messages) {
    const model = editor.getModel()
    const id = editor.getId()
    const markers = buildMarkers(messages)

    monaco.editor.setModelMarkers(model, id, markers)
    return markers
}

/**
 * eslint msg to monaco.editor markers
 * @param {ESLintMessage[]} messages 
 */
function buildMarkers(messages) {
    const markers = messages.map(messageToMarker)
    return markers
}

/**
 * 修正（格式化）编码
 * @param {要格式化的编码} lintValue 
 */
const lintAndFixed = (lintValue) => {
    if (lintValue) {
        var result = playgroundState.lintAndFixed(lintValue)
        return result
    }
    return null
}

export default {
    init,
    invalidateEslint,
    invalidateEslintDelay,
    updateMarkers,
    lintAndFixed
}
