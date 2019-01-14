<template>
  <i-table
    :columns="msgColumn"
    :data="dataSource"
    size="small"
    :height="140"
    @on-row-dblclick="localMessage"
  ></i-table>
</template>
<script>
export default {
  name: "MessageList",
  props: {
    dataSource: {
      type: Array,
      default: []
    },
    listType: {
      type: String
    }
  },
  data() {
    return {
      msgColumn: [
        {
          type: "index",
          width: 50,
          align: "center"
        },
        {
          title: "说明",
          key: "message",
          render: (h, params) => {
            const span = h(
              "span",
              {
                style: {
                  verticalAlign: "middle",
                  paddingLeft: "3px"
                }
              },
              params.row.desc
            );

            const icon = h("Icon", {
              props: {
                type:
                  this.listType == "error"
                    ? "md-close-circle"
                    : "md-thumbs-down",
                color: this.listType == "error" ? "red" : "green"
              }
            });
            var elements = [icon, span];
            if (params.row.ruleUrl) {
              const a = h(
                "a",
                {
                  attrs: {
                    href: "javascript: void(0);",
                    title: params.row.ruleUrl
                  },
                  on: {
                    click: () => {
                      //executeCmdWithValue(cmdData.openValidateRule, params.row.ruleUrl)
                    }
                  }
                },
                ` (${params.row.ruleId})`
              );
              elements.push(a);
            }

            return h("div", elements);
          }
        },
        { title: "行", width: 50, key: "startLineNumber" },
        { title: "列", width: 50, key: "startColumn" },
        { title: "模块", width: 100, key: "moduleName" }
      ]
    };
  },
  methods: {
    localMessage(row, index) {
      this.$emit("local-message", row, index);
    }
  }
};
</script>
<style scoped>
</style>
<style>
.ivu-table-small td {
  height: 25px;
}

.ivu-table-small th {
  height: 25px;
}

.ivu-table-cell {
  padding-left: 5px !important;
  padding-right: 5px !important;
}
</style>


