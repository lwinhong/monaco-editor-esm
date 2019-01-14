<template>
  <div class="footer">
    <ul>
      <li
        v-for="item in items"
        :key="item.key"
        :title="item.title"
        @click="$emit('itemClick', item)"
      >
        <a href="javscript:void(0);">
          <Icon v-if="item.icon" :type="item.icon" :size="15"/>
          {{item.text}}
        </a>
      </li>
      <li class="li-right">
        <a href="javscript:void(0);">{{rowColMsg}}</a>
      </li>
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
  props: {
    items: {
      type: Array,
      default: []
    }
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
          icon: "md-thumbs-down",
          color: "green"
        },
        {
          key: "error",
          icon: "md-close-circle",
          color: "red"
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
  height: 25px;
  background-color: rgb(238, 238, 240);
  bottom: 0px;
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
