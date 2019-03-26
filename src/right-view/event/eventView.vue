<template>
  <master-page class="p-event">
    <div slot="header">
      <section class="panelHd">
        <h3>事件</h3>
        <span>
          <icon type="ios-refresh" size="25"></icon>
          <icon type="ios-close" size="25"></icon>
        </span>
      </section>
      <section :class="search">
        <i-button size="small" icon="md-add" class="btn-add" title="添加事件" @click="add">添加事件</i-button>
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
    </div>
    <div class="cardView" v-for="(data, index) in filterEvents" :key="data.EventCode+index">
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
              :readonly="data.EventType === 'Auto'"
              icon="md-copy"
              :ref="data.EventCode+(data.EventFlag||'')"
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
  updateEventOld
} from "./eventHandler";

import MasterPage from "../rightView-master-page.vue";
import * as clipboard from "clipboard-polyfill";

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
      searchBind: ""
    };
  },
  computed: {
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
      
      var item = addEvent(this.eventData,"123");
      debugger
      this.$refs[item.EventCode+"123"].focus();
    },
    refresh() {
      refresh();
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
    searching: function() {
      this.search = "panelTools s-searching";
    },
    showNameModifyPicker(name) {
      this.eventName = name;
    }
  }
};
</script>