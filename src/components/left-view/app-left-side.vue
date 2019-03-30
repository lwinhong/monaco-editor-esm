<template>
  <sideBarMasterPage orientation="left">
    <template slot="switch">
      <li class="fn-btn s-active">
        <tooltip content="工具箱" placement="left">
          <icon custom="vicon ico-setting" size="20"></icon>
        </tooltip>
      </li>
    </template>
    <toolbox-view></toolbox-view>
  </sideBarMasterPage>
</template>
<script>
import ToolboxView from "./toolbox/toolboxView.vue";
import sideBarMasterPage from "../view/side-bar-master-page.vue";
export default {
  name: "AppLeftSide",
  components: {
    ToolboxView,
    sideBarMasterPage
  }
};
</script>
