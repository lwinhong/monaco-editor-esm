<template>
  <div>
    <!-- <Tree :data="entityTree"></Tree> -->
    <Collapse simple>
      <Panel v-for="en in entityTree" :key="en.key">
        <span class="title">{{en.key}}</span>
        <span class="title-subTitle">({{en.title}})</span>
        <Icon
          type="md-return-left"
          style="float:right;padding-top:6px;transform:none;cursor:pointer;"
          :size="15"
          :title="`插入${en.key}`"
          @click.prevent="insert(en.key)"
        />
        <ul v-if="en.fields && en.fields.length > 0" slot="content">
          <li
            v-for="field in en.fields"
            :key="en.key + field.key"
            @dblclick="insert(`${en.key}.current.${field.key}`)"
            :draggable="true"
            @dragstart="drag($event,field)"
          >
            <entity-item
              :code="en.key+field.key"
              :text="field.key"
              :sub-text="field.title"
              :selectedItemKey="currentItemKey"
              @click="currentItemKey = en.key+field.key"
              @insert-item="insert"
            ></entity-item>
          </li>
        </ul>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
import EntityItem from "./entityItem.vue";
import { eventBus } from "../../app/event-bus";

export default {
  name: "entityView",
  components: { EntityItem },
  created() {
    eventBus.$on("executeCmd", (cmdId, value) => {
      if ("updateData" === cmdId || cmdId === "dataLoaded") this.buildTree();
    });
  }, 
  data() {
    return {
      entityTree: [],
      currentItemKey: ""
    };
  },
  methods: {
    setEntityTree(data) {
      this.entityTree.splice(0, this.entityTree.length);
      if (data) {
        for (const element of data) {
          const items = [];
          if (element.items && element.items.length > 0) {
            for (const item of element.items) {
              items.push({ key: item.code, text: item.name });
            }
          }
          const target = { key: element.code, text: element.name, item: items };
          this.entityTree.push(target);
        }
      }
    },
    setCurrentItemKey(key) {
      this.currentItemKey = key;
    },
    onSearch(value) {},
    insert(value) {
      //eventBus.$emit("executeCmd", "insertValue", value);
      window.global.executeCmdInternal("insertValue", value);
    },
    drag(ev, item) {
      ev.effectAllowed = "move";
      ev.dataTransfer.setData("Text", item.key);
      ev.dataTransfer.setDragImage(ev.target, 0, 0);
    },
    buildTree() {
      const tree = this.entityTree;
      tree.splice(0, tree.length);
      try {
        const ds = window.global.dataSourceHandler.getDataSource();
        ds.getEntities(data => {
          if (!data) return;
          $.each(data, function(i, data) {
            var cols = new Array();
            $.each(data.columns, function(j, colData) {
              cols.push({ key: j, name: colData });
            });
            tree.push({ key: i, title: data.name, fields: cols });
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.buildTree();
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
  /* padding-left: 40px;
  padding-right: 10px; */
  line-height: 25px;
  height: 25px;
  color: #666;
}
.itemSelectedStyle {
  background-color: rgb(228, 241, 251);
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




