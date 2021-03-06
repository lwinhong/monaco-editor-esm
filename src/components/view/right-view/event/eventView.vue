<template>
  <master-page class="p-event" @closeClick="$emit('closeClick')">
    <template slot="header-title">事件</template>
    <Icon slot="header-trigger" type="md-refresh" @click="refresh"></Icon>
    <section :class="search" slot="header-content">
      <i-button
        size="small"
        icon="md-add"
        class="btn-add"
        title="添加事件"
        @click="add"
        type="primary"
      >添加事件</i-button>
      <i-button size="small" icon="ios-search" class="btn-search" @click="searching"></i-button>
      <i-input
        search
        clearable
        placeholder="搜索"
        size="small"
        autofocus
        class="vInputs"
        v-model="searchBind"
        @on-change="searchTextChanged"
      ></i-input>
    </section>

    <div
      class="cardView"
      v-for="(data, index) in filterEvents"
      :key="data.EventCode+index"
      :class="{actived:selectedEventId==data.id}"
      :id="data.id"
      @click="selectedEventId=data.id"
    >
      <div class="cardView-hd">
        <h6 class="title">
          <span v-text="data.EventName"></span>
          <poptip
            placement="bottom-start"
            :width="220"
            @on-popper-show="showNameModifyPicker(data.EventName)"
          >
            <a href="#" title="修改名称" class="edit">
              <icon type="ios-create-outline" size="18"></icon>
            </a>
            <div slot="title">修改名称</div>
            <div slot="content">
              <i-input size="small" v-model="eventName"></i-input>
              <br>
              <i-button type="primary" @click="eventChanged(data)" size="small">完成</i-button>
            </div>
          </poptip>
        </h6>
        <icon
          v-if="data.EventType=== 'User'"
          type="ios-trash-outline"
          size="18"
          class="extra"
          @click="eventData.splice(index, 1)"
        ></icon>
      </div>
      <div class="cardView-bd">
        <i-form :label-width="60">
          <form-item label="事件编码">
            <template v-if="data.EventType === 'Auto'">
              <span v-text="data.EventCode"></span>
              <a @click="codeCopied(data.EventCode)" title="复制编码">
                <icon type="md-copy" size="16"></icon>
              </a>
            </template>
            <i-input
              v-else
              size="small"
              v-model="data.EventCode"
              icon="md-copy"
              class="vInputs"
              :readonly="data.EventType === 'Auto'"
              :ref="data.id"
              @on-click="codeCopied(data.EventCode)"
            ></i-input>
          </form-item>
          <form-item label="处理方法">
            <i-input size="small" v-model="data.MethodCode" readonly class="vInputs">
              <icon slot="append" type="md-open"></icon>
            </i-input>
          </form-item>
          <form-item label="参数映射">
            <i-input size="small" :value="data.ParamMapping?'已设置':''" readonly class="vInputs">
              <icon slot="append" type="md-open"></icon>
            </i-input>
          </form-item>
        </i-form>
      </div>
    </div>
    <input type="hidden" v-model="setSelectedEventTrigger">
  </master-page>
</template>
<script>
import {
  addEvent,
  loadEvent,
  saveEvent,
  initEventBus,
  refresh,
  updateEventDev,
  updateEventOld,
  setSelectedEvent,
  getEvents
} from "./eventHandler";

import MasterPage from "../../view-master-page.vue";
import * as clipboard from "clipboard-polyfill";
import { createNamespacedHelpers } from "vuex";
const {
  mapState,
  // mapActions,
  mapGetters
  // mapMutations
} = createNamespacedHelpers("codeEditorStore");

export default {
  name: "eventView",
  components: { MasterPage },
  created() {
    initEventBus(this);
  },
  data() {
    return {
      eventData: [],
      eventName: "",
      search: "panelTools",
      searchText: "",
      searchBind: "",
      selectedEventId: ""
    };
  },
  computed: {
    ...mapState(["currentNodeAndAttr"]),
    setSelectedEventTrigger() {
      let node = this.currentNodeAndAttr;
      this.setSelectedEvent(node);
      return 0;
    },
    filterEvents() {
      if (this.searchText == "") return this.eventData;

      return this.eventData.filter(e => {
        return (
          e.EventCode.indexOf(this.searchText) != -1 ||
          e.MethodCode.indexOf(this.searchText) != -1 ||
          e.EventName.indexOf(this.searchText) != -1
        );
      });
    }
  },
  mounted() {
    //this.load();
  },
  methods: {
    ...mapGetters([
      "getNearestNodeAndAttribute",
      "getHtmlEditorNodesSameLevel"
    ]),
    async setSelectedEvent(nodeAndAttr) {
      this.selectedEventId = await setSelectedEvent(this, nodeAndAttr);
      this.scrollIntoViewByCode();
    },
    scrollIntoViewByCode(code) {
      let id = "editor_event_" + (code || this.selectedEventId);
      let doc = document.getElementById(id);
      if (doc) doc.scrollIntoView();
    },
    searchTextChanged(value) {
      let _this = this;
      if (this.searchTimer) clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        _this.searchText = _this.searchBind;
      }, 500);
    },
    eventChanged(data) {
      data.EventName = this.eventName;
    },
    codeCopied(value) {
      clipboard.writeText(value).then(() => this.$Message.success("已复制"));
    },
    add() {
      this.searchText = "";
      this.search = "panelTools";
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs[item.id][0].focus();
          this.scrollIntoViewByCode();
        }, 100);
      });
      var item = addEvent(this.eventData, "user");
      //
      this.selectedEventId = item.id;
    },
    refresh() {
      //refresh();
      getEvents(this.getHtmlEditorNodesSameLevel())
        .then(val => {})
        .catch(err => {});
    },
    save() {
      return saveEvent(this.eventData);
    },
    load(value) {
      loadEvent(this.eventData, value);
    },
    updateEventDev(value) {
      updateEventDev(this.eventData, value);
    },
    updateEventOld(value) {
      updateEventOld(this.eventData, value);
    },
    searching() {
      this.search = "panelTools s-searching";
    },
    showNameModifyPicker(name) {
      this.eventName = name;
    }
  }
};
</script>
<style>
.p-event .actived {
  background: var(--cardView-hover-bg);
}
</style>
