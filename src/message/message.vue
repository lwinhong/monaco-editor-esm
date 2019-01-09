<template>
  <div>
    <div class="titleBar">
      <span @click="change('error')">错误 {{errorCount}}</span>
      <span @click="change('sugguest')">警告 {{suggusetCount}}</span>
    </div>
    <div>
      <message-list
        listType="error"
        :dataSource="errorData"
        v-on:local-message="localError"
        v-show="currentListName =='error'"
      ></message-list>
      <message-list
        list-type="sugguest"
        :visible="currentListName"
        :dataSource="suggusetData"
        v-on:local-message="localSuggest"
        v-show="currentListName =='sugguest'"
      ></message-list>
    </div>
  </div>
</template>
<script>
import MessageList from "../message/message-list.vue";

export default {
  name: "Message",
  components: { MessageList },
  data() {
    return {
      errorData: [{
        "desc": "desc",
        "row": 1,
        "column": 1,
        "moduleName":"123",
        "moduleKey": "html"
    }],
      errorCount: 12,
      suggusetData: [],
      suggusetCount: 345,
      currentListName: "error"
    };
  },
  methods: {
    localError(row, index) {
      console.log("localError");
    },
    localSuggest(row, index) {
      console.log("localSuggest");
    },
    change(name) {
      this.currentListName = name;
    }
  }
};
</script>
<style scoped>
.titleBar{
    background-color: rgb(238, 238, 240);
}
</style>

