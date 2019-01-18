<template>
  <div class="fill">
    <app-chart-widget
      :visible="appChartWidgetVisible"
      @chart-widget-click="openChartSetting"
      :top="chartWidgetTop"
      :left="chartWidgetLeft"
    ></app-chart-widget>
    <div class="code-editor fill">
      <!--<i-row>
        <i-col span="4">
            <div id="left-toolbox">
                <i-menu >
                    <menu-item v-for="d in vuiMenuData" v-bind:name="d.name" v-text="d.title" draggable="true" ondragstart="drag(event)" v-bind:id="d.name"></menu-item>
                </i-menu>
            </div>
        </i-col>
      <i-col span="20">
        v-html="tab.template"
      -->
      <tabs v-model="tabSelectedIndex" animated>
        <tab-pane v-for="tab in tabs" :key="tab.key" :label="tab.text" :name="tab.key">
          <div
            :id="tab.editorContainerId"
            class="editor_container"
            @dragover="dragover"
            @drop="drop"
            @dragenter="dragenter"
          ></div>
        </tab-pane>
        <dropdown
          id="ddSaveAndClose"
          style="margin-right: 5px; margin-top: 2px;"
          :visible="saveButtonVisible"
          slot="extra"
          trigger="custom"
          @on-click="closeDropdownButton"
        >
          <div class="dropBtn">
            <div class="save-close">
              <Icon type="ios-list-box" class="iconsave" @click="saveAndClose"></Icon>
              <span>保存并关闭</span>
            </div>
          </div>
          <dropdown-menu slot="list" placement="bottom">
            <dropdown-item>
              <div>另存为</div>
            </dropdown-item>
            <dropdown-item divided>
              <div>打开文件</div>
            </dropdown-item>
          </dropdown-menu>
        </dropdown>
      </tabs>
    </div>
    <app-message-flow ref="messageFlow" class="foot-message-flow-show" @localMessage="localMessage"></app-message-flow>
  </div>
</template>
<script>
import AppChartWidget from "../editor/app-chart-widget.vue";
import editorHandler from "../editor/handler/editorHandler.js";
import AppMessageFlow from "../message/app-message-flow.vue";
import eslintHandler from "./handler/eslintHandler";

const tabs = [];
var currentEditor = null;

export default {
  name: "AppEditor",
  components: {
    AppChartWidget,
    AppMessageFlow
  },
  created: function() {
    this.$Message.config({
      top: 38,
      duration: 1
    });
  },
  mounted() {
    let me = this;
    editorHandler.Init(me);
    editorHandler.addEditorTabPage(tabs);
    editorHandler.addMonacoEditor(tabs);
  },
  computed: {
    flowMessageWidthTrigger() {
      return flowMessageWidth;
    }
  },
  data() {
    return {
      appChartWidgetVisible: false,
      tabSelectedIndex: editorHandler.devEditorKeys.template,
      tabs: tabs,
      saveButtonVisible: false,
      editor: null,
      chartWidgetTop: 24,
      chartWidgetLeft: 24
    };
  },
  methods: {
    save() {},
    saveAndClose() {},
    closeDropdownButton() {
      saveButtonVisible = false;
    },
    openChartSetting() {
      alert("openChartWidget");
    },
    openChartWidget(point) {
      this.chartWidgetTop = point.y;
      this.chartWidgetLeft = point.x;
      this.appChartWidgetVisible = true;
    },
    footItemClick(item) {
      editorHandler.executeCommand(item.key, item, this);
    },
    localMessage(row, index, type) {
      console.log(row + " " + index + "  " + type);
    },
    editorLayout() {
      editorHandler.editorLayoutDelay();
    },
    dragover(ev) {
      ev.preventDefault();

      const point = currentEditor.getTargetAtClientPoint(
        ev.clientX,
        ev.clientY
      );

      currentEditor.setPosition(point.position);
    },
    dragenter(ev) {
      currentEditor = editorHandler.getSelectedEditorData().editor;
      editorHandler.setMonacoEditorFocus(this.tabSelectedIndex);
    },
    drop(ev) {
      ev.preventDefault();

      const point = currentEditor.getTargetAtClientPoint(
        ev.clientX,
        ev.clientY
      );
      currentEditor.executeEdits("", [
        {
          range: point.range,
          text: ev.dataTransfer.getData("Text")
        }
      ]);
    }
  },
  watch: {
    tabSelectedIndex(newValue, oldValue) {
      editorHandler.setMonacoEditorFocusDelay(newValue, 100);
      currentEditor = editorHandler.editorData[newValue].editor;
    }
  }
};
</script>
<style >
.code-editor {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.code-editor .ivu-tabs-bar {
  margin-bottom: 0;
  background-color: rgb(238, 238, 240);
}
.code-editor .editor_container {
  height: 100%;
}

.code-editor .ivu-tabs {
  height: 100%;
}

.code-editor .ivu-tabs-content {
  position: absolute;
  top: 37px;
  bottom: 0;
  left: 0;
  right: 0;
}

.code-editor .ivu-tabs-tabpane {
  height: 100%;
}

.code-editor .editor_container {
  height: 100%;
}

.code-editor .ivu-tabs .ivu-tabs-content-animated {
  transition: 0s !important;
}

.code-editor .ivu-menu-vertical .ivu-menu-item,
.ivu-menu-vertical .ivu-menu-submenu-title {
  padding: 5px 15px 5px 15px !important;
}

/*************** monaco-editor*******************/
.code-editor .monaco-editor .bracket-match {
  border: none;
}

.code-editor .minimap.slider-mouseover {
  right: 8px !important;
}

.code-editor .decorationsOverviewRuler {
  width: 8px !important;
}

.code-editor .scrollbar {
  width: 8px !important;
}

.code-editor .scrollbar .slider {
  border-radius: 4px;
}

.code-editor .scrollbar .vertical .slider {
  width: 8px !important;
}

.code-editor .scrollbar .vertical .slider {
  height: 8px !important;
}

.msg-redsquiggly {
  background: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20height%3D'3'%20width%3D'6'%3E%3Cg%20fill%3D'%23ff0000'%3E%3Cpolygon%20points%3D'5.5%2C0%202.5%2C3%201.1%2C3%204.1%2C0'%2F%3E%3Cpolygon%20points%3D'4%2C0%206%2C2%206%2C0.6%205.4%2C0'%2F%3E%3Cpolygon%20points%3D'0%2C2%201%2C3%202.4%2C3%200%2C0.6'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")
    repeat-x bottom left;
}

.msg-greensquiggly {
  background: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20height%3D'3'%20width%3D'6'%3E%3Cg%20fill%3D'%23008000'%3E%3Cpolygon%20points%3D'5.5%2C0%202.5%2C3%201.1%2C3%204.1%2C0'%2F%3E%3Cpolygon%20points%3D'4%2C0%206%2C2%206%2C0.6%205.4%2C0'%2F%3E%3Cpolygon%20points%3D'0%2C2%201%2C3%202.4%2C3%200%2C0.6'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")
    repeat-x bottom left;
}

.inline-widgetcode-illegal:after {
  /*content: '[[编码重复,请修正]]';*/
  color: darkgreen;
  background: yellow;
}

/*.inline-myGlyphMarginClass {
    background: red;
}*/

.monaco-editor.vs .lineDecoration-error {
  background: #ffcccc;
  width: initial !important;
  left: 0 !important;
  right: 20px;
}

.monaco-editor.vs-dark .lineDecoration-error {
  background: #2d0000;
  width: initial !important;
  left: 0 !important;
  right: 20px;
}
/*************** monaco-editor end *******************/
</style>

<style scoped>
.foot-message-flow-show {
  bottom: 45px !important;
}

/***************保存关闭按钮*******************/
.dropBtn {
  background-color: #faf8f8;
  border: 1px solid transparent;
  border-color: #dddee1;
  border-radius: 2px;
  color: #495060;
  cursor: pointer;
  display: inline-block;
  font-size: 12px;
  line-height: 2.2;
  outline: none;
  padding-left: 10px;
  padding-right: 5px;
  padding-top: 1px;
  transition: color 0.2s linear, background-color 0.2s linear,
    border 0.2s linear;
  vertical-align: middle;
  margin-top: 1px;
}

.dropBtn:hover {
  background: #e6e6e6;
}

.dropBtn img {
  vertical-align: text-bottom;
}

.dropBtn .save-close {
  cursor: default;
  float: left;
  margin-right: 4px;
}

.dropBtn .save-close .iconsave {
  font-size: 17px;
  vertical-align: middle;
  position: relative;
  top: -1px;
  margin-right: 6px;
}

.dropBtn .lable-down {
  border-left: 1px solid #dddee1;
  float: right;
  padding-left: 3px;
  width: 15px;
}

.dropBtn .lable-down:hover {
  background-color: #f7f7f7;
  color: blue;
}
/***************end 保存关闭按钮*********************/
</style>