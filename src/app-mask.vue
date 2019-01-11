<template>
  <div id="fillMask" class="fillMask" v-show="visibleTrigger">
    <img :src="waitGif">
    <span>编辑器加载中，请稍后</span>
  </div>
</template>
<script>
const waitGif = "./resource/images/waitting.gif";
export default {
  name: "AppMask",
  props: {
    visible: {
      default: true,
      type: Boolean
    }
  },
  computed: {
    visibleTrigger() {
      return this.visible;
    },
    waitGif() {
      return waitGif;
    }
  },
  methods: {
    hide() {
      this.visible = false;
    }
  }
};
</script>
<style>
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