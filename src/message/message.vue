<template>
  <div class="fill" id="message">
    <div class="message-titleBar">
      <span @click="change(errorFlag)" title="错误" :class="isError?'span-selected':''">
        <Icon type="md-close-circle" color="#ed4014"></Icon>
        错误 {{errorCount}}
      </span>
      <span @click="change(suggestFlag)" title="警告" :class="isSuggest?'span-selected':''">
        <Icon type="md-alert" color="#ff9900"></Icon>
        警告 {{suggusetCount}}
      </span>
    </div>
    <div>
      <i-table
        :columns="msgColumn"
        :data="errorData"
        @on-row-dblclick="localMessage"
        v-show="isError"
        size="small"
        :height="140"
      ></i-table>
      <i-table
        :columns="msgColumn"
        :data="suggestData"
        @on-row-dblclick="localMessage"
        v-show="isSuggest"
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
      errorFlag: "error",
      suggestFlag: "suggest",
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
                type: this.isError ? "md-close-circle" : "md-alert",
                color: this.isError ? "#ed4014" : "#ff9900"
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
    },
    isError() {
      return this.currentListName === this.errorFlag;
    },
    isSuggest() {
      return this.currentListName === this.suggestFlag;
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
.message-titleBar .span-selected {
  background-color: white;
  border: 1px solid gray;
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

.message-titleBar {
  background-color: rgb(238, 238, 240);
  height: 18px;
  padding-left: 5px;
  border-right: 1px solid #dcdee2;
}
.message-titleBar span {
  cursor: pointer;
}
</style>

