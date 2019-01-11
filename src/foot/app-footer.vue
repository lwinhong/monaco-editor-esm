<template>
  <div class="footer">
    <ul>
      <li
        v-for="item in items"
        :key="item.key"
        :title="item.title"
        @click="$emit('itemClick', item)"
      >
        <a href="javscript:void(0);"><Icon v-if="item.icon" :type="item.icon" /> {{item.text}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "AppFooter",
  props: {
    items: {
      type: Array,
      default: []
    }
  }
};
</script>
<!--
<style scoped lang='less' src='./app-footer.less'></style>
-->
<style scoped>
.footer {
  height: 25px;
  background-color: rgb(238, 238, 240);
  bottom: 0px;
}

ul {
  /*设置导航栏的框框*/
  width: 100%; /*框框的宽度*/
  height: 100%; /*框框的长度*/
  padding: 0px; /*将框框的padding设置为零，不然会导致框框里的内容与框边缘有间隔*/
}
li {
  list-style-type: none; /* 去掉li前的点 */
  float: left; /*将li设置成做浮动，变为联动*/
}
a {
  display: block; /*将a变成块状*/
  font-family: Microsoft Yahei;
  line-height: 25px; /*设置字体在块中的高度*/
  padding: 0px 5px; /*块里的高宽通过margin设置*/
  color: #495060;
  text-align: center; /*字体居中*/
  text-decoration: none; /*去掉下划线*/
  font-size: 12px;
}
a:hover {
  background-color: #e0e4e2;
  color: #2d8cf0;
   cursor: pointer;
}
</style>
