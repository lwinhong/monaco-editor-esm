<template>
  <master-page class="p-event" @closeClick="$emit('closeClick')">
    <template slot="header-title">层级树</template>
    <Tree :data="htmlEditorOutline" @on-select-change="onSelectChange"></Tree>
  </master-page>
</template>
<script>
import MasterPage from "../../view/view-master-page.vue";
import outlineHandler from "./outlineHandler";
import { mapState } from "vuex";

let outlineHandlerObj;
export default {
  components: {
    MasterPage
  },
  created() {
    outlineHandlerObj = new outlineHandler(this);
    outlineHandlerObj.initEventBus(this);
  },
  mounted() {},
  data() {
    return {
      outlineData: []
    };
  },
  computed: {
    htmlEditorOutline() {
      let data = this.outlineData;
      outlineHandlerObj.buildOutline(data, this.htmlEditorNodes);
      return data;
    },
    ...mapState("codeEditorStore", {
      htmlEditorNodes: state => state.htmlEditorNodes
    })
  },
  methods: {
    onSelectChange(selectedNodes, selectedNode) {
      var e = selectedNode.element;
      //e.startSourceSpan.start.col/line/offset
    }
  }
};
</script>
