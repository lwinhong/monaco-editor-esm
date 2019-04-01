<template>
  <Modal v-model="visible" mask :mask-closable="false" title="Vui 向导" :width="1000" @on-ok="ok">
    <div class="wz-content">
      <Table :columns="dsTableColumns" :data="dsTableData" width="100%" height="200"></Table>
    </div>
  </Modal>
</template>
<script>
export default {
  name: "componentWizard",
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
          key: "container"
        }
      ],
      dsTableData: [{ dataSource: "", container: "" }],
      entities: []
    };
  },
  methods: {
    ok() {},
    showWizard() {
      const ds = window.v3global.dataSourceHandler.getDataSource();
      var dsData = ds.getEntities();
      if (!dsData) return;
      let _this = this;
      this.entities.splice(0, this.entities.length);

      $.each(dsData, function(i, data) {
        _this.entities.push({
          code: i,
          name: data.name,
          columns: data.columns
        });
      });

      this.visible = true;
    }
  },
  watch: {
    visible(n, o) {
      if (n) {
        //this.dsTableData.splice(0, this.dsTableData.length);
        //this.entities.splice(0, this.entities.length);
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

