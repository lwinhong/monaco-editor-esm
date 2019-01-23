<template>
  <div class="fille">
    <!-- <app-search ref="seach" v-show="searchVisible" @search="onSearch" placeholder="搜索事件"></app-search> -->
    <!-- <monaco
      height="600"
      language="html"
      :code="code"
      :options="options"
      :highlighted="highlightLines"
      :changeThrottle="500"
      theme="vs-dark"
      @mounted="onMounted"
      @codeChange="onCodeChange"
    ></monaco> -->
  </div>
</template>
<script>
//import monaco from "../monaco-editor/monaco.vue";
export default {
  name: "eventView",
  //components:{monaco},
  data() {
    return {
      code: "// type your code \n",
      highlightLines: [
        {
          number: 0,
          class: "primary-highlighted-line"
        },
        {
          number: 0,
          class: "secondary-highlighted-line"
        }
      ]
    };
  },
  methods: {
    onSearch(value) {},
    onMounted(editor) {
      console.log("after mount!", editor, editor.getValue(), editor.getModel());
      this.editor = editor;
    },
    onMounted2(editor) {
      console.log("after mount!", editor, editor.getValue(), editor.getModel());
      this.editor2 = editor;
    },
    onCodeChange(editor) {
      console.log("code changed!", "code:" + this.editor.getValue());
    },
    onCodeChange2(editor) {
      console.log("code changed!", "code:" + this.editor2.getValue());
    },
    clickHandler() {
      console.log("here is the code:", this.editor.getValue());
    }
  },
  created() {
    this.options = {
      selectOnLineNumbers: false
    };
  }
};
</script>

