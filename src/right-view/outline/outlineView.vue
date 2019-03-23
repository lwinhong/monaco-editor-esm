<template>
  <Tree :data="outlineData"></Tree>
</template>
<script>
import { initEventBus } from "./outlineHandler";

export default {
  mounted(){
      
  },
  data() {
    return {
      outlineData: []
    };
  },
  methods: {
    loadOutline() {}
  }
};
</script>
