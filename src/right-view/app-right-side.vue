<template>
  <aside class="g-sidebar fr">
    <div class="m-propBox">
      <div class="resize-handle"></div>
      <!--子边栏-->
      <aside class="box-sd">
        <ul class="switch">
          <!--激活状态 使用 s-active -->
          <template v-for="(item,i) in switchItems">
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
        </ul>
        <ul class="others">
          <li class="fn-btn">
            <tooltip content="设置" placement="left">
              <icon custom="vicon ico-setting" size="18"></icon>
            </tooltip>
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
        </ul>
      </aside>
      <!-- 视图区域 -->
      <entity-view ref="entityView" v-show="entityViewVisible"></entity-view>
      <event-view ref="eventView" v-show="eventViewVisible"></event-view>
    </div>
  </aside>
</template>
<script>
import entityView from "./entity/entityView.vue";
import eventView from "./event/eventView.vue";
import { cmdData } from "../app/command";

export default {
  name: "AppRightSide",
  components: {
    entityView,
    eventView
  },
  data() {
    return {
      currentView: "event",
      activeItemKey: "event",
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
          key: "layer",
          content: "层级树",
          icon: "vicon ico-layer",
          cmd: "layer",
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
      otherItems: []
    };
  },
  methods: {
    switchItemClick(item) {
      if (item.canActive) {
        this.activeItemKey = item.key;
        this.currentView = item.key;
      }
      if (item.key == "preview") {
        this.v3global.executeCmd(item.cmd);
      }
    }
  },
  computed: {
    entityViewVisible() {
      return this.currentView === "entity";
    },
    eventViewVisible() {
      return this.currentView === "event";
    }
  }
};
</script>
<style scoped>
.m-propBox .resize-handle {
  position: absolute;
  left: -2px;
  top: 0px;
  height: 100%;
  width: 6px;
  cursor: ew-resize;
}
</style>
