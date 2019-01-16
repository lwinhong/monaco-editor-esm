<template>
  <div style="padding:8px 10px">
    <i-input
      ref="input"
      class="titleBackColor"
      :placeholder="placeholder"
      search
      @on-search="search"
    >earch</i-input>
  </div>
</template>
<script>
export default {
  name: "AppSearch",
  props: {
    placeholder: {
      type: String,
      default: "搜索"
    }
  },
  methods: {
    search(value) {
      this.$emit("search", value);
    },
    setFocus() {
      this.$refs.input.focus();
    }
  }
};
</script>
<style>
.ivu-input {
  background-color: rgb(238, 238, 240) !important;
  height: 30px;
}
</style>

