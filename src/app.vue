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
          :width="294"
          :collapsed-width="52"
          v-model="isCollapsed"
        >
          <app-right-view ref="rightView" @itemClick="collapsedSider"></app-right-view>
        </sider>
      </layout>
      <Footer>
        <app-footer :items="items" @itemClick="footItemClick"></app-footer>
      </Footer>
    </layout>
  </div>
</template>
<script>
import AppMask from "./app-mask.vue";
import AppEditor from "./editor/app-editor.vue";
import AppFooter from "./foot/app-footer.vue";
import AppRightView from "./right-view/rightView.vue";

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
      isCollapsed: true,
      isMaskShow: false,
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
          icon: "md-add-circle"
        },
        { key: "vlanguage", text: "语法", title: "v指令", icon: "ios-list-box-outline" },
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
  methods: {
    collapsedSider() {
      this.$refs.sideRight.toggleCollapse();
    },
    footItemClick(item) {
      this.$refs.editor.footItemClick(item);
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
</style>

