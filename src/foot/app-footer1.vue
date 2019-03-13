<template>
  <div class="m-statusBar">
    <section class="hd">
      <tooltip v-for="(item,index) in reftItems" :key="item+index" :placement="item.placement">
        <a class="fn-btn" @click="itemClick(item.cmd, item.key)">
          <icon :custom="item.icon" size="16"></icon>
        </a>
        <div slot="content">
          <p v-for="(c,i) in item.content" v-text="c" :key="c+i"></p>
        </div>
      </tooltip>
      <i class="sep"></i>

      <dropdown placement="top" v-show="isShowDevTemplate">
        <a class="fn-btn">
          <icon custom="vicon ico-codetpl" size="16"></icon>
        </a>
        <dropdown-menu slot="list">
          <dropdown-item>生成模板</dropdown-item>
          <dropdown-item>应用模板</dropdown-item>
        </dropdown-menu>
      </dropdown>
      <dropdown placement="top">
        <a class="fn-btn">
          <icon custom="vicon ico-insert" size="16"></icon>
        </a>
        <dropdown-menu slot="list">
          <dropdown-item>插入构件资源</dropdown-item>
          <dropdown-item v-show="isShowShareReource">插入文件资源</dropdown-item>
        </dropdown-menu>
      </dropdown>
    </section>
    <section class="ft">
      <tooltip
        content="点击查看详细"
        placement="top"
        v-for="(msg,index) in messageFlowData"
        :key="msg+index"
      >
        <a class="prompt" :class="msg.class" @click="itemClick(msg.cmd, msg.key)">
          <icon :type="msg.icon" size="14"></icon>
          {{msg.key==='error'?errorMsgCount:suggestMsgCount}}
        </a>
      </tooltip>
      <i class="sep"></i>
      <span @click="itemClick('setEditorFocus','focus')" v-text="rowColMsg"></span>
    </section>
  </div>
</template>
<script>
import { eventBus } from "../app/event-bus";

export default {
  name: "AppFooter",
  created() {
    //这个2事件是否要改造为统一的那个？
    eventBus.$on("updateCursorPosition", position => {
      if (position) {
        this.selectionRow = position.lineNumber;
        this.selectionCol = position.column;
      }
    });
    eventBus.$on("updateMessageCount", obj => {
      this.errorMsgCount = obj.errorMsgCount;
      this.suggestMsgCount = obj.suggestMsgCount;
    });
  },
  data() {
    return {
      selectionRow: 0,
      selectionCol: 0,
      errorMsgCount: 0,
      suggestMsgCount: 0,

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
          cmd: "error"
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
    rowColMsg() {
      return `行 ${this.selectionRow} ,列 ${this.selectionCol}`;
    },
    errorMsg() {
      return `${this.errorMsgCount}个错误,${this.suggestMsgCount}个警告`;
    },
    errorMsgVisible() {
      return this.errorMsgCount + this.suggestMsgCount > 0;
    },
    isShowShareReource() {
      return isDevEditorMode() && formType == "Bootstrap";
    },
    isShowDevTemplate() {
      return isDevEditorMode();
    }
  },
  methods: {
    itemClick(cmd, value) {
      window.global.executeCmdInternal(cmd, value);
    }
  }
};
</script>