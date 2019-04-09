<template>
  <Modal v-model="visible" mask :mask-closable="false" title="Vui 向导" :width="1000" @on-ok="ok">
    <div class="wz-content">
      <Form>
        <Row :gutter="16">
          <i-col span="10">
            <FormItem label="目标容器">
              <Select v-model="formTmpData.container">
                <Option value="root">root</Option>
                <Option v-for="e in containers" :key="e.tag" :value="e.tag">{{e.tag}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="10">
            <FormItem label="数据源">
              <Select v-model="formTmpData.dataSource">
                <Option
                  v-for="e in entities"
                  :key="e.code"
                  :value="e.code"
                >{{`${e.code}(${e.name})`}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="2">
              <FormItem label="确定">
              <Button type="primary" @click="add()">添加</Button>
            </FormItem>
          </i-col>
        </Row>
      
      </Form>
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
  data() {
    return {
      visible: false,
      dsTableColumns: [
        {
          title: "数据源",
          key: "dataSource"
        },
        {
          title: "容器",
          key: "container"
        }
      ],
      dsTableData: [],
      formTmpData: {
        dataSource: "",
        container: ""
      },
      entities: [],
      containers: []
    };
  },
  methods: {
    ...mapGetters("codeEditorStore", ["getHtmlEditorNodesSameLevel"]),
    ok() {
      debugger;
    },
    add() {
      this.dsTableData.push({
        dataSource: this.formTmpData.dataSource,
        container: this.formTmpData.container
      });
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
      if (!n) {
        //this.dsTableData.splice(0, this.dsTableData.length);
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

