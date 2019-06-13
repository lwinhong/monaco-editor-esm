import util from "./util"
import { eventBus } from "./event-bus"
import ds from "../dataSource/dataSource"
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

class globalHandler {

    async init(appVue) {
        this.vue = appVue
        await ds.initDs(divFlag);
        this.executeCmdFromWinform(cmdData.dataLoaded)
    }

    /**
     * 执行发到winform的命令
     * @param {cmd} cmdId 
     * @param {value} value 
     */
    executeCmdToWinform(cmdId, value) {
        this.executeCmdToWinformAsync(cmdId, value)
    }

    async executeCmdToWinformReturn(cmdId, value) {
        let result = await this.executeCmdToWinformAsync(cmdId, value, true)
        return result
    }

    /**
     * 执行发到winform的命令
     * @param {cmd} cmdId 
     * @param {value} value 
     */
    executeCmdToWinformAsync(cmdId, value, isNeedCallBack) {
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
    executeCmdFromWinform(cmdId, value) {
        eventBus.$emit(cmdData.executeCmd, cmdId, value)
    }

    /**
     * 执行来自winform的命令
     * @param {cmd} cmdId 
     * @param {值} value 
     */
    executeCmd(cmdId, value) {
        this.executeCmdFromWinform(cmdId, value)
    }

    get dataSourceHandler() {
        return ds;
    }
    
    get eventBus(){
        return eventBus;
    }

    get appVue(){
        return this.vue;
    }
}
const GlobalHandler_KEY = Symbol();

if (!global[GlobalHandler_KEY])
    global[GlobalHandler_KEY] = new globalHandler();

export default global[GlobalHandler_KEY];