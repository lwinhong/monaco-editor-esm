<template>
  <div class="app fill">
    <app-mask v-if="isMaskShow" ref="mask"></app-mask>
    <Layout>
      <Layout>
        <Content>
          <app-editor ref="editor"></app-editor>
        </Content>
        <Sider
          collapsible
          hideTrigger
          :width="310"
          :collapsed-width="0"
          v-model="isCollapsed"
          @on-collapse="onSiderCollapse"
        >
          <app-right-view
            ref="rightView"
            @closeClick="isCollapsed=true"
            @rightCloseClick="isCollapsed=!isCollapsed"
          ></app-right-view>
        </Sider>
        <Sider hide-trigger :width="44" :collapsed-width="44">
          <app-right-bar ref="rightBar" @itemClick="onRightBarItemClick"></app-right-bar>
        </Sider>
      </Layout>
      <Footer>
        <app-footer @itemClick="footItemClick"></app-footer>
      </Footer>
    </Layout>
  </div>
</template>
<script>
import AppMask from "./app-mask.vue";
import AppEditor from "./editor/app-editor.vue";
import AppFooter from "./foot/app-footer.vue";
import AppRightView from "./right-view/app-rightView.vue";
import AppRightBar from "./right-view/app-rightBar.vue";

export default {
  name: "App",
  components: {
    AppMask,
    AppEditor,
    AppFooter,
    AppRightView,
    AppRightBar
  },
  data() {
    return {
      isCollapsed: true,
      isMaskShow: true
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
    }, 500);
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
.setPointer{
  cursor: pointer;
}
</style>

