<template>
  <Modal v-model="visible" fullscreen footer-hide title="预览">
    <Spin size="large" fix v-show="isMaskShow"></Spin>
    <div :class="viewErea">
      <iframe
        id="preview_iframe"
        :src="defaultSrc"
        style="width:100%;height:100%;border:none"
        v-show="!isMaskShow"
        :class="{'viewBox':isMobileForm}"
      ></iframe>
    </div>
  </Modal>
</template>
<script>
import { eventBus } from "../../app/event-bus";
import { cmdData } from "../../app/command";
export default {
  name: "AppPreview",
  created() {
    eventBus.$on("executeCmd", (cmd, value) => {
      switch (cmd) {
        case cmdData.showPreviewForm:
          this.visible = true;
          this.isMaskShow = true;
          this.$Loading.start();
          break;
        case cmdData.setPreview:
          this.isMaskShow = false;
          if (value == "error") {
            this.$Loading.console.error();
          } else {
            this.$Loading.finish();
            this.src = value;
            document.getElementById("preview_iframe").src = value;
          }
          break;
      }
    });
  },
  data() {
    return {
      defaultSrc: "about:blank",
      src: "",
      visible: false,
      isMaskShow: true
    };
  },
  computed: {
    isMobileForm() {
      return formType == "Mobile";
    },
    viewErea() {
      return { "m-designView": this.isMobileForm, 'fill': !this.isMobileForm };
    }
  },
  watch: {
    visible() {
      this.src = this.defaultSrc;
      document.getElementById("preview_iframe").src = this.defaultSrc;
      console.log(this.visible + ": " + this.src);
    }
  }
};
</script>

