<template>
  <div
    class="entityItem"
    @mouseenter="hoverKey = code"
    @mouseleave="hoverKey = ''"
    :title="itemTitle"
    :class="selectedItemKey===code?'itemSelectedStyle':''"
  >
    <span class="title">{{text}}</span>
    <span class="title-subTitle" v-show="subText">({{subText}})</span>
    <Icon
      :type="insertIcon"
      style="float:right;padding-top:7px;cursor:pointer;"
      :size="insertIconSize"
      :title="insertTitleTrigger"
      @click.stop="$emit('insert-item', text)"
      v-show="hoverKey === code && insertIcon"
    />
  </div>
</template>
<script>
export default {
  name: "EntityItem",
  props: {
    code: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    subText: {
      type: String,
      default: ""
    },
    itemTitle: {
      type: String,
      default: ""
    },
    insertIconTitle: {
      type: String,
      default: "点击插入到编辑器"
    },
    insertIcon: {
      type: String,
      default: "md-return-left"
    },
    insertIconSize: {
      type: Number,
      default: 15
    },
    selectedItemKey: {
      type: String,
      default: ""
    }
  },
  computed: {
    insertTitleTrigger() {
      return `点击将字段【${this.text}】插入到编辑器`;
    }
  },
  data() {
    return {
      hoverKey: ""
    };
  }
};
</script>
<style scoped>
.entityItem {
  padding-left: 40px;
  padding-right: 10px;
}

.itemSelectedStyle,
.entityItem:hover {
  background-color: rgb(228, 241, 251);
}
.title {
  color: rgb(68, 68, 68);
  font-family: "微软雅黑";
}
.title-subTitle {
  color: rgb(128, 128, 128);
}
</style>
