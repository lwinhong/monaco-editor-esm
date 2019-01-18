<template>
  <div>
    <!-- <Tree :data="entityTree"></Tree> -->
    <Collapse simple>
      <Panel v-for="en in entityTree" :key="en.key">
        <span class="title">{{en.key}}</span>
        <span class="title-subTitle">({{en.title}})</span>
        <Icon
          type="md-return-left"
          style="float:right;padding-top:6px;transform:none;"
          :size="15"
          :title="`插入${en.key}`"
          @click.prevent="insert(en.key)"
        />
        <ul v-if="en.fields && en.fields.length>0" slot="content">
          <li
            v-for="field in en.fields"
            :key="en.key + field.key"
            @dblclick="insert(`${en.key}.current.${field.key}`)"
            :draggable="true"
            @dragstart="drag($event,field)"
          >
            <span class="title">{{field.key}}</span>
            <span class="title-subTitle">({{field.title}})</span>
            <Icon
              type="md-return-left"
              style="float:right;padding-top:7px;"
              :size="15"
              :title="`插入${en.key}.current.${field.key}`"
              @click.stop="insert(field.key)"
            />
          </li>
        </ul>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
export default {
  name: "entityView",
  data() {
    return {
      entityTree: [
        {
          key: "en1",
          title: "实体123",
          fields: [
            { key: "field1", title: "字段1" },
            { key: "field2", title: "字段2" }
          ]
        },
        {
          key: "en11111",
          title: "实体123",
          fields: [
            { key: "field1", title: "字段1" },
            { key: "field2", title: "字段2" }
          ]
        },
        {
          key: "en1111",
          title: "实体123",
          fields: [
            { key: "field1", title: "字段1" },
            { key: "field2", title: "字段2" }
          ]
        },
        {
          key: "en111",
          title: "实体123",
          fields: [
            { key: "field1", title: "字段1" },
            { key: "field2", title: "字段2" }
          ]
        },
        {
          key: "en11",
          title: "实体123",
          fields: [
            { key: "field1", title: "字段1" },
            { key: "field2", title: "字段2" }
          ]
        }
      ]
    };
  },
  methods: {
    setEntityTree(data) {
      this.entityTree.splice(0, this.entityTree.length);
      if (data) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];

          const items = [];
          if (element.items && element.items.length > 0) {
            for (let i = 0; i < element.items.length; i++) {
              const item = element.items[i];
              items.push({ key: item.code, text: item.name });
            }
          }
          const target = { key: element.code, text: element.name, item: items };
          this.entityTree.push(target);
        }
      }
    },
    onSearch(value) {},
    insert(value) {
      this.$emit("insert-value", value);
    },
    drag(ev, item) {
      ev.effectAllowed = "move";
      ev.dataTransfer.setData("Text", item.key);
      ev.dataTransfer.setDragImage(ev.target, 0, 0);
    }
  }
};
</script>
<style scoped>
ul {
  list-style-type: none;

  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

li {
  margin: 0;
  padding-left: 40px;
  padding-right: 10px;
  line-height: 25px;
  height: 25px;
  color: #666;
}
li:hover {
  background-color: rgb(228, 241, 251);
  border: 1px rgb(51, 167, 255) solid;
  box-sizing: border-box;
}
.title {
  color: rgb(68, 68, 68);
  font-family: "微软雅黑";
}
.title-subTitle {
  color: rgb(128, 128, 128);
}
</style>
<style>
.ivu-collapse {
  border: 0px !important;
}
.ivu-collapse-content {
  padding: 0px !important;
}
.ivu-collapse > .ivu-collapse-item {
  border-top: 0px;
}
.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
  height: 25px;
  line-height: 25px;
}
.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header > i {
  margin-right: 9px;
}
.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header:hover {
  background-color: rgb(228, 241, 251);
}
.ivu-collapse-content > .ivu-collapse-content-box {
  padding-bottom: 0px;
}
</style>




