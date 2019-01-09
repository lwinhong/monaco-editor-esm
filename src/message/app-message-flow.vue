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
    <message></message>
  </div>
</template>
<script>
import Message from "../message/message.vue";

var flow = true;
const flowSrc = "./resource/images/flow.png";
const fixedSrc = "./resource/images/fixed.png";

export default {
  name: "AppMessageFlow",
  components: { Message },
  data() {
    return {
      showMessageFlow: false,
      flowIconSrc: flowSrc
    };
  },
  methods: {
    toggleShow() {
      let value = !this.showMessageFlow;
      this.setVisible(value);
    },
    setVisible(value) {
      this.showMessageFlow = value;
    },
    changeFlow() {
      flow = !flow;
      this.flowIconSrc = flow ? flowSrc : fixedSrc;
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
</style>


