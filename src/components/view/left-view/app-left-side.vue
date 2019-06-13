<template>
  <sideBarMasterPage orientation="left" :isMiniMode="isMiniMode">
    <template slot="switch">
      <li
        class="fn-btn"
        :class="{'s-active':activeItemKey=='toolBox'}"
        @click="switchItemClick('toolBox')"
      >
        <tooltip content="工具箱" placement="left">
          <icon custom="vicon ico-setting" size="20"></icon>
        </tooltip>
      </li>
    </template>
    <toolbox-view @closeClick="closeClick"></toolbox-view>
  </sideBarMasterPage>
</template>
<script>
import ToolboxView from "./app-left-side-toolbox.vue";
import SideBarMasterPage from "../side-bar-master-page.vue";

export default {
  name: "AppLeftSide",
  components: {
    ToolboxView,
    SideBarMasterPage
  },
  data() {
    return {
      isMiniMode: true,
      activeItemKey: null,
      currentView: null
    };
  },
  methods: {
    closeClick() {
      this.isMiniMode = true;
    },
    switchItemClick(item) {
      if (this.currentView == item) {
        this.isMiniMode = !this.isMiniMode;
        return;
      }
      this.isMiniMode = false;
      this.setState(item);
    },
    setState(key) {
      this.activeItemKey = key;
      this.currentView = key;
    }
  },
  watch: {
    isMiniMode(newValue, oldValue) {
      if (newValue) this.setState(null);
    }
  }
};
</script>
