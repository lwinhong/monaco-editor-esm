<template>
  <aside class="g-sidebar" :class="barClass" :style="`width:${getRealSideBarWidth}px;`">
    <div :class="contentBoxClass">
      <div class="resize-handle" :class="resizeHandleClass"></div>
      <aside class="box-sd">
        <ul class="switch">
          <slot name="switch"></slot>
        </ul>
        <ul class="others">
          <slot name="others"></slot>
        </ul>
      </aside>
      <slot></slot>
    </div>
  </aside>
</template>
<script>
export default {
  name: "SideBarMasterPage",
  props: {
    orientation: { type: String, default: "right" }
  },
  computed: {
    barClass() {
      return [this.orientation == "right" ? "fr" : "fl"];
    },
    resizeHandleClass() {
      return [this.orientation == "right" ? "resize-right" : "resize-left"];
    },
    contentBoxClass() {
      return [this.orientation == "right" ? "m-propBox" : "m-toolBox"];
    },
    getRealSideBarWidth() {
      return this.isMiniMode ? this.sideBarMinWidth : this.lastSideBarWidth;
    }
  },
  data() {
    return {
      defaultSideBarWidth: 240,
      lastSideBarWidth: 240,
      currentSideBarWidth: 240,
      sideBarMinWidth: 40,
      isMiniMode: false
    };
  },
  methods: {
    setMiniWidth() {
      this.lastSideBarWidth = this.currentSideBarWidth;
      this.isMiniMode = true;
    },
    restoreLastWidth() {
      this.isMiniMode = false;
    }
  }
};
</script>
<style scoped>
.resize-handle {
  position: absolute;
  top: 0px;
  height: 100%;
  width: 6px;
  cursor: ew-resize;
}
.resize-handle:after {
  background: red;
}
.resize-right {
  left: -2px;
}
.resize-left {
  right: -2px;
}
</style>