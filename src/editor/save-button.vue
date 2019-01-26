<template>
  <dropdown
    id="ddSaveAndClose"
    style="margin-right: 5px; margin-top: 2px;"
    slot="extra"
    trigger="custom"
    @on-click="closeDropdownButton"
  >
    <div class="dropBtn">
      <div class="save-close" @click="emit('saveAndClose')">
        <Icon type="ios-list-box" class="iconsave"></Icon>
        <span>保存并关闭</span>
      </div>
    </div>
    <dropdown-menu slot="list" placement="bottom">
      <dropdown-item>
        <div>另存为</div>
      </dropdown-item>
      <dropdown-item divided>
        <div>打开文件</div>
      </dropdown-item>
    </dropdown-menu>
  </dropdown>
</template>
<script>
export default {
  name: "SaveButton",
  methods: {
    closeDropdownButton() {
      
    }
  }
};
</script>
<style scoped>
/***************保存关闭按钮*******************/
.dropBtn {
  background-color: #faf8f8;
  border: 1px solid transparent;
  border-color: #dddee1;
  border-radius: 2px;
  color: #495060;
  cursor: pointer;
  display: inline-block;
  font-size: 12px;
  line-height: 2.2;
  outline: none;
  padding-left: 10px;
  padding-right: 5px;
  padding-top: 1px;
  transition: color 0.2s linear, background-color 0.2s linear,
    border 0.2s linear;
  vertical-align: middle;
  margin-top: 1px;
}

.dropBtn:hover {
  background: #e6e6e6;
}

.dropBtn img {
  vertical-align: text-bottom;
}

.dropBtn .save-close {
  cursor: default;
  float: left;
  margin-right: 4px;
}

.dropBtn .save-close .iconsave {
  font-size: 17px;
  vertical-align: middle;
  position: relative;
  top: -1px;
  margin-right: 6px;
}

.dropBtn .lable-down {
  border-left: 1px solid #dddee1;
  float: right;
  padding-left: 3px;
  width: 15px;
}

.dropBtn .lable-down:hover {
  background-color: #f7f7f7;
  color: blue;
}
/***************end 保存关闭按钮*********************/
</style>


