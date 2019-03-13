<template>
  <div class="box-bd">
    <header>
      <slot name="header"></slot>
    </header>
    <main class="panelBd">
      <slot></slot>
    </main>
  </div>
</template>
<script>
export default {
  name: "RightViewMasterPage"
};
</script>

