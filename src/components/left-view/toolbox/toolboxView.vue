<template>
  <master-page @closeClick="$emit('closeClick')">
    <template slot="header-title">工具箱</template>
    <section :class="search" slot="header-content">
      <i-select size="small" class="vInputs" style="display:block">
        <i-option value="das">dsa</i-option>
      </i-select>
      <i-button size="small" icon="ios-search" class="btn-search" @click="searching"></i-button>
    </section>
    <div class="m-widgets">
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
import MasterPage from "../../view/view-master-page.vue";
import { mapState } from "vuex";
export default {
  name: "ToolboxView",
  components: { MasterPage },
  data() {
    return {
      search: "panelTools"
    };
  },
  computed: {
    ...mapState("codeEditorStore", ["vuiData"]),
    toolboxItems() {
      let toolboxItems = [];
      let i = 0;
      let groupItems;
      let groupTitle = "分组";
      let group;
      let vuis = this.vuiData;
      for (const vui in vuis) {
        if (vuis.hasOwnProperty(vui)) {
          const vuiObj = vuis[vui];
          if (i % 10 == 0) {
            groupItems = [];
            group = { groupTitle, groupItems };
            toolboxItems.push(group);
          }
          groupItems.push({
            code: vui,
            name: vuiObj.label,
            vuiObj
          });
        }
        i++;
      }
      return toolboxItems;
    }
  },
  methods: {
    searching() {
      this.search = "panelTools s-searching";
    },
    drag(ev, vui) {
      ev.effectAllowed = "move";
      ev.dataTransfer.setData("Text", vui.vuiObj.autoCompleteSource);
      ev.dataTransfer.setDragImage(ev.target, 0, 0);
    },
    insert(vui) {
      this.v3global.executeCmd("insertValueAsSnippet", vui.vuiObj.autoCompleteSource);
    }
  }
};
</script>
