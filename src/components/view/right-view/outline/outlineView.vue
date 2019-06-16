<template>
  <master-page class="p-event" @closeClick="$emit('closeClick')">
    <template slot="header-title">层级树</template>
    <Tree :data="htmlEditorOutline" :render="renderContent" v-show="visibleTrigger"></Tree>
    <input type="hidden" v-model="setSelecedNodeTrigger">
    <!-- <Dropdown
      transfer
      placement="right-start"
      trigger="custom"
      ref="contextMenu"
      :visible="currentVisible"
      @on-clickoutside="handleCancel"
    >
      <DropdownMenu slot="list">
        <DropdownItem>删除</DropdownItem>
        <DropdownItem>控件向导</DropdownItem>
      </DropdownMenu>
    </Dropdown> -->
  </master-page>
</template>
<script>
import MasterPage from "../../view-master-page.vue";
import outlineHandler from "./outlineHandler";
import { createNamespacedHelpers } from "vuex";
import commandObj from "../../../../app/command";
const editors = [
  commandObj.devEditorKeys().template,
  commandObj.defaultEditorKeys().html
];
const {
  mapState: mapEditorState
  //mapGetters: mapEditorGetters
} = createNamespacedHelpers("codeEditorStore");

let outlineHandlerObj;
export default {
  components: {
    MasterPage
  },
  created() {
    outlineHandlerObj = new outlineHandler(this);
  },
  mounted() {
    //document.addEventListener("contextmenu", this.handleContextmenu, true);
    // document.addEventListener("mousedown", this.handleCancel, true);
  },
  data() {
    return {
      outlineData: [],
      selectedNodeKey: 0,
      isSetPointByCurrent: false,
      // currentVisible: false
    };
  },
  computed: {
    ...mapEditorState(["htmlEditorNodes", "currentEditorKey", "currentNode"]),
    htmlEditorOutline() {
      let data = [];
      outlineHandlerObj.buildOutline(data, this.htmlEditorNodes);
      return data;
    },
    setSelecedNodeTrigger() {
      if (!this.isSetPointByCurrent) {
        outlineHandlerObj.setSelectNode(this.currentNode);
      }
      this.isSetPointByCurrent = false;
      return this.currentNode;
    },
    visibleTrigger() {
      return $.inArray(this.currentEditorKey, editors) != -1;
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
    },
    // handleContextmenu(e) {
    //   e.preventDefault();

    //   this.$refs.contextMenu.$refs.reference = e.target;
    //   this.currentVisible = !this.currentVisible;
    // },
    // handleCancel() {
    //   this.currentVisible = false;
    // }
  },
  destroyed() {
    //document.removeEventListener("contextmenu", this.handleContextmenu, true);
    // document.removeEventListener("mousedown", this.handleCancel, true);
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

