<template>
  <div id="foot-message-flow" v-show="showMessageFlow">
    <div id="expander"></div>
    <div id="controlboxs">
      <img id="fixedOrFlowImg" :src="flowIconSrc" title="固定/浮动" @click="changeFlow">
      <img
        id="errorCloseImg"
        src="../resource/images/close.png"
        title="关闭"
        @click="setVisible(false)"
      >
    </div>
    <message
      ref="messageFlow"
      :errorData="errorData"
      :suggestData="suggestData"
      @localMessage="localMessage"
      v-show="messageListVisible"
    ></message>
    <!-- <v-list v-show="vListVisible" @insertVlanguage="insertVlanguage"></v-list> -->
  </div>
</template>
<script>
import Message from "../message/message.vue";
// import VList from "./v-list.vue";
import { eventBus } from "../app/event-bus";
import { cmdData } from '../app/command';

const flowSrc = "./resource/images/flow.png";
const fixedSrc = "./resource/images/fixed.png";

export default {
  name: "AppMessageFlow",
  components: { Message /*VList*/ },
  created() {
    eventBus.$on(cmdData.executeCmd, (cmd, value) => {
      if (cmd == "showMessageFlow") {
        //debugger;
        this.setVisible(true);
        this.toggleShow(value);
      }
    });
  },
  props: {},
  data() {
    return {
      showMessageFlow: false,
      flow: true,
      currentList: "vlist",
      errorData: [],
      suggestData: []
    };
  },
  computed: {
    flowIconSrc() {
      return this.flow ? flowSrc : fixedSrc;
    },
    messageListVisible() {
      return this.currentList === "message";
    },
    vListVisible() {
      return this.currentList === "vlist";
    }
  },
  methods: {
    //切换（vlist，错误信息【错误和建议】）
    toggleShow(value) {
      if (value) {
        if (value === "vlist") this.currentList = value;
        else {
          this.currentList = "message";
          this.$refs.messageFlow.change(value);
        }
      }

      if (this.showMessageFlow) return;
      let tmp = !this.showMessageFlow;
      this.setVisible(tmp);
    },
    //设置显示隐藏
    setVisible(value) {
      this.showMessageFlow = value;
    },
    //切换固定和自动关闭
    changeFlow() {
      this.flow = !this.flow;
    },
    //参数隐藏当前组件
    tryToHide() {
      if (this.flow && this.showMessageFlow) this.setVisible(false);
    },
    //定位错误信息【错误和建议】
    localMessage(row, index, type) {
      this.$emit("localMessage", row, index, type);
    },
    insertVlanguage(vlanguage) {
      this.$emit("insertVlanguage", vlanguage);
    }
  },
  mounted() {
    $(function() {
      var srcPosiY = 0,
        destPosiY = 0,
        moveY = 0,
        destHeight = 30;

      //鼠标按下，记录按下位置和bind 移动和鼠标释放时间
      $("#expander").mousedown(function(e) {
        srcPosiY = e.pageY;
        $(document)
          .bind("mousemove", mouseMove)
          .bind("mouseup", mouseUp);

        e.preventDefault();
      });

      //移动事件
      function mouseMove(e) {
        var footstatusbar = $("#foot-message-flow");
        destPosiY = e.pageY;
        moveY = srcPosiY - destPosiY;
        srcPosiY = destPosiY;
        destHeight = footstatusbar.height() + moveY;

        var lastHeight = destHeight > 30 ? destHeight : 30;
        //debugger;
        footstatusbar.css("height", lastHeight);
        $(".ivu-table-wrapper").css("height", lastHeight);
        $(".ivu-table-body").css("height", lastHeight - 25);
      }
      //停止事件
      function mouseUp() {
        //卸载事件
        $(document)
          .unbind("mousemove", mouseMove)
          .unbind("mouseup", mouseUp);
      }
    });
  }
};
</script>
<style scoped>
#expander {
  background-color: transparent;
  width: 100%;
  height: 5px;
  border: 1px solid rgb(204, 204, 204);
  border-bottom: none;
  border-left: none;
  position: absolute;
  top: 0px;
  cursor: n-resize;
}

/* #expander:hover {
  cursor: n-resize;
} */

#foot-message-flow {
  /* bottom: -100%; */
  /* bottom: 0px; */
  height: 200px;
  left: 0;
  position: fixed;
  /* width: 100%;  */
  z-index: 5;
  right: 43px;
  vertical-align: middle;
  background-color: white;
}

#controlboxs {
  top: 0px;
  right: 6px;
  z-index: 1050;
  position: absolute;
}

#controlboxs img {
  margin: 2px;
  vertical-align: middle;
  cursor: pointer;
}
/* #controlboxs img:hover {
  background-color: #e0e4e2;
  color: #2d8cf0;
} */
</style>
<style>
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



