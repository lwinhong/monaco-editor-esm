<template>
  <div class="app fill">
    <app-mask :visible="isMaskShow"></app-mask>
    <layout>
      <layout>
        <i-content>
          <app-editor></app-editor>
        </i-content>
        <sider
          ref="sideRight"
          collapsible
          hideTrigger
          :width="294"
          :collapsed-width="44"
          v-model="isCollapsed"
        >
          <button @click="collapsedSider">123</button>
        </sider>
      </layout>
      <Footer>
        <app-footer></app-footer>
      </Footer>
    </layout>
    <app-message-flow ref="messageFlow" class="foot-message-flow-show"></app-message-flow>
  </div>
</template>
<script>

import AppMask from "./app-mask.vue";
import AppEditor from "./editor/app-editor.vue";
import AppFooter from "./foot/app-footer.vue";
import AppMessageFlow from "./message/app-message-flow.vue";

export default {
  name: "App",
  components: {
    AppMask,
    AppEditor,
    AppFooter,
    AppMessageFlow
  },
  data() {
    return {
      isCollapsed: true,
      isMaskShow: true
    };
  },
  methods: {
    collapsedSider() {
      this.$refs.sideRight.toggleCollapse();
      this.$refs.messageFlow.toggleShow();
    }
  },
  mounted() {
    setTimeout(() => {
      this.isMaskShow = false;
    }, 500);
  }
};
</script>
<style scoped>
.foot-message-flow-show {
  bottom: 46px !important;
}

.fillMask {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  z-index: 9999;
  background-color: #fff;
  top: 0;
  position: absolute;
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-pack: center;
  -webkit-box-align: center;
}

.fillMask img {
  vertical-align: middle;
}

.fillMask span {
  font-size: 14px;
  color: #555;
  vertical-align: middle;
  padding-left: 16px;
}
</style>
<style>
.ivu-layout-footer {
  padding: 0px;
}
.ivu-layout {
  height: 100%;
}
.ivu-layout-sider {
  background-color: rgb(238, 238, 240);
}
</style>

