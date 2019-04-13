<template>
  <div class="app">
    <Spin size="large" fix v-if="isMaskShow"></Spin>
    <app-preview></app-preview>
    <div class="g-layout">
      <main class="g-body">
        <app-left-side></app-left-side>
        <!--舞台-->
        <div class="g-cont">
          <div class="m-codeView">
            <app-editor ref="editor"></app-editor>
            <!--状态栏{-->
            <!-- <app-footer></app-footer> -->
          </div>
        </div>
        <!--右栏-->
        <app-right-side></app-right-side>
      </main>
      <!--全局状态栏-->
      <footer class="g-footer hide">我是底部状态栏:备用</footer>
    </div>
  </div>
</template>
<script>
import AppEditor from "./editor/app-editor.vue";
// import AppFooter from "./editor/foot/app-footer.vue";
import AppRightSide from "./right-view/app-right-side.vue";
import AppPreview from "./preview/app-preview.vue";
import AppLeftSide from "./left-view/app-left-side.vue";
// import { Container, Draggable } from "vue-smooth-dnd";

export default {
  name: "App",
  components: {
    AppEditor,
    // AppFooter,
    AppRightSide,
    AppPreview,
    AppLeftSide
  },
  data() {
    return {
      isMaskShow: true
    };
  },
  methods: {

  },
  mounted() {
    setTimeout(() => {
      this.isMaskShow = false;
    }, 2000);
  }
};
</script>

