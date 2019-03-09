<template>
  <div class="app">
    <Spin size="large" fix v-if="isMaskShow"></Spin>

    <div class="g-layout">
      <!--全局顶栏-->
      <header class="g-header" v-if="false">我是代码/设计切换头</header>
      <!--配置主体-->
      <main class="g-body">
        <!--左栏-->
        <aside class="g-leftBar" v-if="false">
          <div class="m-configBar">
            <!--子边栏-->
            <aside class="bar-hd">
              <ul class="switch">
                <li class="fn-btn">
                  <tooltip content="事件" placement="left">
                    <icon custom size="20"></icon>
                  </tooltip>
                </li>
                <li class="fn-btn">
                  <tooltip content="格式化" placement="left">
                    <icon type="ios-play" size="20"></icon>
                  </tooltip>
                </li>
                <li class="sep"></li>
                <li class="fn-btn">
                  <tooltip content="格式化" placement="left">
                    <icon type="ios-play" size="20"></icon>
                  </tooltip>
                </li>
              </ul>
              <ul class="others">
                <li class="fn-btn">
                  <dropdown>
                    <icon type="ios-play" size="20"></icon>
                    <dropdown-menu slot="list">
                      <dropdown-item>菜单</dropdown-item>
                      <dropdown-item>菜单</dropdown-item>
                      <dropdown-item>菜单</dropdown-item>
                      <dropdown-item>菜单</dropdown-item>
                      <dropdown-item>菜单</dropdown-item>
                    </dropdown-menu>
                  </dropdown>
                </li>
                <li class="fn-btn">
                  <tooltip content="格式化" placement="left">
                    <icon type="ios-play" size="20"></icon>
                  </tooltip>
                </li>
              </ul>
            </aside>
            <!--边栏展开信息-->
            <div class="bar-bd"></div>
          </div>
        </aside>
        <!--舞台-->
        <div class="g-cont">
          <div class="m-codeView">我是代码区域
            <!--状态栏{-->
            <div class="m-statusBar">
              <section class="hd">
                <tooltip content="格式化" placement="top">
                  <a class="fn-btn">
                    <icon custom="vicon ico-daimazhushi" size="16"></icon>
                  </a>
                </tooltip>
                <tooltip content="注释/取消注释" placement="top">
                  <a class="fn-btn">
                    <icon custom="vicon ico-zhushi" size="16"></icon>
                  </a>
                </tooltip>
                <tooltip content="自动换行" placement="top">
                  <a class="fn-btn">
                    <icon custom="vicon ico-wordBreak" size="16"></icon>
                  </a>
                </tooltip>

                <i class="sep"></i>

                <tooltip content="代码模板" placement="top">
                  <a class="fn-btn">
                    <icon custom="vicon ico-codetpl" size="16"></icon>
                  </a>
                </tooltip>
                <dropdown placement="top">
                  <a class="fn-btn">
                    <icon custom="vicon ico-insert" size="14"></icon>
                  </a>
                  <dropdown-menu slot="list">
                    <dropdown-item>插入构件资源</dropdown-item>
                    <dropdown-item>拔出</dropdown-item>
                  </dropdown-menu>
                </dropdown>
              </section>
              <section class="ft">
                <tooltip content="代码模板" placement="top">
                  <a class="prompt s-error">
                    <icon type="ios-close-circle-outline" size="14"></icon>32
                  </a>
                </tooltip>
                <tooltip content="代码模板" placement="top">
                  <a class="prompt s-warn">
                    <icon type="ios-warning-outline" size="14"></icon>32
                  </a>
                </tooltip>
                <i class="sep"></i>
                <span>行 27 ,列 24</span>
              </section>
            </div>
            <!--end}-->
          </div>
        </div>
        <!--右栏-->
        <aside class="g-rightBar">
          <div class="m-configBar">
            <!--子边栏-->
            <aside class="bar-hd">
              <ul class="switch">
                <li class="fn-btn">
                  <tooltip content="事件" placement="left">
                    <icon custom="vicon ico-event" size="21"></icon>
                  </tooltip>
                </li>
                <li class="fn-btn">
                  <tooltip content="数据" placement="left">
                    <icon custom="vicon ico-data" size="16"></icon>
                  </tooltip>
                </li>
                <li class="sep"></li>
                <li class="fn-btn">
                  <tooltip content="预览" placement="left">
                    <icon custom="vicon ico-preview" size="20"></icon>
                  </tooltip>
                </li>
              </ul>
              <ul class="others">
                <li class="fn-btn">
                  <dropdown>
                    <icon custom="vicon ico-setting" size="20"></icon>
                    <dropdown-menu slot="list">
                      <dropdown-item>菜单</dropdown-item>
                      <dropdown-item>菜单</dropdown-item>
                      <dropdown-item>菜单</dropdown-item>
                      <dropdown-item>菜单</dropdown-item>
                      <dropdown-item>菜单</dropdown-item>
                    </dropdown-menu>
                  </dropdown>
                </li>
              </ul>
            </aside>
            <!--边栏展开信息-->
            <div class="bar-bd">
              <header style="height:44px;background:#eeeeee;"></header>
              <div style="height:100%;overflow:auto">
                <div class="cardView">
                  <div class="cardView-hd">
                    <h6 class="title">
                      <span>事件5</span>
                      <poptip v-model="visible1" placement="bottom-start" width="120">
                        <a href="#" title="修改名称" class="edit">
                          <icon type="ios-create-outline" size="18"></icon>
                        </a>
                        <div slot="title">修改名称</div>
                        <div slot="content">
                          <i-input size="small"></i-input>
                          <br>
                          <i-button type="primary" @click="close1" size="small">完成</i-button>
                        </div>
                      </poptip>
                    </h6>
                    <icon type="ios-trash-outline" size="18" class="extra" title="删除事件"></icon>
                  </div>
                  <div class="cardView-bd">
                    <i-form :label-width="60">
                      <form-item label="事件编码">
                        <i-input size="small"></i-input>
                      </form-item>
                      <form-item label="处理方法">
                        <i-input size="small" readonly>
                          <icon slot="append" type="md-open"></icon>
                        </i-input>
                      </form-item>
                      <form-item label="参数映射">
                        <i-input size="small" readonly>
                          <icon slot="append" type="md-open"></icon>
                        </i-input>
                      </form-item>
                    </i-form>
                  </div>
                </div>
                <div class="cardView">
                  <div class="cardView-hd">
                    <h6 class="title">
                      <span>事件5</span>
                      <poptip v-model="visible2" placement="bottom-start" width="120">
                        <a href="#" title="修改名称" class="edit">
                          <icon type="ios-create-outline" size="18"></icon>
                        </a>
                        <div slot="title">修改名称</div>
                        <div slot="content">
                          <i-input size="small"></i-input>
                          <br>
                          <i-button type="primary" @click="close2" size="small">完成</i-button>
                        </div>
                      </poptip>
                    </h6>
                  </div>
                  <div class="cardView-bd">
                    <i-form :label-width="60">
                      <form-item label="事件编码">
                        <span>1231454646567</span>
                        <a @click="copied" title="复制编码">
                          <icon type="md-copy" size="16"></icon>
                        </a>
                      </form-item>
                      <form-item label="处理方法">
                        <i-input size="small" readonly>
                          <icon slot="append" type="md-open"></icon>
                        </i-input>
                      </form-item>
                      <form-item label="参数映射">
                        <i-input size="small" readonly>
                          <icon slot="append" type="md-open"></icon>
                        </i-input>
                      </form-item>
                    </i-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
      <!--全局状态栏-->
      <footer class="g-footer" v-if="false">我是底部状态栏:备用</footer>
    </div>
  </div>
</template>
<script>
import AppMask from "./app-mask.vue";
import AppEditor from "./editor/app-editor.vue";
import AppFooter from "./foot/app-footer.vue";
import AppRightView from "./right-view/app-rightView.vue";
import AppRightBar from "./right-view/app-rightBar.vue";
// import { Container, Draggable } from "vue-smooth-dnd";

export default {
  name: "App",
  components: {
    AppMask,
    AppEditor,
    AppFooter,
    AppRightView,
    AppRightBar
    // Container,
    // Draggable
  },
  data() {
    return {
      isCollapsed: true,
      isMaskShow: true,
      visible1: false,
      visible2: false,
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
    },
    close1: function() {
      this.visible1 = false;
    },
    close2: function() {
      this.visible2 = false;
    },
    copied: function() {
      this.$Message.success("已复制");
    }
  },
  mounted() {
    setTimeout(() => {
      this.isMaskShow = false;
    }, 1000);
  }
};
</script>
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

li {
  list-style: none;
}
.g-layout {
  display: flex;
  flex-flow: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}
.g-layout .g-header {
  width: 100%;
  height: 32px;
  background: #eeeef0;
  border-bottom: 1px solid #cecece;
}
.g-layout .g-footer {
  width: 100%;
  height: 32px;
  background: #eeeef0;
  border-top: 1px solid #cecece;
}
.g-layout .g-body {
  display: flex;
  width: 100%;
  height: 100%;
}
.g-layout .g-body .g-cont {
  background: #e6e6e6;
  width: 100%;
}
.g-layout .g-body .g-leftBar {
  flex-shrink: 0;
  min-width: 40px;
  width: 310px;
  background: #fff;
  border-right: 1px solid #cecece;
}
.g-layout .g-body .g-rightBar {
  flex-shrink: 0;
  min-width: 40px;
  width: 310px;
  background: #fff;
  border-left: 1px solid #cecece;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.2);
}
.m-configBar {
  position: relative;
  height: 100%;
  padding-right: 40px;
}
.m-configBar .bar-hd {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-top: 8px;
  width: 40px;
  height: 100%;
  background: #eeeef0;
  text-align: center;
}
.m-configBar .bar-hd:before {
  content: "";
  position: absolute;
  top: 0;
  left: -1px;
  height: 100%;
  border-left: 1px solid #cecece;
}
.m-configBar .bar-hd .fn-btn {
  width: 28px;
  height: 28px;
  line-height: 28px;
  color: #404040;
  text-align: center;
  margin: 10px auto;
}
.m-configBar .bar-hd .sep {
  margin: 10px;
  width: 20px;
  border-top: 1px solid #cecece;
}
.m-configBar .bar-hd .others {
  align-self: flex-end;
}
.m-configBar .bar-bd {
  display: flex;
  flex-flow: column;
  height: 100%;
  overflow: hidden;
}
.cardView {
  padding: 8px 0 4px;
  border-bottom: 1px solid #f5f5f6;
  transition: 0.2s background ease;
}
.cardView:hover {
  background: #fafafa;
}
.cardView:hover .cardView-hd h6 .edit {
  color: #33a7ff;
  display: inline-block;
}
.cardView-hd {
  position: relative;
  line-height: 24px;
  padding: 0 12px;
  text-align: left;
  font-weight: 700;
  color: #000;
  font-size: 13px;
}
.cardView-hd h6 > span {
  display: inline-block;
  max-width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
.cardView-hd h6 .edit {
  display: none;
  padding-left: 2px;
}
.cardView-hd .ivu-poptip-title {
  padding: 8px 16px 4px;
}
.cardView-hd .ivu-poptip-title:after {
  display: none;
}
.cardView-hd .ivu-poptip-body {
  padding-top: 0;
  text-align: right;
}
.cardView-hd .ivu-poptip-body .ivu-btn {
  margin-top: 6px;
}
.cardView-hd .extra {
  position: absolute;
  right: 16px;
  top: 3px;
  color: #999;
  cursor: pointer;
  transition: 0.3s;
}
.cardView-bd {
  padding: 8px 12px 6px;
}
.cardView-bd .ivu-form-item {
  margin-bottom: 6px;
}
.cardView-bd .ivu-input-group-append .ivu-icon {
  cursor: pointer;
}
.cardView-bd .ivu-form .ivu-form-item-label {
  padding: 6px 12px 6px 0;
  color: #777;
}
.cardView-bd .ivu-form-item-content {
  line-height: 24px;
}
.cardView-bd .ivu-form-item-content a {
  color: #aaa;
}
.cardView-bd .ivu-form-item-content a:hover {
  color: #33a7ff;
}
.cardView-bd .ivu-input[disabled],
.cardView-bd fieldset[disabled] .ivu-input {
  color: #aaa;
}
.m-codeView {
  position: relative;
  background: #fff;
  height: 100%;
}
.m-statusBar {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 8px;
  width: 100%;
  height: 28px;
  line-height: 28px;
  background: #eeeef0;
  border-top: 1px solid #cecece;
}
.m-statusBar a {
  color: #6e6e6e;
}
.m-statusBar a:hover {
  color: #222;
}
.m-statusBar .sep {
  display: inline-block;
  margin: 0 6px;
  height: 12px;
  border-left: 1px solid #cecece;
  vertical-align: middle;
}
.m-statusBar .ivu-icon {
  vertical-align: middle;
}
.m-statusBar .hd {
  width: 100%;
}
.m-statusBar .hd .fn-btn {
  cursor: pointer;
  padding: 0 6px;
}
.m-statusBar .ft {
  width: 240px;
  text-align: right;
}
.m-statusBar .ft .prompt {
  padding: 0 4px;
}
.m-statusBar .ft .s-error .ivu-icon {
  color: #ed4014;
  font-weight: bolder;
}
.m-statusBar .ft .s-warn .ivu-icon {
  color: #f4bd00;
  font-weight: bolder;
}
</style>

