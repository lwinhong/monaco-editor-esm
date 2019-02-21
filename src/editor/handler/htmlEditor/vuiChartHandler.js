import debounce from 'lodash/debounce'
import editorUtil from './editorUtil'

var openChartCmdId
var chartSettingsValue;
var editorTemplate;
var modelTemplate;
var lastPosition;
var canShowOpenChartWidget;
const canShowOpenChartWidgetKey = "canShowOpenChartWidget"

const getChartCompletion = () => {
    return {
        label: "打开图表设计",
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: { value: "$0" },
        command: {
            id: vuiChartHandler.getOpenChartCmdId(),
            title: "图表设计"
        }
    }
}

/**
    * 初始化图表编辑器命令
    * @param {编辑器} editor 
    * @param {model} model 
    */
function initOpenChartCommand(editor, model) {

    editorTemplate = editor;
    modelTemplate = model;

    var ocs = $("#openChartSettings");
    ocs.bind("click", openChartCmd);

    //按 esc键退出 打开图标 按钮
    canShowOpenChartWidget = editor.createContextKey(canShowOpenChartWidgetKey, false)
    editor.addCommand(monaco.KeyCode.Escape,
        () => showChartSettingwidget(false), canShowOpenChartWidgetKey);

    //添加 打开图表设计器命令
    openChartCmdId = editor.addCommand(0, openChartCmd, '')
    //添加 打开 '打开图标编辑器' widget命令
    // openChartSettingsWidgetCommand = editor.addCommand(0, () => showChartSettingwidget(true, mouseEventTemplate), '!suggestWidgetVisible');

    editor.onDidChangeCursorSelection(cur => {
        lastPosition = cur.selection.getPosition()

        debounce(() =>
            isNeedShowCharttingWidget(model, lastPosition), 1)();
    })

    editor.onMouseDown(function (e) {
        mouseEventTemplate = e
        debounce(() =>
            showChartSettingButton(model, e.target.position, e), 100)()
    })
}

/**
 * 打开图标设计器的命令
 */
function openChartCmd() {
    var position = lastPosition;
    chartSettingsValue = getValue(modelTemplate, position);
    openChartSetting(position);
}

/**
* 打开图标设计器
* @param {当前鼠标位置} position 
*/
function openChartSetting(position) {
    var oldValue = chartSettingsValue;
    showChartSettingwidget(false);

    var result = executeCmdWithValue(cmdData.editChart, oldValue.value);
    if (result) {
        var jsonData = JSON.parse(result);
        if (jsonData.ok) {
            editorTemplate.executeEdits('openChart', [{
                range: selectOldValue(oldValue, position),
                text: jsonData.value,
                forceMoveMarkers: true
            }]);

            // modelTemplate.applyEdits([{
            //     range: selectOldValue(oldValue, position),
            //     text: jsonData.value
            // }]);
        }
    }
}

/**
     * 获取就数据的范围
     * @param {旧数据} oldValue 
     * @param {当前鼠标位置} position 
     */
function selectOldValue(oldValue, position) {
    if (!oldValue || !oldValue.value || $.trim(oldValue.value) === "")
        return monaco.Range.fromPositions(position);

    if (oldValue.startColumn && oldValue.endColumn) {
        var range = {
            startLineNumber: position.lineNumber,
            startColumn: oldValue.startColumn,
            endLineNumber: position.lineNumber,
            endColumn: oldValue.endColumn
        };
        return range;
    }

    var matches = modelTemplate.findMatches(oldValue, true, false, false)
    for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        var r = match.range;
        if (r.startLineNumber === position.lineNumber)
            return r;
    }
    return monaco.Range.fromPositions(position);
}

/**
 * 判断是否需要显示 打开图标编辑器 widget
 * @param {model} model 
 * @param {鼠标位置} position 
 * @param {鼠标事件} mouseEvent 
 */
function showChartSettingButton(model, position, mouseEvent) {

    if (mouseEvent && !mouseEvent.event.leftButton)
        return;

    if (isNeedShowCharttingWidget(model, position)) {
        showChartSettingwidget(true, mouseEvent);
    }
}

function isNeedShowCharttingWidget(model, position) {
    var selection = editorTemplate.getSelection();
    if (selection && selection.startLineNumber && selection.endLineNumber) {
        if (selection.startLineNumber != selection.endLineNumber) {
            showChartSettingwidget(false);
            return;
        }
    }

    var startLineNumber = 1;
    if (position.lineNumber > 10) {
        startLineNumber = position.lineNumber - 10;
    }

    //获取开始倒光标位置的文本
    var text = model.getValueInRange({
        startLineNumber: startLineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
    });
    chartSettingsValue = "";

    var textTrimed = $.trim(text);
    //空白什么都没
    if (textTrimed === "") {
        showChartSettingwidget(false);
        return;
    }

    var substringText = text.substring(text.lastIndexOf("<"));
    var tagMatch = substringText.match(tagStart);
    if (!tagMatch) {
        showChartSettingwidget(false);
        return;
    }
    var tagName = tagMatch[1];
    if (!"vui-chart".equalIgnoreCase(tagName)) {
        showChartSettingwidget(false);
        return;
    }

    var lastAttrName = vuiDataHandler.getLastProp(text + "\"");
    if ("chartSettings".equalIgnoreCase(lastAttrName)) {
        var tokens = monaco.editor.tokenize(textTrimed + "\"", "html");

        var token = tokens[tokens.length - 1];
        if (token.length >= 5) {
            var condition1 = (token[token.length - 1].type === "attribute.value.html" &&
                token[token.length - 2].type === "delimiter.html" &&
                token[token.length - 3].type === "attribute.name.html");

            var condition2 = (token[token.length - 1].type === "attribute.value.html" &&
                token[token.length - 2].type === "" &&
                token[token.length - 3].type === "delimiter.html" &&
                token[token.length - 4].type === "" &&
                token[token.length - 5].type === "attribute.name.html");

            var condition3 = (token[token.length - 1].type === "attribute.value.html" &&
                token[token.length - 2].type === "delimiter.html" &&
                token[token.length - 3].type === "" &&
                token[token.length - 4].type === "attribute.name.html");

            var condition4 = (token[token.length - 1].type === "attribute.value.html" &&
                token[token.length - 2].type === "" &&
                token[token.length - 3].type === "delimiter.html" &&
                token[token.length - 4].type === "attribute.name.html");

            if (condition1 || condition2 || condition3 || condition4) {
                if ("vui-chart".equalIgnoreCase(tagName)) {
                    // showChartSettingwidget(true, mouseEvent);
                    //showChartSettingwidgetByCommand(mouseEvent);
                    return true;
                }
            }
        }
    }
    showChartSettingwidget(false);
    return false;
}
/**
* 显示/隐藏 打开图标编辑器 widget
* @param {显示} show 
* @param {鼠标位置} mouseEvent 
*/
function showChartSettingwidget(show, mouseEvent) {
    canShowOpenChartWidget.set(show);
    var ocs = $("#openChartSettings");
    if (show) {
        ocs.css("top", mouseEvent.event.posy + 10);
        ocs.css("left", mouseEvent.event.posx);
        ocs.show();
    } else {
        ocs.hide();
    }
}

/**
 * 根据指定鼠标位置下的值
 * @param {model} model 
 * @param {鼠标位置} position 
 */
function getValue(model, position) {
    return getValueAtPoint(model, position, true)
}

export default {
    getChartCompletion, getOpenChartCmdId: () => openChartCmdId
}