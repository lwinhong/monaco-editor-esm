<template>
  <div id="vlist">
    <div class="message-titleBar">v 指令</div>
    <i-table
      border
      :data="listDataSource"
      size="small"
      :columns="columns"
      @on-row-dblclick="rowDbClick"
      :height="200"
    ></i-table>
  </div>
</template>
<script>
export default {
  name: "Vlist",
  data() {
    return {
      listDataSource: [],
      columns: [
        {
          type: "index",
          width: 50,
          align: "center"
        },
        {
          title: "v指令",
          key: "v",
          width: 100
        },
        {
          title: "说明",
          key: "desc",
          width: 200
        },
        {
          title: "示例",
          key: "simple"
        }
      ]
    };
  },
  methods: {
    rowDbClick(row, index) {
      this.$emit("insertVlanguage", row.v);
    },
    loadVList() {
      const tree = this.listDataSource;
      tree.splice(0, tree.length);
      try {
        window.global.dataSourceHandler.getDataSource().getVlanguage(data => {
          if (!data) return;
          $.each(data, function(i, data) {
            let en = { v: i, desc: data.name, simple: data.desc };
            tree.push(en);
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.loadVList();
  }
};
</script>
