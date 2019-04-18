<template>
  <div
    :style="{top:top+'px', left:left+'px'}"
    class="chartSetting"
    id="openChartSettings"
    v-show="visible"
  >
    <span>打开图表设计器</span>
  </div>
</template>
<script>
import chartHandler from "./vuiChartHandler";
import { createNamespacedHelpers } from "vuex";
const {
  //mapState,
  //mapActions,
  mapGetters
  // mapMutations
} = createNamespacedHelpers("codeEditorStore");
let chartHandlerObj;

export default {
  name: "AppChartWidget",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    top: {
      type: Number,
      default: 24
    },
    left: {
      type: Number,
      default: 24
    },
    editor: {
      type: Object,
      default: null
    }
  },
  methods: {
    ...mapGetters(["getNearestNode", "getNearestAttribute"]),
    initWidget(editor) {
      chartHandlerObj = new chartHandler(editor, editor.getModel(), this);
      chartHandlerObj.initOpenChartCommand();
    },
    getOpenChartCmdId() {
      return chartHandlerObj.getOpenChartCmdId();
    },
    getChartCompletion() {
      return chartHandlerObj.getChartCompletion();
    }
  }
};
</script>
<style>
/* .openChartSettings {
  position: absolute;
  top: 24px;
  left: 24px;
  background: #2196f3;
  color: #fff;
  font-size: 12px;
  line-height: 2;
  padding: 0 8px;
  border-radius: 2px;
  cursor: pointer;
  z-index: 99999;
} */

/*theme-light*/
.chartSetting {
  position: absolute;
  top: 24px;
  left: 24px;
  width: 300px;
  background: url(../../../resource/images/icon-prop-light.png) #e4e5e9 8px
    center no-repeat;

  color: #2196f3;
  font-size: 12px;
  line-height: 30px;
  padding: 0 8px;
  border-radius: 2px;
  cursor: pointer;
  z-index: 99999;
}

.chartSetting span {
  display: block;
  text-indent: 20px;
  background: url(../../../resource/images/icon-enter-light.png) right center
    no-repeat;
}

/*theme-dark*/
.monaco-editor.vs-dark .chartSetting {
  position: absolute;
  top: 150px;
  left: 150px;
  width: 300px;
  background: url(../../../resource/images/icon-prop-dark.png) #343537 8px
    center no-repeat;
  color: #2196f3;
  font-size: 12px;
  line-height: 30px;
  padding: 0 8px;
  border-radius: 2px;
  cursor: pointer;
  z-index: 99999;
  display: none;
}

.monaco-editor.vs-dark .chartSetting span {
  display: block;
  text-indent: 20px;
  background: url(../../../resource/images/icon-enter-dark.png) right center
    no-repeat;
}
</style>