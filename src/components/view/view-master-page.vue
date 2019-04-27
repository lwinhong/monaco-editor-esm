<template>
  <div class="box-bd">
    <header>
      <section class="panelHd">
        <h3>
          <slot name="header-title"></slot>
        </h3>
        
        <span>
          <slot name="header-trigger"></slot>
          <icon type="ios-close" size="25" @click="$emit('closeClick')"></icon>
        </span>
      </section>
      <slot name="header-content"></slot>
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

