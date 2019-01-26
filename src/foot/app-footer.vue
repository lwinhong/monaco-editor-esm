<template>
  <div class="footer titleBackColor">
    <ul>
      <li
        v-for="item in items"
        :key="item.key"
        :title="item.title"
        @click="$emit('itemClick', item)"
      >
        <Dropdown v-if="item.items" :transfer="true">
          <a href="javascript:void(0)">
            <Icon v-if="item.icon" :type="item.icon" :size="16"/>
            {{item.text}}
          </a>
          <DropdownMenu slot="list">
            <DropdownItem v-for="i in item.items" :key="i.key" v-show="i.visible">{{i.text}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <a href="javascript:void(0)" v-else>
          <Icon v-if="item.icon" :type="item.icon" :size="17"/>
          {{item.text}}
        </a>
      </li>

      <!-- 显示当前选中的行列 -->
      <li class="li-right">
        <a
          href="javascript:void(0)"
          @click="$emit('itemClick', {key:'setEditorFocus', value:'focus'})"
        >{{rowColMsg}}</a>
      </li>

      <!-- 显示错误和建议 -->
      <li
        :title="errorMsg"
        v-show="errorMsgVisible"
        class="li-right"
        v-for="msg in messageFlowData"
        :key="msg.key"
      >
        <a
          href="javscript:void(0);"
          @click="$emit('itemClick', {key:'showMessageFlow', value:msg.key})"
        >
          <Icon :type="msg.icon" :color="msg.color" :size="15"/>
          {{msg.key==='error'?errorMsgCount:suggestMsgCount}}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { eventBus } from "../app/event-bus";

export default {
  name: "AppFooter",
  created() {
    eventBus.$on("updateCursorPosition", position => {
      if (position) {
        this.selectionRow = position.lineNumber;
        this.selectionCol = position.column;
      }
    });
    eventBus.$on("updateMessageCount", obj => {
      this.errorMsgCount = obj.errorMsgCount;
      this.suggestMsgCount = obj.suggestMsgCount;
    });
  },
  data() {
    return {
      selectionRow: 0,
      selectionCol: 0,
      errorMsgCount: 0,
      suggestMsgCount: 0,
      messageFlowData: [
        {
          key: "suggest",
          icon: "md-alert",
          color: "#ff9900"
        },
        {
          key: "error",
          icon: "md-close-circle",
          color: "#ed4014"
        }
      ],
      items: [
        {
          key: "format",
          text: "格式化",
          title: "格式化 shift + alt + F",
          icon: "md-code"
        },
        {
          key: "commentLine",
          text: "注释",
          title: "注释 ctrl + /",
          icon: "ios-list"
        },
        {
          key: "insertResource",
          text: "插入资源",
          title: "插入资源",
          icon: "md-add-circle",
          items: [
            {
              key: "insertV3Resource",
              text: "插入构件资源",
              title: "插入构件资源",
              visible: true
            },
            {
              key: "insertShareResource",
              text: "插入文件资源",
              title: "插入文件资源",
              visible: formType !== "Mobile"
            }
          ]
        },
        {
          key: "vlist",
          text: "语法",
          title: "v指令",
          icon: "ios-list-box-outline"
        },
        {
          key: "find",
          text: "搜索",
          title: "搜索 ctrol + F",
          icon: "ios-search"
        },
        {
          key: "quickCommand",
          text: "命令面板",
          title: "命令面板 F1",
          icon: "md-list"
        }
      ]
    };
  },
  computed: {
    rowColMsg() {
      return `行${this.selectionRow} 列${this.selectionCol}`;
    },
    errorMsg() {
      return `${this.errorMsgCount}个错误,${this.suggestMsgCount}个警告`;
    },
    errorMsgVisible() {
      return this.errorMsgCount + this.suggestMsgCount > 0;
    }
  }
};
</script>
<style scoped>
.footer {
  height: 100%;
  border-top: rgb(204, 204, 204) 1px solid;
}

ul {
  /*设置导航栏的框框*/
  width: 100%; /*框框的宽度*/
  height: 100%; /*框框的长度*/
  padding: 0px; /*将框框的padding设置为零，不然会导致框框里的内容与框边缘有间隔*/
}
li {
  list-style-type: none; /* 去掉li前的点 */
  float: left; /*将li设置成做浮动，变为联动*/
}
.li-right {
  float: right; /*将li设置成做浮动，变为联动*/
}
a {
  display: block; /*将a变成块状*/
  font-family: Microsoft Yahei;
  line-height: 25px; /*设置字体在块中的高度*/
  padding: 0px 5px; /*块里的高宽通过margin设置*/
  color: #495060;
  text-align: center; /*字体居中*/
  text-decoration: none; /*去掉下划线*/
  font-size: 12px;
}
a:hover {
  background-color: #e0e4e2;
  color: #2d8cf0;
  cursor: pointer;
}
</style>
