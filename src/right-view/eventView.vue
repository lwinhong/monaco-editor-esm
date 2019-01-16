<template>
  <div class="fille">
    <!-- <app-search ref="seach" v-show="searchVisible" @search="onSearch" placeholder="搜索事件"></app-search> -->
  </div>
</template>
<script>
export default {
  name: "eventView",
//   data() {
//     return {
//       searchVisible: true
//     };
//   },
  methods: {
     onSearch(value) {
         
     },
    // changeSearchVisible() {
    //   this.searchVisible = !this.searchVisible;
    //   if (this.searchVisible) {
    //     this.$refs.seach.setFocus();
    //   }
    // }
  }
};
</script>

