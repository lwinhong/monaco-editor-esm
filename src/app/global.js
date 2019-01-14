import util from "./util";

var appVue

(() => {
  const qs = util.getQueryString();
  if (qs) {
    var tmp = qs["mode"];
    if (tmp) editorMode = tmp;

    tmp = qs["token"];
    if (tmp) divEditorToken = tmp;
  }
})()

const init = (vueObj) => appVue = vueObj

/**
 * 执行发到winform的命令
 * @param {cmd} cmdId 
 * @param {value} value 
 */
const executeCmdToWinform = (cmdId, value) => {

  const result = Object.assign(value, { FormToken: divEditorToken })
  const last = JSON.stringify(result); //将JSON对象转化为JSON字符

  if (vmonacoEditor) {
    const retValue = vmonacoEditor.vhtmlKeysCommand(cmdId, divEditorToken, last);
    return retValue;
  }
  return null;
}

/**
 * 执行来自winform的命令
 * @param {cmd} cmdId 
 * @param {值} value 
 */
const executeCmdFromWinform = (cmdId, value) => {

}
export default {
  executeCmdToWinform, executeCmdFromWinform, init, appVue: () => appVue
}