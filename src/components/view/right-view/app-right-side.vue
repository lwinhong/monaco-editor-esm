<template>
  <sideBarMasterPage ref="right-side-bar" :isMiniMode="isMiniMode">
    <!--激活状态 使用 s-active -->
    <template v-for="(item,i) in switchItems" slot="switch">
      <li
        class="fn-btn"
        :class="{'s-active':activeItemKey==item.key&&item.canActive}"
        :key="item.key+i"
        v-if="item.key!='sep'"
        @click="switchItemClick(item)"
      >
        <tooltip :content="item.content" placement="left">
          <icon :custom="item.icon" size="18"></icon>
        </tooltip>
      </li>
      <li class="sep" v-if="item.key=='sep'" :key="item.key+i"></li>
    </template>
    <template slot="others">
      <li class="fn-btn">
        <dropdown>
          <icon custom="vicon ico-setting" size="18"></icon>
          <dropdown-menu slot="list">
            <div class="m-help">
              <p>编辑器相关设置</p>
              <dl>
                <dt>主题</dt>
                <dd v-for="(t ,i) in themes" :key="t+i">
                  <a href="#" @click="changeTheme(t.key)">{{t.name}}</a>
                </dd>
              </dl>
              <dl>
                <dt>其他</dt>
                <dd>
                  <a href="#">命令面板</a>
                </dd>
              </dl>
            </div>
          </dropdown-menu>
        </dropdown>
      </li>
      <li class="fn-btn">
        <dropdown>
          <icon custom="vicon ico-help" size="18"></icon>
          <dropdown-menu slot="list">
            <div class="m-help">
              <p>通过对以下功能的介绍学习，可以帮助您快速完成窗体的配置</p>
              <dl>
                <dt>界面配置</dt>
                <dd>
                  <a href="#">新手引导</a>
                </dd>
                <dd>
                  <a href="#">事件处理</a>
                </dd>
                <dd>
                  <a href="#">数据绑定</a>
                </dd>
                <dd>
                  <a href="#">条件&循环</a>
                </dd>
              </dl>
              <dl>
                <dt>开发手册</dt>
                <dd>
                  <a href="#">html+css学习</a>
                </dd>
                <dd>
                  <a href="#">Vue使用手册</a>
                </dd>
                <dd>
                  <a href="#">VUI组件使用手册</a>
                </dd>
              </dl>
            </div>
          </dropdown-menu>
        </dropdown>
      </li>
    </template>
    <!-- 视图区域 -->
    <entity-view ref="entityView" v-show="entityViewVisible" @closeClick="closeClick"></entity-view>
    <event-view ref="eventView" v-show="eventViewVisible" @closeClick="closeClick"></event-view>
    <outline-view @closeClick="closeClick"></outline-view>
  </sideBarMasterPage>
</template>
<script>
import entityView from "./entity/entityView.vue";
import eventView from "./event/eventView.vue";
import outlineView from "./outline/outlineView.vue";
import { cmdData } from "../../../app/command";
import sideBarMasterPage from "../side-bar-master-page.vue";
import themeHandler from "../../theme/themeHandler";
import { mapActions } from "vuex";

export default {
  name: "AppRightSide",
  components: {
    entityView,
    eventView,
    sideBarMasterPage,
    outlineView
  },
  mounted() {
    this.themes = themeHandler.getThemes();
  },
  data() {
    return {
      currentView: "outline",
      activeItemKey: "outline",
      switchItems: [
        {
          key: "event",
          content: "事件",
          icon: "vicon ico-event",
          cmd: "event",
          canActive: true
        },
        {
          key: "entity",
          content: "数据",
          icon: "vicon ico-data",
          cmd: "entity",
          canActive: true
        },
        {
          key: "sep"
        },
        {
          key: "outline",
          content: "层级树",
          icon: "vicon ico-layer",
          cmd: "outline",
          canActive: true
        },
        {
          key: "sep"
        },
        {
          key: "preview",
          content: "预览",
          icon: "vicon ico-preview",
          cmd: cmdData.showPreviewForm,
          canActive: false
        }
      ],
      otherItems: [],
      themes: [],
      isMiniMode: false
    };
  },
  methods: {
    closeClick() {
      this.isMiniMode = true;
    },
    switchItemClick(item) {
      if (item.canActive) {
        if (this.currentView == item.key) {
          this.isMiniMode = !this.isMiniMode;
          return;
        }
        this.isMiniMode = false;
        this.setState(item.key);
      }
      if (item.key == "preview") {
        this.v3global.executeCmd(item.cmd);
      }
    },
    changeTheme(key) {
      themeHandler.changeThemeCss(key);
      this.setThemeAction(key);
    },
    setState(key) {
      this.activeItemKey = key;
      this.currentView = key;
    },
    ...mapActions(["setThemeAction"])
  },
  computed: {
    entityViewVisible() {
      return this.currentView == "entity";
    },
    eventViewVisible() {
      return this.currentView == "event";
    },
    outlineVisible() {
      return this.currentView == "outline";
    }
  },
  watch: {
    isMiniMode(newValue, oldValue) {
      if (newValue) this.setState(null);
    }
  }
};
</script>
