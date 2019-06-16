<template>
  <Modal v-model="visible" mask :mask-closable="false" title="Vui 向导" :width="700" @on-ok="ok">
    <div class="wz-content">
      <Steps :current="step">
        <Step title="选择数据源" content="请选择数据源"></Step>
        <Step title="选择字段" content="请选择用于生成字段标签的字段"></Step>
      </Steps>
      <br>
      <br>
      <div v-show="step==0">
        <Table
          highlight-row
          :columns="dsTableColumns"
          :data="entities"
          width="100%"
          height="200"
          @on-current-change="entitySelectedChange"
        >
          <template slot-scope="{ row }" slot="code">
            <span>{{`${row.code}(${row.name})`}}</span>
          </template>
        </Table>
      </div>
      <div v-show="step==1">
        <Table highlight-row :columns="filedsColumns" :data="fileds" width="100%" height="200">
          <template slot-scope="{ row }" slot="code">
            <span>{{`${row.code}(${row.name})`}}</span>
          </template>
        </Table>
      </div>
    </div>
    <div slot="footer">
      <Button @click="visible=false" type="text">取消</Button>
      <Button @click="step=0" v-show="step==1" type="primary">上一步</Button>
      <Button @click="next" v-show="step==0" type="primary">下一步</Button>
      <Button @click="ok" v-show="step==1" type="primary">确定</Button>
    </div>
  </Modal>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import wizard from "./componentWizard";

export default {
  name: "componentWizard",
  created() {},
  data() {
    return {
      step: 0,
      visible: false,
      dsTableColumns: [
        {
          type: "index",
          width: 50,
          align: "center"
        },
        {
          title: "实体",
          key: "code"
        }
      ],
      filedsColumns: [
        {
          type: "index",
          width: 50,
          align: "center"
        },
        {
          type: "selection",
          width: 50,
          align: "center"
        },
        {
          title: "字段",
          key: "code"
        }
      ],
      entities: [],
      fileds: []
    };
  },
  methods: {
    ...mapGetters("codeEditorStore", ["getHtmlEditorNodesSameLevel"]),
    ok() {
      debugger;
    },
    entitySelectedChange(currentRow) {
      this.currentRow = currentRow;
    },
    next() {
      this.step = 1;
      this.fileds = this.currentRow.columns;
    },
    showWizard() {
      if (!this.wizardHandler) this.wizardHandler = new wizard(this);
      this.wizardHandler.getEntities(this.entities);
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
  height: 300px;
}
/* .wz-step-btn {
  border-top: 1px solid #e8eaec;
  padding: 12px 0px;
  text-align: right;
} */
</style>

