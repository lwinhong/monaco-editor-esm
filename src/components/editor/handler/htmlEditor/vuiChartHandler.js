import editorUtil from './editorUtil'
import { debounceWrapper } from '../../../../app/util'
import { cmdData } from '../../../../app/command'

const canShowOpenChartWidgetKey = "canShowOpenChartWidget"

/**
 * 获取打开图表设计自动完成项
 */
const getChartCompletion = (openChartCmdId) => {
    return {
        label: "打开图表设计",
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        insertText: "$0",
        command: {
            id: openChartCmdId,
            title: "图表设计"
        }
    }
}

/**
 * 根据指定鼠标位置下的值
 * @param {model} model 
 * @param {鼠标位置} position 
 */
function getValue(model, position) {
    return editorUtil.getEditorValueAtPoint(model, position, true)
}

/**
  * 获取就数据的范围
  * @param {旧数据} oldValue 
  * @param {当前鼠标位置} position 
  */
function selectOldValue(oldValue, position) {
    if (!oldValue || !oldValue.value || $.trim(oldValue.value) === "")
        return monaco.Range.fromPositions(position)

    if (oldValue.startColumn && oldValue.endColumn) {
        let range = new monaco.Range(position.lineNumber, oldValue.startColumn, position.lineNumber, oldValue.endColumn)
        return range
    }

    let matches = this.model.findMatches(oldValue, true, false, false)
    for (let i = 0; i < matches.length; i++) {
        const match = matches[i]
        let r = match.range
        if (r.startLineNumber === position.lineNumber)
            return r
    }
    return monaco.Range.fromPositions(position)
}

class ChartHandler {

    constructor(editor, model, vue) {
        this.editor = editor
        this.model = model
        this.parentVue = vue
        // this.initOpenChartCommand()
    }

    initOpenChartCommand() {
        let _this = this

        let ocs = $("#openChartSettings")
        ocs.bind("click", () => _this.openChartCmd())

        //按 esc键退出 ‘打开图表’ 按钮
        this.canShowOpenChartWidget = this.editor.createContextKey(canShowOpenChartWidgetKey, false)
        this.editor.addCommand(monaco.KeyCode.Escape,
            () => _this.showChartSettingwidget(false), canShowOpenChartWidgetKey)

        //添加 打开图表设计器命令
        this.openChartCmdId = this.editor.addCommand(monaco.KeyCode.F9 | monaco.KeyCode.Alt, () => _this.openChartCmd(), '')

        let onDidChangeCursorSelection = debounceWrapper(args => {
            let e = args[0]
            try {
                _this.lastPosition = e.selection.getPosition()
                _this.isNeedShowCharttingWidget(_this.lastPosition)
            }
            catch (error) {
                console.log("图表：光标改变，判断是否需要显示图表weiget异常->" + error)
            }
        }, 200)

        let onMouseDown = debounceWrapper(args => {
            let e = args[0]
            if (e.target.detail != "editor.contrib.quickOpenEditorWidget" && e.event.leftButton)
                _this.showChartSettingButton(_this.model, e.target.position, e)
        }, 150)

        this.editor.onDidChangeCursorSelection(onDidChangeCursorSelection)
        this.editor.onMouseDown(onMouseDown)
    }

    /**
     * 打开图标设计器的命令
     */
    openChartCmd() {
        let position = this.lastPosition
        this.openChartSetting(position)
    }

    /**
     * 打开图标设计器
     * @param {当前鼠标位置} position 
     */
    openChartSetting(position) {
        let oldValue = this.chartSettingsValue
        this.showChartSettingwidget(false)

        window.v3global.executeCmdToWinformReturn(cmdData.editChart, oldValue.value).then(result => {
            if (result) {
                let jsonData = JSON.parse(result)
                if (jsonData.ok) {
                    this.editor.executeEdits('openChart', [{
                        range: selectOldValue(oldValue, position),
                        text: jsonData.value,
                        forceMoveMarkers: true
                    }])

                    // modelTemplate.applyEdits([{
                    //     range: selectOldValue(oldValue, position),
                    //     text: jsonData.value
                    // }]);
                }
            }
        })

    }

    /**
     * 判断是否需要显示 打开图标编辑器 widget
     * @param {model} model 
     * @param {鼠标位置} position 
     * @param {鼠标事件} mouseEvent 
     */
    showChartSettingButton(model, position, mouseEvent) {
        if (mouseEvent && !mouseEvent.event.leftButton)
            return

        try {
            if (this.isNeedShowCharttingWidget(position)) {
                this.showChartSettingwidget(true, mouseEvent)
            }
        }
        catch (error) {
            console.log("图表：判断是否需要显示 打开图标编辑器 widget异常->" + error)
        }
    }

    /**
     * 显示/隐藏 打开图标编辑器 widget
     * @param {显示} show 
     * @param {鼠标位置} mouseEvent 
     */
    showChartSettingwidget(show, mouseEvent) {
        this.canShowOpenChartWidget.set(show)
        let ocs = $("#openChartSettings")
        if (show) {
            ocs.css("top", mouseEvent.event.posy + 10)
            ocs.css("left", mouseEvent.event.posx)
            ocs.show()
        } else {
            ocs.hide()
        }
    }

    isNeedShowCharttingWidget(position) {
        if (!position)
            return false

        let selection = this.editor.getSelection()
        if (selection && selection.startLineNumber && selection.endLineNumber) {
            if (selection.startLineNumber != selection.endLineNumber) {
                this.showChartSettingwidget(false)
                return false
            }
        }

        this.chartSettingsValue = ""

        let offset = this.model.getOffsetAt(position)
        let itemLast = this.parentVue.getNearestNode()(offset)

        if (itemLast && itemLast.tag && itemLast.tag == "vui-chart") {
            let attr = this.parentVue.getNearestAttribute()(itemLast, offset)
            if (attr && attr.name == "chartSettings") {
                if (attr.start <= offset && attr.end >= offset) {
                    this.chartSettingsValue = attr.value
                    return true
                }
            }
        }

        this.showChartSettingwidget(false)
        return false
    }

    getOpenChartCmdId() {
        return this.openChartCmdId
    }
    getChartCompletion() {
        return getChartCompletion(this.openChartCmdId)
    }
}


/**
 * 输出
 */
export default ChartHandler