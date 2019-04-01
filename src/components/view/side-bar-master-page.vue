<template>
  <aside class="g-sidebar" :class="barClass" :style="`width:${getRealSideBarWidth}px;`">
    <div :class="contentBoxClass">
      <div
        class="resize-handle"
        :class="resizeHandleClass"
        @mousedown.prevent="resizerMousedown($event)"
      ></div>
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
import { cmdData } from "../../app/command";
import { debounceWrapper } from "../../app/util";

export default {
  name: "SideBarMasterPage",
  props: {
    orientation: { type: String, default: "right" },
    isMiniMode: { type: Boolean, default: false }
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
      return this.isMiniMode ? this.sideBarMinWidth : this.currentSideBarWidth;
    }
  },
  data() {
    return {
      defaultSideBarWidth: 240,
      lastSideBarWidth: 240,
      currentSideBarWidth: 240,
      sideBarMinWidth: 41
    };
  },
  methods: {
    resizerMousedown(e) {
      let srcPosiX = e.pageX;
      let _this = this;

      function mousemove(me) {
        let destPosX = me.pageX;
        let movedX = srcPosiX - destPosX;
        srcPosiX = destPosX;
        if (_this.orientation == "right") _this.currentSideBarWidth += movedX;
        else _this.currentSideBarWidth -= movedX;
      }

      function mouseup() {
        //卸载事件
        $(document)
          .unbind("mousemove", mousemove)
          .unbind("mouseup", mouseup);
      }

      $(document)
        .bind("mousemove", mousemove)
        .bind("mouseup", mouseup);
    }
  },
  watch: {
    isMiniMode(newValue, oldValue) {
      if (newValue) {
        this.lastSideBarWidth = this.currentSideBarWidth;
        this.currentSideBarWidth = this.sideBarMinWidth;
      } else {
        this.currentSideBarWidth = this.lastSideBarWidth;
      }
    },
    currentSideBarWidth(newValue, oldValue) {
      if (!this.debounceExeCmd) {
        this.debounceExeCmd = debounceWrapper(e => {
          window.v3global.executeCmd(cmdData.reLayoutEditor, e[0]);
        }, 100);
      }
      this.debounceExeCmd(newValue);
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
/* .resize-handle:hover {
  background: gray;
} */
.resize-right {
  left: -2px;
}
.resize-left {
  right: -2px;
}
</style>