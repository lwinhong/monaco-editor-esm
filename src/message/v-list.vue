<template>
  <div id="vlist">
    <div class="message-titleBar">
      v 指令
    </div>
    <i-table stripe :data="listDataSource" size="small" :columns="columns" @on-row-dbclick="rowDbClick" :height="140"></i-table>
  </div>
</template>
<script>
export default {
  name: "Vlist",
  data() {
    return {
      listDataSource: [
        { v: "v-text", desc: "文本哦", simple: "<span v-text='实体.字段'/>" },
        { v: "v-text", desc: "文本哦", simple: "<span v-text='实体.字段'/>" },
        { v: "v-text", desc: "文本哦", simple: "<span v-text='实体.字段'/>" },
        { v: "v-text", desc: "文本哦", simple: "<span v-text='实体.字段'/>" },
        { v: "v-text", desc: "文本哦", simple: "<span v-text='实体.字段'/>" },
        { v: "v-text", desc: "文本哦", simple: "<span v-text='实体.字段'/>" }
      ],
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
    rowDbClick(row, index) {}
  }
};
</script>
