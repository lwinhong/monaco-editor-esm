<template>
  <div class="rightView leftBorder">
    <!-- 左边 -->
    <div class="leftSide" v-show="leftContentVisible">
      <div class="top titleBackColor">
        <ul class="controlTitleBar">
          <li
            v-for="item in topBarItems"
            :key="item.key"
            :title="item.title"
            v-show="(currentView != 'entity' && item.key==='add')? false : true"
          >
            <a href="javascript:void(0)" :class="item.class">
              {{item.text? item.text:''}}
              <Icon v-if="item.icon" :type="item.icon" @click="topBarItemClick(item)" :size="16"/>
            </a>
          </li>
        </ul>
      </div>
      <div class="leftContent">
        <app-search
          ref="seach"
          v-show="searchVisible"
          @search="onSearch"
          :placeholder="searchPlaceholder"
        ></app-search>
        <entity-view ref="entityView" v-show="entityViewVisible"></entity-view>
        <event-view ref="eventView" v-show="eventViewVisible"></event-view>
      </div>
    </div>
    <!-- 右边工具栏 -->
    <div class="rightSide leftBorder">
      <Layout>
        <Content class="titleBackColor">
          <ul>
            <li v-for="item in rightBarTopItems" :key="item.key">
              <a href="javscript:void(0)" @click="rightBarItemClick(item)">{{item.text}}</a>
            </li>
          </ul>
        </Content>
        <Footer class="titleBackColor">
          <ul>
            <li>
              <!-- placement="left-end" -->
              <Dropdown :transfer="true">
                <a href="javascript:void(0)">模板</a>
                <!-- <Icon type="ios-arrow-down"></Icon> -->
                <DropdownMenu slot="list">
                  <DropdownItem>生成模板</DropdownItem>
                  <DropdownItem>应用模板</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
            <li>
              <Dropdown :transfer="true">
                <a href="javascript:void(0)">设置</a>
                <DropdownMenu slot="list">
                  <DropdownItem>自动换行</DropdownItem>
                  <DropdownItem>mini地图</DropdownItem>
                  <Dropdown :transfer="false">
                    <DropdownItem>主题
                      <Icon type="ios-arrow-forward"></Icon>
                    </DropdownItem>
                    <DropdownMenu slot="list">
                      <DropdownItem>vs</DropdownItem>
                      <DropdownItem>vs dark</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <DropdownItem>自动备份</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
            <li>
              <Dropdown :transfer="true">
                <a href="javascript:void(0)">帮助</a>
                <DropdownMenu slot="list">
                  <DropdownItem>使用手册</DropdownItem>
                  <DropdownItem>W3C教程</DropdownItem>
                  <DropdownItem>DivCss学习平台</DropdownItem>
                  <DropdownItem>Vue教程</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </Footer>
      </Layout>
    </div>
  </div>
</template>
<script>
import entityView from "./entityView.vue";
import eventView from "./eventView.vue";
import AppSearch from "./app-search.vue";

export default {
  name: "AppRightView",
  components: { entityView, eventView, AppSearch },
  props: {
    leftContentVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    searchPlaceholder() {
      return "搜索" + (this.currentView === "entity" ? "实体/字段" : "事件");
    },
    entityViewVisible() {
      return this.currentView === "entity";
    },
    eventViewVisible() {
      return this.currentView === "event";
    }
  },
  data() {
    return {
      currentView: "entity",
      searchVisible: false,
      rightBarTopItems: [
        { key: "entity", text: "实体", icon: "" },
        { key: "event", text: "事件", icon: "" },
        { key: "preview", text: "预览", icon: "" }
      ],
      topBarItems: [
        {
          key: "title",
          text: this.currentView == "entity" ? "数据源" : "事件绑定",
          class: "leftFloat"
        },
        {
          key: "close",
          title: "关闭",
          icon: "md-close",
          class: "rightFloat"
        },
        {
          key: "refresh",
          title: "刷新",
          icon: "md-refresh",

          class: "rightFloat"
        },
        {
          key: "search",
          title: "搜索",
          icon: "md-search",
          class: "rightFloat"
        },
        {
          key: "add",
          title: "新增",
          icon: "md-add",
          class: "rightFloat"
        }
      ]
    };
  },
  methods: {
    rightBarItemClick(item) {
      if (item.key === "preview") {
        window.global.executeCmdToWinform(item.key);
      } else {
        this.currentView = item.key;
        this.$emit("itemClick", item);
      }
    },
    topBarItemClick(item) {
      if (item.key === "search") {
        this.searchVisible = !this.searchVisible;
        if (this.searchVisible) {
          //this.$refs.seach.setFocus();
        }
      }
       else this.$emit("closeClick");
    },
    onSearch(value) {
      if (this.currentView === "entity") this.$refs.entityView.onSearch(value);
      else this.$refs.eventView.onSearch(value);
    }
  }
};
</script>
<style scoped>
.rightView {
  overflow: hidden;
  height: 100%;
  background-color: white;
}

.leftBorder {
  border-left: rgb(204, 204, 204) 1px solid;
}

.rightView .rightSide {
  width: 44px;
  height: 100%;
  float: right;
}
.rightView .leftContent {
  background-color: white !important;
  height: 100%;
}

.rightView .leftSide {
  width: 100%;
  padding-right: 44px;
  height: 100%;
  float: left;
  margin-bottom: -2000px;
  padding-bottom: 2000px;
}
.rightView .leftSide .top {
  height: 40px;
  border-bottom: rgb(204, 204, 204) 1px solid;
}

.top ul {
  height: 100%;
  width: 100%;
}
/*  */
.top a {
  display: block; /*将a变成块状*/
  font-family: Microsoft Yahei;
  line-height: 29px; /*设置字体在块中的高度*/
  padding: 5px 3px; /*块里的高宽通过margin设置*/
  color: #495060;
  text-align: center; /*字体居中*/
  text-decoration: none; /*去掉下划线*/
  font-size: 12px;
}

.top li {
  list-style-type: none; /* 去掉li前的点 */
}

.leftFloat {
  float: left;
}
.rightFloat {
  float: right;
}

a:hover {
  background-color: #e0e4e2;
  color: #2d8cf0;
  cursor: pointer;
}

.rightView .rightSide ul {
  /*设置导航栏的框框*/
  width: 44px; /*框框的宽度*/
  height: 100%; /*框框的长度*/
  padding: 0px; /*将框框的padding设置为零，不然会导致框框里的内容与框边缘有间隔*/
  right: 0px;
}
.rightView .rightSide li {
  list-style-type: none; /* 去掉li前的点 */
  height: 50px;
  margin: 1px 0px;
}

.rightView .rightSide a {
  display: block; /*将a变成块状*/
  font-family: Microsoft Yahei;
  line-height: 40px; /*设置字体在块中的高度*/
  padding: 5px 5px; /*块里的高宽通过margin设置*/
  color: #495060;
  text-align: center; /*字体居中*/
  text-decoration: none; /*去掉下划线*/
  font-size: 12px;
  border-bottom: rgb(204, 204, 204) 1px solid;
}
</style>



