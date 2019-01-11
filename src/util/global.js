import util from "./util";

(function init() {
  var qs = util.getQueryString();
  if (qs) {
    var tmp = qs["mode"];
    if (tmp) editorMode = tmp;

    tmp = qs["token"];
    if (tmp) divEditorToken = tmp;
  }
})()

const executeCmd = (cmd, value) => {

}

export default {
  executeCmd
}