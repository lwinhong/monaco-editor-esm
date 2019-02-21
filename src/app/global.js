import util from "./util"
import { eventBus } from "./event-bus"
import ds from "../dataSource/dataSourceHandler"

(() => {
  const qs = util.getQueryString()
  if (qs) {
    var tmp = qs["mode"]
    if (tmp) editorMode = tmp
    tmp = qs["token"]
    if (tmp) divEditorToken = tmp
    tmp = qs["form"]
    if (tmp) formType = tmp
  }
})()

var appVue
const init = (vueObj) => {
  appVue = vueObj
  ds.initDs()
}

/**
 * 执行发到winform的命令
 * @param {cmd} cmdId 
 * @param {value} value 
 */
function executeCmdToWinform(cmdId, value) {

  var defaultValue = { FormToken: divEditorToken };
  var resultValue = defaultValue;
  if (value) {
    resultValue = Object.assign(value, defaultValue)
  }

  const last = JSON.stringify(resultValue); //将JSON对象转化为JSON字符
  console.log("2Winform:" + last)
  // if (vmonacoEditor) {
  //   const retValue = vmonacoEditor.vhtmlKeysCommand(cmdId, divEditorToken, last);
  //   return retValue;
  // }
  return null;
}

/**
 * 执行来自winform的命令
 * @param {cmd} cmdId 
 * @param {值} value 
 */
function executeCmdFromWinform(cmdId, value) {
  eventBus.$emit('executeCmdFromWinform', cmdId, value)
}

export default {
  executeCmdToWinform,
  executeCmdFromWinform,
  init,
  appVue: () => appVue,
  dataSourceHandler: ds
}