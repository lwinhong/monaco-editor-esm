<template>
  <div class="app fill">
    <app-mask v-if="isMaskShow"></app-mask>
    <layout>
      <layout>
        <i-content>
          <app-editor ref="editor"></app-editor>
        </i-content>
        <sider
          ref="sideRight"
          collapsible
          hideTrigger
          :width="354"
          :collapsed-width="44"
          v-model="isCollapsed"
          @on-collapse="onSiderCollapse"
        >
          <app-right-view
            ref="rightView"
            @closeClick="isCollapsed=true"
            @itemClick="isCollapsed=false"
            :leftContentVisible="!isCollapsed"
            @rightCloseClick="isCollapsed=!isCollapsed"
          ></app-right-view>
        </sider>
      </layout>
      <Footer>
        <app-footer @itemClick="footItemClick"></app-footer>
      </Footer>
    </layout>
  </div>
</template>
<script>
import AppMask from "./app-mask.vue";
import AppEditor from "./editor/app-editor.vue";
import AppFooter from "./foot/app-footer.vue";
import AppRightView from "./right-view/app-rightView.vue";

export default {
  name: "App",
  components: {
    AppMask,
    AppEditor,
    AppFooter,
    AppRightView
  },
  data() {
    return {
      isCollapsed: false,
      isMaskShow: false
    };
  },
  methods: {
    collapsedSider() {
      //this.$refs.sideRight.toggleCollapse();
      //isCollapsed = false;
    },
    footItemClick(item) {
      this.$refs.editor.footItemClick(item);
    },
    onSiderCollapse(e) {
      this.$refs.editor.editorLayout();
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.isMaskShow = false;
    // }, 500);
  }
};
</script>
<style scoped>
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
.titleBackColor {
  background-color: rgb(238, 238, 240) !important;
}
</style>

