<template>
  <div class="m-codeView" id="code-editor-root">
    <app-chart-widget ref="appChartWidgetRef" v-if="appChartWidgetVisible"></app-chart-widget>
    <div class="code-editor">
      <tabs v-model="tabSelectedIndex" animated>
        <tab-pane v-for="tab in tabs" :key="tab.key" :label="tab.text" :name="tab.key">
          <monaco
            :key="tab.key"
            :language="tab.language"
            :wordWrap="wordWrap"
            :minimap="minimap"
            :tag="tab"
            :theme="theme"
            @monacoMounted="onMonacoMounted"
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
    <!--状态栏{-->
    <app-footer></app-footer>
  </div>
</template>
<script>
// import AppChartWidget from "../editor/chart/app-chart-widget.vue";
import AppMessageFlow from "./message/app-message-flow.vue";
import SaveButton from "./save-button.vue";
import Monaco from "./monaco-editor/monaco.vue";
import ComponentWizard from "./wizard/componentWizard.vue";
import AppFooter from "./foot/app-footer.vue";

import editorHandler from "../editor/handler/editorHandler";
import { eventBus } from "../../app/event-bus";
import { createNamespacedHelpers } from "vuex";
const {
  mapState,
  mapActions,
  mapGetters,
  mapMutations
} = createNamespacedHelpers("codeEditorStore");

const tabs = [];
var currentEditor = null;

export default {
  name: "AppEditor",
  components: {
    //AppChartWidget,
    AppMessageFlow,
    SaveButton,
    Monaco,
    ComponentWizard,
    AppFooter
  },
  created() {
    this.$Message.config({
      top: 38,
      duration: 1
    });

    eventBus.$on("executeCmd", (cmd, value) => {
      editorHandler.executeCommand(cmd, value);
    });
  },
  mounted() {
    let me = this;
    editorHandler.Init(me);
    if (divFlag === "testform") {
      let aa = `<div>
	<vui-panel name="panel1" widget-code="JGDiv1_vuipanel1" widget-name="JGDiv1_vuipanel1">面板
		<div slot="content" v-on:click="$emit('div_click1')">
			<vui-card widget-code="JGDiv1_vuicard1" widget-name="JGDiv1_vuicard1" bordered></vui-card>
		</div>
		<input type="" v-on:click="$emit('ik',en.zi1,123)">
		<vui-button widget-code="JGDiv2_vuibutton1" widget-name="JGDiv2_vuibutton1" v-on:click="$emit('JGDiv2_vuibutton1_click1')">按钮</vui-button>
        <vui-chart chartSettings="{'PluginID':'FusionChart','PluginName':'Fusion图表','ChartID':'1003','chartName':'竖柱2D','chartType':'Column','is3D':'false','path':'fusionchart/FusionchartFactory','palette':'1','size':{'high':'400','width':'600'},'title':{'font':'黑体','fontSize':'18','fontColor':'#000000','alpha':'0','bgColor':null,'bold':'0','italic':'0','strikeout':'0','underline':'0','show':'true','horizontal':'center','vertical':'top','title':null},'subtitle':{'font':'黑体','fontSize':'12','fontColor':'#000000','alpha':'0','bgColor':null,'bold':'0','italic':'0','strikeout':'0','underline':'0','show':'true','horizontal':'center','vertical':'top','title':null},'inCanvas':{'font':'黑体','fontSize':'8','fontColor':'#696969','alpha':'100','bgColor':null,'bold':'0','italic':'0','strikeout':'0','underline':'0','top':'45','bottom':'50','left':'25','right':'25'},'outCanvas':{'font':'黑体','fontSize':'8','fontColor':'#000000','alpha':'100','bgColor':null,'bold':'0','italic':'0','strikeout':'0','underline':'0'},'xAxis':{'Title':null,'font':'黑体','fontSize':'12','fontColor':'#333333','labelDisplay':'WRAP','slantLabels':'0','bold':'0','italic':'0','strikeout':'0','underline':'0','boundaryGap':'true','scale':'false','LabelShow':'true','LineShow':'true','TickShow':'true','alignWithLabel':'true','nameGap':'25','nameLocation':'middle'},'yAxis':{'Title':null,'font':'黑体','fontSize':'12','fontColor':'#333333','labelDisplay':'WRAP','slantLabels':'0','bold':'0','italic':'0','strikeout':'0','underline':'0','boundaryGap':'false','scale':'false','LabelShow':'true','LineShow':'true','TickShow':'true','isGradientColor':'false','nameGap':'35','nameLocation':'middle'},'DataInfo':{'type':'Entity','name':'xzd','value':'xzd'},'DataColumns':{'value':['PID','OrderNo','InnerCode','IsLeaf']},'serie':{'isVar':'true','name':null,'value':'PID','values':{'value':'ss'},'show':'true','horizontal':'center','vertical':'bottom','orient':'horizontal','itemGap':'10','barMaxWidth':'50'},'x':{'isVar':'false','name':null,'value':null},'y':{'name':'排序字段','code':'OrderNo','stack':'false','showlabel':'false','position':'top'}}"></vui-chart>
	</vui-panel> <vui-button widget-code="JGDiv2_vuibutton2" widget-name="JGDiv2_vuibutton2" v-on:click="$emit('JGDiv2_vuibutton2_click1')">按钮</vui-button>
	<Input/>
</div>`;
      editorHandler.addEditorTabPage(tabs, {
        Template: aa,
        VueComponent: `<template>${aa}</template>`
      });
    }
    this.saveButtonVisible = editorShowType !== "FormDesigner";
    this.setEditorKeyAction(this.getDefaultTabIndex());

    this.appChartWidgetVisible = isDevEditorMode();
  },
  computed: {
    flowMessageWidthTrigger() {
      return flowMessageWidth;
    },
    ...mapState(["theme", "wordWrap", "minimap"])
  },
  data() {
    return {
      tabSelectedIndex: this.getDefaultTabIndex(),
      tabs: tabs,
      saveButtonVisible: true,
      appChartWidgetVisible: true
    };
  },
  methods: {
    ...mapGetters([
      "getHtmlEditorNodesSameLevel",
      "getWidgetCodes",
      "getNearestNode",
      "getNearestAttribute",
      "getNearestNodeAndAttribute"
    ]),
    ...mapActions([
      "setHtmlEditorNodesAction",
      "setEditorKeyAction",
      "setCursorPositionAction",
      "setErrorMessageAction",
      "setCursorPositionOffsetAction",
      "setWidgetCodesAction",
      "setEditorDataAction"
    ]),
    ...mapMutations(["setMinimap"]),
    getDefaultTabIndex() {
      return isDevEditorMode()
        ? editorHandler.devEditorKeys.template
        : editorHandler.defaultEditorKeys.html;
    },
    onMonacoMounted(editor, tab) {
      editorHandler.afterMonacoEditorCreated(
        editor,
        tab,
        tabs[0].key === tab.key
      );

      //如果是dev 的template 需要注册 图标相关
      if (tab.key == editorHandler.devEditorKeys.template) {
        this.$refs.appChartWidgetRef.initWidget(editor);
      }
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
    footItemClick(item) {
      editorHandler.executeCommand(item.key, item);
    },
    localMessage(row, index, type) {
      if (row) {
        debugger;
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
      }
    },
    insertVlanguage(vlang) {
      editorHandler.insertValueToEditor(null, vlang, null, true);
    },
    editorLayout() {
      editorHandler.editorLayoutDelay();
    },
    dropDone(editor, value, range) {
      editorHandler.insertValueAsSnippet(editor, value, true);
    }
  },
  watch: {
    tabSelectedIndex(newValue, oldValue) {
      editorHandler.setMonacoEditorFocusDelay(newValue, 200);
      currentEditor = editorHandler.editorData[newValue].editor;
      this.setEditorKeyAction(newValue);
    }
  }
};
</script>
<style >
.code-editor {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0px 0px 28px 0px;
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