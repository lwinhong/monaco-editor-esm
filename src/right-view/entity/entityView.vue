<template>
  <master-page class="p-data">
    <div slot="header">
      <section class="panelHd">
        <h3>实体</h3>
        <span>
          <icon type="ios-close" size="25"></icon>
        </span>
      </section>
      <section :class="search">
        <i-button size="small" icon="md-add" type="primary" class="btn-add" title="添加新实体">添加新实体</i-button>
        <i-button size="small" icon="ios-search" class="btn-search" @click="searching"></i-button>
        <i-input search placeholder="搜索" size="small" autofocus class="vInputs"></i-input>
      </section>
    </div>
    <!-- <Tree :data="entityTree"></Tree> -->
    <Collapse simple>
      <Panel v-for="(en,i) in entityTree" :key="en.key+i" :name="en.key+i">
        <div class="node">
          <span class="node-tit">
            {{en.key}}
            <em>{{en.title}}</em>
          </span>
          <span class="node-op">
            <icon
              custom="vicon ico-insert"
              size="14"
              @click.prevent="insert(entityWrapper(en.key))"
              :title="`插入${entityWrapper(en.key)}`"
            ></icon>
          </span>
        </div>
        <ul slot="content" v-if="en.fields && en.fields.length > 0">
          <li
            v-for="field in en.fields"
            :key="en.key + field.key"
            :draggable="true"
            @dragstart="drag($event,field)"
            @dblclick="insert(entityWrapper(en.key,field.key))"
          >
            <div class="node">
              <span class="node-tit">
                {{field.key}}
                <em>{{field.title}}</em>
              </span>
              <span class="node-op">
                <icon
                  custom="vicon ico-insertAll"
                  size="14"
                  @click="insert(entityWrapper(en.key,field.key))"
                  :title="`插入${entityWrapper(en.key,field.key)}`"
                ></icon>&nbsp;
                <icon
                  custom="vicon ico-insert"
                  size="14"
                  @click="insert(field.key)"
                  :title="`插入${field.key}`"
                ></icon>
              </span>
            </div>
          </li>
        </ul>
      </Panel>
    </Collapse>
  </master-page>
</template>
<script>
import EntityItem from "./entityItem.vue";
import { eventBus } from "../../app/event-bus";
import MasterPage from "../rightView-master-page.vue";
import { cmdData } from "../../app/command";

export default {
  name: "entityView",
  components: { EntityItem, MasterPage },
  created() {
    eventBus.$on("executeCmd", (cmdId, value) => {
      if ("updateData" === cmdId || cmdId == cmdData.dataLoaded)
        this.buildTree();
    });
  },
  data() {
    return {
      entityTree: [],
      currentItemKey: "",
      search: "panelTools"
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
    searching: function() {
      this.search = "panelTools s-searching";
    },
    insert(value) {
      window.v3global.executeCmd("insertValue", value);
    },
    drag(ev, item) {
      ev.effectAllowed = "move";
      ev.dataTransfer.setData("Text", item.key);
      ev.dataTransfer.setDragImage(ev.target, 0, 0);
    },
    entityWrapper(entityName, fieldName) {
      if (isDevEditorMode()) {
        if (fieldName) {
          return `${entityName}.current.${fieldName}`;
        }
        return `${entityName}.current`;
      } else {
        if (fieldName) {
          return `${entityName}.${fieldName}`;
        }
        return entityName;
      }
    },
    buildTree() {
      const tree = this.entityTree;
      tree.splice(0, tree.length);

      try {
        const ds = window.v3global.dataSourceHandler.getDataSource();
        var data = ds.getEntities();
        if (!data) return;
        $.each(data, function(i, data) {
          var cols = new Array();
          $.each(data.columns, function(j, colData) {
            cols.push({ key: j, name: colData });
          });
          tree.push({ key: i, title: data.name, fields: cols });
        });
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    //this.buildTree();
  }
};
</script>




