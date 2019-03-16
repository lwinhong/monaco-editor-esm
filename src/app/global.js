import util from "./util"
import { eventBus } from "./event-bus"
import ds from "../dataSource/dataSourceHandler"
import { cmdData } from "./command";

const getQuery = () => {
    const qs = util.getQueryString()
    if (qs) {
        var tmp = qs["mode"]
        if (tmp) editorMode = tmp
        tmp = qs["token"]
        if (tmp) divEditorToken = tmp
        tmp = qs["form"]
        if (tmp) formType = tmp
        tmp = qs["divFlag"]
        if (tmp) divFlag = tmp
        tmp = qs["editorShowType"]
        if (tmp) editorShowType = tmp
        console.log("global-divFlag:" + divFlag + "\n mode:" + editorMode)
    }
}
getQuery()

var appVue
const init = async (vueObj) => {
    appVue = vueObj
    await ds.initDs(divFlag)
    executeCmdFromWinform("dataLoaded")
}

/**
 * 执行发到winform的命令
 * @param {cmd} cmdId 
 * @param {value} value 
 */
function executeCmdToWinform(cmdId, value) {
    executeCmdToWinformAsync(cmdId, value)
}

async function executeCmdToWinformReturn(cmdId, value) {
    var result = await executeCmdToWinformAsync(cmdId, value, true)
    return result
}

/**
 * 执行发到winform的命令
 * @param {cmd} cmdId 
 * @param {value} value 
 */
function executeCmdToWinformAsync(cmdId, value, isNeedCallBack) {
    if (divFlag != "testform" && vmonacoEditor) {

        const last = JSON.stringify(value)
        console.log("2Winform:" + last)

        if (isNeedCallBack) {
            return new Promise((resolve, reject) => {
                vmonacoEditor.vhtmlKeysCommand(cmdId, divEditorToken, last, (value) => {
                    resolve(value)
                })
            })
        }
        else {
            vmonacoEditor.vhtmlKeysCommand(cmdId, divEditorToken, last)
        }
    }
    return null
}

/**
 * 执行来自winform的命令
 * @param {cmd} cmdId 
 * @param {值} value 
 */
function executeCmdFromWinform(cmdId, value) {
    eventBus.$emit(cmdData.executeCmd, cmdId, value)
}

/**
 * 执行来自winform的命令
 * @param {cmd} cmdId 
 * @param {值} value 
 */
function executeCmd(cmdId, value) {
    executeCmdFromWinform(cmdId, value)
}

export default {
    executeCmdToWinform,
    executeCmdFromWinform,
    executeCmdToWinformReturn,
    executeCmd,
    init,
    appVue: () => appVue,
    dataSourceHandler: ds,
    eventBus
}