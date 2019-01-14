<template>
  <div>
    <ul @click="$emit('itemClick')">
      <li>
        <a>实体</a>
      </li>
      <li>
        <a>事件</a>
      </li>
      <li>
        <a>预览</a>
      </li>
      <li>
        <a>模板</a>
      </li>
      <li>
        <a>设置</a>
      </li>
      <li>
        <a>帮助</a>
      </li>
    </ul>
    <Drawer title="Basic Drawer" :mask="false" v-model="value1">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  </div>
</template>
<script>
export default {
  name: "rightView",
  data() {
    return {
      value1: false
    };
  }
};
</script>
<style scoped>
ul {
  /*设置导航栏的框框*/
  width: 52px; /*框框的宽度*/
  height: 100%; /*框框的长度*/
  padding: 0px; /*将框框的padding设置为零，不然会导致框框里的内容与框边缘有间隔*/
  right: 0px;
}
li {
  list-style-type: none; /* 去掉li前的点 */
  height: 50px;
}

a {
  display: block; /*将a变成块状*/
  font-family: Microsoft Yahei;
  line-height: 50px; /*设置字体在块中的高度*/
  padding: 5px 5px; /*块里的高宽通过margin设置*/
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



