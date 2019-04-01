<template>
  <div class="fill" id="code-editor-root">
    <button @click="$refs.componentWizard.showWizard()">点击</button>
    <app-chart-widget
      :visible="appChartWidgetVisible"
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
            :theme="theme"
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
    <component-wizard ref="componentWizard"></component-wizard>
    
  </div>
</template>
<script>
import AppChartWidget from "../editor/app-chart-widget.vue";
import editorHandler from "../editor/handler/editorHandler";
import AppMessageFlow from "../message/app-message-flow.vue";
import SaveButton from "./save-button.vue";
import Monaco from "./monaco-editor/monaco.vue";
import { eventBus } from "../../app/event-bus";
import { mapState, mapActions, mapGetters } from "vuex";
import ComponentWizard from "./wizard/componentWizard.vue";

const tabs = [];
var currentEditor = null;

export default {
  name: "AppEditor",
  components: {
    AppChartWidget,
    AppMessageFlow,
    SaveButton,
    Monaco,
    ComponentWizard
  },
  created() {
    this.$Message.config({
      top: 38,
      duration: 1
    });
    eventBus.$on("executeCmd", (cmd, value) => {
      switch (cmd) {
        case "showMessageFlow": //显示错误列表
          this.$refs.messageFlow.toggleShow(value);
          break;
        case "vlist":
          this.$refs.messageFlow.toggleShow(cmd);
          break;
      }
      editorHandler.executeCommand(cmd, value);
    });
  },
  mounted() {
    let me = this;
    editorHandler.Init(me);
    if (divFlag === "testform") {
      editorHandler.addEditorTabPage(tabs, {});
    }
    this.saveButtonVisible = editorShowType !== "FormDesigner";
  },
  computed: {
    flowMessageWidthTrigger() {
      return flowMessageWidth;
    },
    ...mapState("codeEditorStore", ["theme"])
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
    save() {
      return editorHandler.save();
    },
    saveAndClose() {
      return editorHandler.saveAndClose(true);
    },
    saveViewState() {
      return editorHandler.saveViewState();
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
        //editorHandler.setMonacoEditorFocus(row.moduleKey);
      }
    },
    insertVlanguage(vlang) {
      editorHandler.insertValueToEditor(null, vlang, null, true);
    },
    editorLayout() {
      editorHandler.editorLayoutDelay();
    },
    dropDone(editor, value, range) {
      //editorHandler.insertValueToEditor(editor, value, range);
      editorHandler.insertValueAsSnippet(editor, value, true);
    },
    ...mapActions("codeEditorStore", ["setHtmlEditorNodesAction"])
  },
  watch: {
    tabSelectedIndex(newValue, oldValue) {
      editorHandler.setMonacoEditorFocusDelay(newValue, 200);
      currentEditor = editorHandler.editorData[newValue].editor;
      this.v3global.executeCmd(
        editorHandler.cmdData.editorIndexChanged,
        newValue
      );
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
  /* background-color: #f8f8f8; */
  background-color: var(--theme-bg);
}
.code-editor .ivu-tabs-nav-wrap {
  margin-bottom: 0px;
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
  bottom: 43px;
  /* z-index: 99; */
}
</style>