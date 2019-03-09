<template>
  <div class="app fill">
    <!-- <app-mask v-if="isMaskShow" ref="mask"></app-mask> -->
    <Spin size="large" fix v-if="isMaskShow"></Spin>
    <!-- <Layout>
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
    </Layout>-->
    <div class="g-layout">
      <!--全局顶栏-->
      <!-- <header class="g-header">我是代码/设计切换头</header> -->
      <!--配置主体-->
      <main class="g-body">
        <!--左栏-->
        <aside class="g-leftBar" style="display:none;">
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
              <header>
                <section class="itemTitle">
                  <h3>事件</h3>
                  <span>
                    <icon type="ios-close" size="12"></icon>
                    <icon type="ios-close" size="12"></icon>
                  </span>
                </section>
                <section :class="itemSearch">
                  <i-button icon="md-add" size="small" class="btn">添加事件</i-button>
                  <i-input
                    search
                    placeholder="搜索"
                    size="small"
                    class="input"
                    @on-focus="focus"
                    @on-search="search"
                    @on-blur="blured"
                  ></i-input>
                </section>
              </header>
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
      <!-- <footer class="g-footer" style="display:none;">我是底部状态栏:备用</footer> -->
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
.setPointer {
  cursor: pointer;
}
</style>

