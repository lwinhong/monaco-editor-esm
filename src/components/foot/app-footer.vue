<template>
  <div class="m-statusBar">
    <section class="hd">
      <tooltip
        v-for="(item,index) in reftItems"
        :key="item.key+index"
        :placement="item.placement"
        :id="'app-footer-'+item.key"
        :class="{'notClick':isCssEditor&&item.key=='format'}"
      >
        <a class="fn-btn" @click="itemClick(item.cmd, item.key)">
          <icon :custom="item.icon" size="16"></icon>
        </a>
        <div slot="content">
          <p v-for="(c,i) in item.content" v-text="c" :key="c+i"></p>
        </div>
      </tooltip>
      <i class="sep"></i>

      <dropdown placement="top" v-show="isShowDevTemplate" @on-click="selectResource">
        <a class="fn-btn">
          <icon custom="vicon ico-codetpl" size="16"></icon>
        </a>
        <dropdown-menu slot="list">
          <dropdown-item name="generateTemplate">生成模板</dropdown-item>
          <dropdown-item name="applyTemplate">应用模板</dropdown-item>
        </dropdown-menu>
      </dropdown>
      <dropdown placement="top" @on-click="selectResource">
        <a class="fn-btn">
          <icon custom="vicon ico-insert" size="16"></icon>
        </a>
        <dropdown-menu slot="list">
          <dropdown-item name="resource">插入构件资源</dropdown-item>
          <dropdown-item v-show="isShowShareReource" name="share">插入文件资源</dropdown-item>
        </dropdown-menu>
      </dropdown>
    </section>
    <section class="ft">
      <tooltip
        content="点击查看详细"
        placement="top"
        v-for="(msg,index) in messageFlowData"
        :key="msg+index"
        v-show="errorMsgVisible"
      >
        <a class="prompt" :class="msg.class" @click="itemClick(msg.cmd, msg.key)">
          <icon :type="msg.icon" size="14"></icon>
          {{msg.key==='error'?errorMessage.errorMsgCount:errorMessage.suggestMsgCount}}
        </a>
      </tooltip>
      <i class="sep"></i>
      <span @click="itemClick('setEditorFocus','focus')" v-text="rowColMsg"></span>
    </section>
  </div>
</template>
<script>
import { cmdData } from "../../app/command";
import { mapState } from "vuex";
import commandObj from "../../app/command";

export default {
  name: "AppFooter",

  data() {
    return {
      messageFlowData: [
        {
          key: "suggest",
          class: "s-warn",
          icon: "ios-warning-outline",
          cmd: "showMessageFlow"
        },
        {
          key: "error",
          class: "s-error",
          icon: "ios-close-circle-outline",
          cmd: "showMessageFlow"
        }
      ],
      reftItems: [
        {
          key: "format",
          content: ["格式化", "Shift + Alt + F"],
          icon: "vicon ico-daimazhushi",
          cmd: "format",
          placement: "top-start"
        },
        {
          key: "commentLine",
          content: ["注释/取消", "Ctrl + /"],
          icon: "vicon ico-zhushi",
          cmd: "commentLine",
          placement: "top"
        },
        {
          key: "wordWrap",
          content: ["自动换行", "Atl + Z"],
          icon: "vicon ico-wordBreak",
          cmd: "wordWrap",
          placement: "top"
        }
      ]
    };
  },
  computed: {
    ...mapState("codeEditorStore", [
      "errorMessage",
      "currentEditorKey",
      "cursorPostion"
    ]),
    rowColMsg() {
      return `行 ${this.cursorPostion.lineNumber} ,列 ${
        this.cursorPostion.column
      }`;
    },
    errorMsg() {
      return `${this.errorMessage.errorMsgCount}个错误,${
        this.errorMessage.suggestMsgCount
      }个警告`;
    },
    errorMsgVisible() {
      return (
        this.errorMessage.errorMsgCount + this.errorMessage.suggestMsgCount > 0
      );
    },
    isShowShareReource() {
      return isDevEditorMode() && formType == "Bootstrap";
    },
    isShowDevTemplate() {
      return isDevEditorMode();
    },
    isCssEditor() {
      return (
        this.currentEditorKey == commandObj.defaultEditorKeys.css ||
        this.currentEditorKey == commandObj.defaultEditorKeys.moduleCss ||
        this.currentEditorKey == commandObj.devEditorKeys.style
      );
    }
  },
  methods: {
    itemClick(cmd, value) {
      this.v3global.executeCmd(cmd, value);
    },
    selectResource(name) {
      var result;
      switch (name) {
        case "share":
        case "resource":
          var cmd =
            name == "resource"
              ? cmdData.openSourceSelector
              : cmdData.openDevShareSelector;
          result = v3global.executeCmdToWinformReturn(cmd);
          if (result && result.ok) {
            this.v3global.executeCmd(cmdData.insertValue, result.value);
          }
          return;
        case "generateTemplate":
          this.v3global.executeCmdToWinform(cmdData.generateTemplate);
          break;
        case "applyTemplate":
          result = this.v3global.executeCmdToWinformReturn(cmdData.applyTemplate);
          if (result && result.ok) {
          }
          break;
      }
    }
  }
};
</script>
<style>
.notClick {
  pointer-events: none;
  cursor: not-allowed;
}
</style>
