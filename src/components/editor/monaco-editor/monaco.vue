<template>
  <div
    :style="style"
    @dragover.prevent="dragover"
    @drop.prevent="drop"
    @dragenter.prevent="dragenter"
  ></div>
</template>
<script>
import debounce from "lodash/debounce";
import monacoLoader from "./monaco-loader";

export default {
  name: "monaco-editor",
  props: {
    width: { type: [String, Number], default: "100%" },
    height: { type: [String, Number], default: "100%" },
    code: { type: String, default: "" },
    srcPath: { type: String, default: "resource/monaco-editor" },
    language: { type: String, default: "javascript" },
    theme: { type: String, default: "vs" }, // vs-dark, hc-black
    options: { type: Object, default: () => {} },
    changeThrottle: { type: Number, default: 0 },
    wordWrap: { type: Boolean, default: true },
    minimap: { type: Boolean, default: false },
    tag: { type: Object }
  },
  mounted() {
    this.fetchEditor();
  },
  destroyed() {
    this.destroyMonaco();
  },
  computed: {
    style() {
      const fixedWidth = "100%";
      const fixedHeight = "100%";
      return {
        width: fixedWidth,
        height: fixedHeight
      };
    },
    editorOptions() {
      return Object.assign({}, this.defaults, this.options, {
        value: this.code,
        language: this.language,
        wordWrap: this.wordWrap,
        minimap: { enabled: this.minimap },
        theme: this.theme
      });
    }
  },
  data() {
    return {
      defaults: {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
        automaticLayout: false,
        editor: null,
        formatOnPaste: true,
        mouseWheelZoom: true,
        renderLineHighlight: "none",
        showFoldingControls: "mouseover",
        folding: true,
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8
        }
      }
    };
  },
  watch: {
    language(newValue, oldValue) {
      window.monaco.editor.setModelLanguage(this.editor.getModel(), newValue);
    },
    minimap(newValue, oldValue) {
      this.editor.updateOptions({ minimap: { enabled: newValue } });
    },
    wordWrap(newValue, oldValue) {
      this.editor.updateOptions({ wordWrap: newValue });
    },
    theme(newValue, oldValue) {
      monaco.editor.setTheme(newValue);
    }
  },
  methods: {
    editorHasLoaded(editor, monaco) {
      this.monaco = monaco;
      this.$emit("monacoMounted", editor, this.tag);
    },
    fetchEditor() {
      monacoLoader.load(this.srcPath, this.createMonaco);
    },
    createMonaco() {
      this.editor = window.monaco.editor.create(this.$el, this.editorOptions);
      this.editorHasLoaded(this.editor, window.monaco);
    },
    destroyMonaco() {
      if (typeof this.editor !== "undefined") {
        this.editor.dispose();
      }
    },
    dragover(ev) {
      const point = this.editor.getTargetAtClientPoint(ev.clientX, ev.clientY);
      this.editor.setPosition(point.position);
    },
    dragenter(ev) {
      this.editor.focus();
    },
    drop(ev) {
      const point = this.editor.getTargetAtClientPoint(ev.clientX, ev.clientY);
      const value = ev.dataTransfer.getData("Text");
      this.$emit("dropDone", this.editor, value, point.range);
    }
  }
};
</script>
<style>
/*************** monaco-editor*******************/
.code-editor .monaco-editor .bracket-match {
  border: none;
}

/* .code-editor .minimap.slider-mouseover {
  right: 8px !important;
}

.code-editor .decorationsOverviewRuler {
  width: 8px !important;
}

.code-editor .scrollbar {
  width: 8px !important;
} */

.code-editor .scrollbar .slider {
  border-radius: 4px;
}

/* .code-editor .scrollbar .vertical .slider {
  width: 8px !important;
}

.code-editor .scrollbar .vertical .slider {
  height: 8px !important;
} */

.msg-redsquiggly {
  background: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20height%3D'3'%20width%3D'6'%3E%3Cg%20fill%3D'%23ff0000'%3E%3Cpolygon%20points%3D'5.5%2C0%202.5%2C3%201.1%2C3%204.1%2C0'%2F%3E%3Cpolygon%20points%3D'4%2C0%206%2C2%206%2C0.6%205.4%2C0'%2F%3E%3Cpolygon%20points%3D'0%2C2%201%2C3%202.4%2C3%200%2C0.6'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")
    repeat-x bottom left;
}

.msg-greensquiggly {
  background: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20height%3D'3'%20width%3D'6'%3E%3Cg%20fill%3D'%23008000'%3E%3Cpolygon%20points%3D'5.5%2C0%202.5%2C3%201.1%2C3%204.1%2C0'%2F%3E%3Cpolygon%20points%3D'4%2C0%206%2C2%206%2C0.6%205.4%2C0'%2F%3E%3Cpolygon%20points%3D'0%2C2%201%2C3%202.4%2C3%200%2C0.6'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")
    repeat-x bottom left;
}

.inline-widgetcode-illegal:after {
  /*content: '[[编码重复,请修正]]';*/
  color: darkgreen;
  background: yellow;
}

/*.inline-myGlyphMarginClass {
    background: red;
}*/

.monaco-editor.vs .lineDecoration-error {
  background: #ffcccc;
  width: initial !important;
  left: 0 !important;
  right: 20px;
}

.monaco-editor.vs-dark .lineDecoration-error {
  background: #2d0000;
  width: initial !important;
  left: 0 !important;
  right: 20px;
}
/*************** monaco-editor end *******************/
</style>

