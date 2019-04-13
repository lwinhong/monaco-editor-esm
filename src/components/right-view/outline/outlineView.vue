<template>
  <master-page class="p-event" @closeClick="$emit('closeClick')">
    <template slot="header-title">层级树</template>
    <Tree :data="htmlEditorOutline" :render="renderContent" v-show="visibleTrigger"></Tree>
    <input type="hidden" v-model="setSelecedNodeTrigger">
  </master-page>
</template>
<script>
import MasterPage from "../../view/view-master-page.vue";
import outlineHandler from "./outlineHandler";
import { createNamespacedHelpers } from "vuex";
import commandObj from "../../../app/command";
const {
  mapState: mapEditorState,
  mapGetters: mapEditorGetters
} = createNamespacedHelpers("codeEditorStore");

let outlineHandlerObj;
export default {
  components: {
    MasterPage
  },
  created() {
    outlineHandlerObj = new outlineHandler(this);
  },
  mounted() {},
  data() {
    return {
      outlineData: [],
      selectedNodeKey: 0,
      isSetPointByCurrent: false
    };
  },
  computed: {
    ...mapEditorState([
      "htmlEditorNodes",
      "currentEditorKey",
      "cursorPositionOffset"
    ]),
    ...mapEditorGetters(["getNearestNode"]),
    htmlEditorOutline() {
      let data = [];
      //this.selectedNodeKey = 0;
      outlineHandlerObj.buildOutline(data, this.htmlEditorNodes);
      outlineHandlerObj.setSelectNode(this.cursorPositionOffset);
      return data;
    },
    setSelecedNodeTrigger() {
      let position = this.cursorPositionOffset;
      if (!this.isSetPointByCurrent) {
        outlineHandlerObj.setSelectNode(position);
      }
      this.isSetPointByCurrent = false;
      return this.cursorPositionOffset;
    },
    visibleTrigger() {
      return (
        this.currentEditorKey == commandObj.devEditorKeys().template ||
        this.currentEditorKey == commandObj.defaultEditorKeys().html
      );
    }
  },
  methods: {
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%",
            cursor: "pointer"
          },
          on: {
            click: () => {
              this.onSelectChange(node, data);
            }
          }
        },
        [
          h(
            "span",
            {
              class: "mytreeNode",
              style: {
                backgroundColor:
                  this.selectedNodeKey == node.nodeKey ? "#d5e8fc" : ""
              }
            },
            [
              h("Icon", {
                props: {
                  type: "ios-paper-outline"
                },
                style: {
                  marginRight: "8px"
                }
              }),
              h("span", [
                h(
                  "span",
                  {
                    style: {
                      marginRight: "8px"
                    }
                  },
                  data.title
                ),
                h(
                  "span",
                  {
                    style: {
                      color: "gray"
                    }
                  },
                  data.subTitle ? `[${data.subTitle}]` : ""
                )
              ])
            ]
          )
        ]
      );
    },
    onSelectChange(selectedNodes, selectedNode) {
      this.isSetPointByCurrent = true;
      this.selectedNodeKey = selectedNode.nodeKey;
      outlineHandlerObj.onOuntlineItemChanged(selectedNode);
    }
  }
};
</script>
<style >
.ivu-tree .mytreeNode {
  border-radius: 3px;
  transition: all 0.2s ease-in-out;
}

.ivu-tree .mytreeNode:hover {
  background-color: #eaf4fe;
}
</style>

