<template>
  <div class="search">
    <i-input
      ref="input"
      class="titleBackColor"
      :placeholder="placeholder"
      search
      size="small"
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
<style scoped>
.search {
  padding: 8px 10px;
  
  border-bottom:  rgb(204, 204, 204) solid 1px;
}

.search .ivu-input{
   background-color: rgb(238, 238, 240); 
}
</style>