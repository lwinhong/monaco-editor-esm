<template>
  <master-page @closeClick="$emit('closeClick')">
    <template slot="header-title">工具箱</template>
    <section :class="search" slot="header-content">
      <i-select size="small" class="vInputs" style="display:block">
        <i-option value="das">dsa</i-option>
      </i-select>
      <i-button size="small" icon="ios-search" class="btn-search" @click="searching"></i-button>
    </section>
    <div class="m-widgets" v-show="visibleTrigger">
      <dl v-for="(group,i) of toolboxItems" :key="group.groupTitle+i">
        <dt>{{group.groupTitle}}</dt>
        <dd
          v-for="(vui,i) of group.groupItems"
          :key="vui.code+i"
          :draggable="true"
          @dragstart="drag($event,vui)"
          @dblclick="insert(vui)"
        >
          <icon custom="vicon ico-layer" size="14"></icon>
          {{`${vui.code}(${vui.name})`}}
        </dd>
      </dl>
    </div>
  </master-page>
</template>
<script>
import MasterPage from "../view-master-page.vue";
import commandObj from "../../../app/command";
import { cmdData } from "../../../app/command";
import { eventBus } from "../../../app/event-bus";
import { newWidgetCode1 } from "../../editor/handler/htmlEditor/editorUtil";
import { createNamespacedHelpers } from "vuex";
const {
  mapState
  // mapActions,
  // mapGetters,
  // mapMutations
} = createNamespacedHelpers("codeEditorStore");

export default {
  name: "ToolboxView",
  components: { MasterPage },
  created() {
    eventBus.$on("executeCmd", (cmd, value) => {
      if (cmd == cmdData.dataLoaded) {
        let data = this.v3global.dataSourceHandler.getVuiTag();
        this.loadToolboxItems(data);
      }
    });
  },
  data() {
    return {
      search: "panelTools",
      toolboxItems: []
    };
  },
  computed: {
    ...mapState(["vuiData", "currentEditorKey", "widgetCodes"]),
    visibleTrigger() {
      return (
        this.currentEditorKey == commandObj.devEditorKeys().template ||
        this.currentEditorKey == commandObj.defaultEditorKeys().html
      );
    }
  },
  methods: {
    searching() {
      this.search = "panelTools s-searching";
    },
    loadToolboxItems(vuis) {
      this.toolboxItems = [];
      let i = 0;
      let groupItems;
      let groupTitle = "分组";
      let group;
      for (const vui in vuis) {
        if (vuis.hasOwnProperty(vui)) {
          const vuiObj = vuis[vui];
          if (i % 10 == 0) {
            groupItems = [];
            group = { groupTitle, groupItems };
            this.toolboxItems.push(group);
          }
          groupItems.push({
            code: vui,
            name: vuiObj.label,
            vuiObj
          });
        }
        i++;
      }
    },
    drag(ev, vui) {
      ev.effectAllowed = "move";
      ev.dataTransfer.setData("Text", this.wrapperAutoCompleteSource(vui));
      ev.dataTransfer.setDragImage(ev.target, 0, 0);
    },
    wrapperAutoCompleteSource(vui) {
      let code = newWidgetCode1(vui.code, this.widgetCodes);
      return String.format(vui.vuiObj.autoCompleteSource, code);
    },
    insert(vui) {
      this.v3global.executeCmd(
        "insertValueAsSnippet",
        this.wrapperAutoCompleteSource(vui)
      );
    }
  }
};
</script>
