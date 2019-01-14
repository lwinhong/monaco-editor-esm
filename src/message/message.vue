<template>
  <div>
    <div class="titleBar">
      <span @click="change('error')" title="错误">错误 {{errorCount}}</span>
      <span @click="change('suggest')" title="警告">警告 {{suggusetCount}}</span>
    </div>
    <div>
      <i-table
        :columns="msgColumn"
        :data="errorData"
        @on-row-dblclick="localMessage"
        v-show="currentListName ==='error'"
        size="small"
        :height="140"
      ></i-table>
      <i-table
        :columns="msgColumn"
        :data="suggestData"
        @on-row-dblclick="localMessage"
        v-show="currentListName ==='suggest'"
        size="small"
        :height="140"
      ></i-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "Message",
  props: {
    suggestData: {
      type: Array,
      default: []
    },
    errorData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      currentListName: "error",
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
              params.row.message
            );

            const icon = h("Icon", {
              props: {
                type:
                  this.currentListName == "error"
                    ? "md-close-circle"
                    : "md-thumbs-down",
                color: this.currentListName == "error" ? "red" : "green"
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
  computed: {
    errorCount() {
      return this.errorData.length;
    },
    suggusetCount() {
      return this.suggestData.length;
    }
  },
  methods: {
    localMessage(row, index) {
      this.$emit("localMessage", row, index, this.currentListName);
    },
    change(name) {
      this.currentListName = name;
    }
  }
};
</script>
<style scoped>
.titleBar {
  background-color: rgb(238, 238, 240);
}
.titleBar span {
  cursor: pointer;
}
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

