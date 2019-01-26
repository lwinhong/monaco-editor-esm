<template>
  <Layout>
    <Layout>
      <Content>
        <app-editor ref="editor"></app-editor>
      </Content>
      <Sider
        collapsible
        hideTrigger
        :width="310"
        :collapsed-width="0"
        v-model="isCollapsed"
        @on-collapse="onSiderCollapse"
      >
        <app-right-view
          ref="rightView"
          @closeClick="isCollapsed=true"
          @rightCloseClick="isCollapsed=!isCollapsed"
        ></app-right-view>
      </Sider>
      <Sider hide-trigger :width="44" :collapsed-width="44">
        <app-right-bar ref="rightBar" @itemClick="isCollapsed=false"></app-right-bar>
      </Sider>
    </Layout>
    <Footer>
      <app-footer @itemClick="footItemClick"></app-footer>
    </Footer>
  </Layout>
</template>
<script>
export default {
  name: "test"
};
</script>
