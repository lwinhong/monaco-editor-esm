<template>
  <Modal v-model="visible" mask :mask-closable="false" title="Vui 向导" :width="1000" @on-ok="ok">
    <div class="wz-content">
      <Table :columns="dsTableColumns" :data="dsTableData" width="100%" height="200"></Table>
    </div>
  </Modal>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import wizard from "./componentWizard";
var wizardHandler;
export default {
  name: "componentWizard",
  created() {
    wizardHandler = new wizard(this);
  },
  mounted() {},
  //   props: {
  //     visible: { type: Boolean, default: true }
  //   },
  data() {
    return {
      visible: false,
      dsTableColumns: [
        {
          title: "数据源",
          key: "dataSource",
          render: (h, params) => {
            return h(
              "Select",
              {
                on: {
                  onChange: event => {
                    this.entities[params.index].dataSource = event;
                  }
                }
              },
              this.entities.map(item => {
                return [
                  h(
                    "Option",
                    {
                      props: {
                        value: item.name,
                        key: item.code
                      }
                    },
                    `${item.code} (${item.name})`
                  )
                ];
              })
            );
          }
        },
        {
          title: "容器",
          key: "container",
          render: (h, params) => {
            return h(
              "Select",
              {
                on: {
                  onChange: event => {
                    this.containers[params.index].container = event;
                  }
                }
              },
              this.containers.map(item => {
                return [
                  h(
                    "Option",
                    {
                      props: {
                        value: item.tag,
                        key: item.tagName
                      }
                    },
                    `${item.tag} (${item.tagName})`
                  )
                ];
              })
            );
          }
        }
      ],
      dsTableData: [{ dataSource: "", container: "" }],
      entities: [],
      containers: []
    };
  },
  methods: {
    ...mapGetters("codeEditorStore", ["getHtmlEditorNodesSameLevel"]),
    ok() {
      debugger;
    },
    showWizard() {
      let wizardHandler = new wizard(this);
      wizardHandler.getContainer(
        this.getHtmlEditorNodesSameLevel(),
        this.containers
      );

      wizardHandler.getEntities(this.entities);
      this.visible = true;
    }
  },
  watch: {
    visible(n, o) {
      if (n) {
        this.dsTableData.splice(0, this.dsTableData.length);
        this.entities.splice(0, this.entities.length);
      }
    }
  }
};
</script>
<style scoped>
.wz-content {
  height: 500px;
}
</style>

