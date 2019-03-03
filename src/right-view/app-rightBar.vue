<template>
  <!-- 右边工具栏 -->
  <div class="rightBar leftBorder">
    <Layout>
      <Content class="titleBackColor">
        <ul>
          <li v-for="item in rightBarTopItems" :key="item.key" @click="rightBarItemClick(item)">
            {{item.text}}
          </li>
        </ul>
      </Content>
      <Footer class="titleBackColor">
        <ul>
          <li>
            <Dropdown transfer placement="left-end">
              <a href="javascript:void(0)">模板</a>
              <!-- <Icon type="ios-arrow-down"></Icon> -->
              <DropdownMenu slot="list">
                <DropdownItem>生成模板</DropdownItem>
                <DropdownItem>应用模板</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          <li>
            <Dropdown transfer placement="left-end" @on-click="rightBarItemClick">
              <a href="javascript:void(0)">设置</a>
              <DropdownMenu slot="list">
                <DropdownItem>自动换行</DropdownItem>
                <DropdownItem>mini地图</DropdownItem>
                <Dropdown transfer>
                  <DropdownItem>主题
                    <Icon type="ios-arrow-forward"></Icon>
                  </DropdownItem>
                  <DropdownMenu slot="list">
                    <DropdownItem name="vs">vs</DropdownItem>
                    <DropdownItem name="vs dark">vs dark</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <DropdownItem>自动备份</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          <li style="border:none;">
            <Dropdown transfer placement="left-end">
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
</template>
<script>
import { eventBus } from "../app/event-bus";

export default {
  name: "AppRightBar",
  data() {
    return {
      rightBarTopItems: [
        { key: "entity", text: "实体", icon: "" },
        { key: "event", text: "事件", icon: "" },
        // { key: "preview", text: "预览", icon: "" }
      ],
      rightBarBottomItems: [
        {
          key: "template",
          text: "模板",
          icon: "",
          childs: [
            { key: "createTemplate", text: "生成模板", icon: "" },
            { key: "applyTemplate", text: "应用模板", icon: "" }
          ]
        },
        {
          key: "setting",
          text: "设置",
          icon: "",
          childs: [
            {
              key: "theme",
              text: "主题",
              icon: "",
              childs: [
                { key: "vs", text: "vs", icon: "" },
                { key: "vs dark", text: "vs dark", icon: "" }
              ]
            }
          ]
        },
        { key: "help", text: "帮助", icon: "" }
      ]
    };
  },
  methods: {
    rightBarItemClick(item) {
      window.global.executeCmdFromWinform("theme","vs-dark");
      if (item) {
        if (item.key && item.key === "preview") {
          window.global.executeCmdToWinform(item.key);
        } else {
          this.$emit("itemClick", item);
        }
      } else {
        this.$emit("itemClick");
      }
    }
  }
};
</script>
<style scoped>
.rightBar {
  overflow: hidden;
  height: 100%;
  background-color: white;
  z-index: 99999999;
}
.rightBar ul {
  /*设置导航栏的框框*/
  width: 44px; /*框框的宽度*/
  height: 100%; /*框框的长度*/
  padding: 0px; /*将框框的padding设置为零，不然会导致框框里的内容与框边缘有间隔*/
  right: 0px;
}
.rightBar li {
  list-style-type: none; /* 去掉li前的点 */
  height: 50px;
  margin: 1px 0px;
  border-bottom: rgb(204, 204, 204) 1px solid;
}

.rightBar a {
  display: block; /*将a变成块状*/
  font-family: Microsoft Yahei;
  line-height: 40px; /*设置字体在块中的高度*/
  padding: 5px 5px; /*块里的高宽通过margin设置*/
  color: #495060;
  text-align: center; /*字体居中*/
  text-decoration: none; /*去掉下划线*/
  font-size: 12px;
  /* border-bottom: rgb(204, 204, 204) 1px solid; */
}
.leftBorder {
  border-left: rgb(204, 204, 204) 1px solid;
}
</style>
<style>
.rightBar .ivu-dropdown {
  width: 100%;
}
</style>


