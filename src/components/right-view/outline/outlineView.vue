<template>
  <master-page class="p-event" @closeClick="$emit('closeClick')">
    <template slot="header-title">层级树</template>
    <Tree
      :data="htmlEditorOutline"
      :render="renderContent"
      @on-select-change="onSelectChange"
      v-show="visibleTrigger"
    ></Tree>
  </master-page>
</template>
<script>
import MasterPage from "../../view/view-master-page.vue";
import outlineHandler from "./outlineHandler";
import { mapState } from "vuex";
import commandObj from '../../../app/command'

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
    ...mapState("codeEditorStore", ["htmlEditorNodes", "currentEditorKey"]),
    htmlEditorOutline() {
      let data = []; 
      outlineHandlerObj.buildOutline(data, this.htmlEditorNodes);
      return data;
    },
    visibleTrigger(){
      return this.currentEditorKey ==commandObj.devEditorKeys().template || this.currentEditorKey==commandObj.defaultEditorKeys().html
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
            cursor: "default"
          },
          on: {
            click: () => {
              this.onSelectChange(node, data);
            }
          }
        },
        [
          h("span", [
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
          ])
        ]
      );
    },
    onSelectChange(selectedNodes, selectedNode) {
      outlineHandlerObj.onOuntlineItemChanged(selectedNode);
    }
  }
};
</script>

