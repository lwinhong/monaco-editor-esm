<template>
  <div class="app fill">
    <Spin size="large" fix v-if="isMaskShow"></Spin>
    <app-preview></app-preview>
    <div class="g-layout">
      <main class="g-body">
        <!--舞台-->
        <div class="g-cont">
          <div class="m-codeView">
            <app-editor ref="editor"></app-editor>
            <!--状态栏{-->
            <app-footer></app-footer>
          </div>
        </div>
        <!--右栏-->
        <app-right-side></app-right-side>
      </main>
      <!--全局状态栏-->
      <footer class="g-footer hide">我是底部状态栏:备用</footer>
    </div>
  </div>
</template>
<script>
import AppMask from "./app-mask.vue";
import AppEditor from "./editor/app-editor.vue";
import AppFooter from "./foot/app-footer1.vue";
import AppRightSide from "./right-view/app-right-side.vue";
import AppRightBar from "./right-view/app-rightBar.vue";
import AppPreview from "./preview/app-preview.vue";
// import { Container, Draggable } from "vue-smooth-dnd";

export default {
  name: "App",
  components: {
    AppMask,
    AppEditor,
    AppFooter,
    AppRightSide,
    AppRightBar,
    AppPreview
    // Container,
    // Draggable
  },
  data() {
    return {
      isCollapsed: true,
      isMaskShow: true,
      items: [
        { key: 1, text: "1111" },
        { key: 2, text: "2222" },
        { key: 3, text: "3333" },
        { key: 4, text: "4444" }
      ]
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
    },
    onRightBarItemClick(item) {
      this.$refs.rightView.changeRightView(item.key);
      this.isCollapsed = false;
    }
  },
  mounted() {
    setTimeout(() => {
      this.isMaskShow = false;
    }, 1000);
  }
};
</script>
<style scoped>
/* .fillMask {
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
} */
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
.setPointer {
  cursor: pointer;
}
</style>

