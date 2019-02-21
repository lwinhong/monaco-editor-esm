<template>
  <div class="fill">
    <app-chart-widget
      :visible="appChartWidgetVisible"
      @chart-widget-click="openChartSetting"
      :top="chartWidgetTop"
      :left="chartWidgetLeft"
    ></app-chart-widget>
    <div class="code-editor fill">
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
        <save-button slot="extra" v-if="saveButtonVisible"></save-button>
      </tabs>
    </div>
    <app-message-flow
      ref="messageFlow"
      class="foot-message-flow-show"
      @localMessage="localMessage"
      @insertVlanguage="insertVlanguage"
    ></app-message-flow>
  </div>
</template>
<script>
import AppChartWidget from "../editor/app-chart-widget.vue";
import editorHandler from "../editor/handler/editorHandler.js";
import AppMessageFlow from "../message/app-message-flow.vue";
import eslintHandler from "./handler/eslintHandler.js";
import SaveButton from "./save-button.vue";

const tabs = [];
var currentEditor = null;

export default {
  name: "AppEditor",
  components: {
    AppChartWidget,
    AppMessageFlow,
    SaveButton
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
      saveButtonVisible: true,
      editor: null,
      chartWidgetTop: 24,
      chartWidgetLeft: 24
    };
  },
  methods: {
    save() {},
    saveAndClose() {
      alert("saveAndClolse");
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
      editorHandler.executeCommand(item.key, item);
    },
    localMessage(row, index, type) {
      if (row) {
        var editorData = editorHandler.editorData[row.moduleKey];
        var editor = editorData.editor;
        if (editor) {
          editor.revealPositionInCenter({
            lineNumber: row.endLineNumber,
            column: row.endColumn
          });
          editor.setSelection(row.position);
        }
        this.tabSelectedIndex = row.moduleKey;
        editorHandler.setMonacoEditorFocus(row.moduleKey);
      }
    },
    insertVlanguage(vlang) {
      editorHandler.insertValueToEditor(null, vlang, null, true);
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

      editorHandler.insertValueToEditor(
        currentEditor,
        ev.dataTransfer.getData("Text"),
        point.range
      );
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
  bottom: 45px;
  /* z-index: 99; */
}
</style>