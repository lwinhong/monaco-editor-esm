<template>
  <Layout>
    <Content>
      <Layout>
        <Content>
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
                :leftContentVisible="!isCollapsed"
                @rightCloseClick="isCollapsed=!isCollapsed"
              ></app-right-view>
            </Sider>
          </Layout>
        </Content>
        <Footer>
          <app-footer @itemClick="footItemClick"></app-footer>
        </Footer>
      </Layout>
    </Content>
    <Sider hide-trigger :width="44" :collapsed-width="44">
      <app-right-bar @itemClick="isCollapsed=false"></app-right-bar>
    </Sider>
  </Layout>
</template>
<script>
export default {
  name: "test"
};
</script>
