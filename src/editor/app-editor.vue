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
          <monaco
            :key="tab.key"
            :language="tab.language"
            :wordWrap="wordWrap"
            :minimap="minimap"
            :tag="tab"
            @mounted="onMonacoMounted"
            @dropDone="dropDone"
          ></monaco>
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
import SaveButton from "./save-button.vue";
import Monaco from "./monaco-editor/monaco.vue";

const tabs = [];
var currentEditor = null;

export default {
  name: "AppEditor",
  components: {
    AppChartWidget,
    AppMessageFlow,
    SaveButton,
    Monaco
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
    //editorHandler.addMonacoEditor(tabs);
  },
  computed: {
    flowMessageWidthTrigger() {
      return flowMessageWidth;
    }
  },
  data() {
    return {
      appChartWidgetVisible: false,
      tabSelectedIndex: isDevEditorMode()
        ? editorHandler.devEditorKeys.template
        : editorHandler.defaultEditorKeys.html,
      tabs: tabs,
      saveButtonVisible: true,
      editor: null,
      chartWidgetTop: 24,
      chartWidgetLeft: 24,
      theme: "vs",
      wordWrap: true,
      minimap: false
    };
  },
  methods: {
    onMonacoMounted(editor, tab) {
      editorHandler.afterMonacoEditorCreated(
        editor,
        tab,
        tabs[0].key === tab.key
      );
    },
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
    dropDone(editor, value, range) {
      editorHandler.insertValueToEditor(editor, value, range);
    }
  },
  watch: {
    tabSelectedIndex(newValue, oldValue) {
      editorHandler.setMonacoEditorFocusDelay(newValue, 100);
      currentEditor = editorHandler.editorData[newValue].editor;
    },
    theme() {
      monaco.editor.setTheme(this.theme);
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
</style>

<style scoped>
.foot-message-flow-show {
  bottom: 45px;
  /* z-index: 99; */
}
</style>