<template>
  <div class="fill rightView leftBorder">
    <div class="top titleBackColor">
      <ul class="controlTitleBar">
        <li>
          <a href="javascript:void(0)" class="leftFloat">{{topTitle}}</a>
        </li>
        <li
          v-for="item in topBarItems"
          :key="item.key"
          :title="item.title"
          v-show="(currentView != 'entity' && item.key==='add')? false : true"
           @click="topBarItemClick(item)"
        >
          <a href="javascript:void(0)" class="rightFloat">
            {{item.text? item.text:''}}
            <Icon v-if="item.icon" :type="item.icon" :size="16"/>
          </a>
        </li>
      </ul>
    </div>
    <div class="content">
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
</template>
<script>
import entityView from "./entity/entityView.vue";
import eventView from "./event/eventView.vue";
import AppSearch from "./app-search.vue";

export default {
  name: "AppRightView",
  components: { entityView, eventView, AppSearch },
  computed: {
    searchPlaceholder() {
      return "搜索" + (this.currentView === "entity" ? "实体/字段" : "事件");
    },
    entityViewVisible() {
      return this.currentView === "entity";
    },
    eventViewVisible() {
      return this.currentView === "event";
    },
    topTitle() {
      return this.currentView === "entity" ? "数据源" : "事件绑定";
    }
  },
  data() {
    return {
      currentView: "entity",
      searchVisible: false,
      topBarItems: [
        {
          key: "close",
          title: "关闭",
          icon: "md-close"
        },
        {
          key: "refresh",
          title: "刷新",
          icon: "md-refresh"
        },
        {
          key: "search",
          title: "搜索",
          icon: "md-search"
        },
        {
          key: "add",
          title: "新增",
          icon: "md-add"
        }
      ]
    };
  },
  methods: {
    topBarItemClick(item) {
      if (item) {
        if (item.key === "search") {
          this.searchVisible = !this.searchVisible;
          if (this.searchVisible) {
            //this.$refs.seach.setFocus();
          }
        } else if (item.key === "refresh") {
          if (this.entityViewVisible) {
            this.$refs.entityView.buildTree();
          }
        } else this.$emit("closeClick");
      } else this.$emit("closeClick");
    },
    onSearch(value) {
      if (this.entityViewVisible) this.$refs.entityView.onSearch(value);
      else this.$refs.eventView.onSearch(value);
    },
    changeRightView(viewKey) {
      this.currentView = viewKey;
    }
  }
};
</script>
<style scoped>
.rightView {
  background-color: white;
  position: relative;
}

.leftBorder {
  border-left: rgb(204, 204, 204) solid 1px;
}

.content {
  position: absolute;
  top: 40px;
  width: 100%;
  left: 0;
  bottom: 0;
  overflow: auto;
}

.top {
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
</style>



