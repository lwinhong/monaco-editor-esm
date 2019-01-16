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
    <v-list v-show="vListVisible"></v-list>
  </div>
</template>
<script>
import Message from "../message/message.vue";
import VList from "./v-list.vue";

const flowSrc = "./resource/images/flow.png";
const fixedSrc = "./resource/images/fixed.png";

export default {
  name: "AppMessageFlow",
  components: { Message, VList },
  props: {},
  data() {
    return {
      showMessageFlow: true,
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
    toggleShow(valueObj) {
      if (valueObj) {
        if (valueObj === "vlist") this.currentList = valueObj;
        else {
          this.currentList = "message";
          this.$refs.messageFlow.change(valueObj.value);
        }
      }

      if (this.showMessageFlow) return;
      let value = !this.showMessageFlow;
      this.setVisible(value);
    },
    setVisible(value) {
      this.showMessageFlow = value;
    },
    changeFlow() {
      this.flow = !this.flow;
    },
    tryToHide() {
      if (this.flow && this.showMessageFlow) this.setVisible(false);
    },
    localMessage(row, index, type) {
      this.$emit("localMessage", row, index, type);
    }
  }
};
</script>
<style scoped>
#expander {
  width: 100%;
  height: 3px;
  border-bottom: 1px solid #cccccc;
}

#expander:hover {
  cursor: n-resize;
}

#foot-message-flow {
  /* bottom: -100%; */
  bottom: 0px;
  height: 140px;
  left: 0;
  position: fixed;
  width: 100%; 
  z-index: 999;
  vertical-align: middle;
  background-color: white;
}

#controlboxs {
  top: 3px;
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


