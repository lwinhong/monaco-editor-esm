<template>
  <master-page>
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
        <i-input search placeholder="搜索" size="small" autofocus class="vInputs"></i-input>
      </section>
    </div>
    <div class="cardView" v-for="(data, index) in eventData" :key="data.EventCode+index">
      <div class="cardView-hd">
        <h6 class="title">
          <span v-text="data.EventName"></span>
          <poptip placement="bottom-start" width="120">
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
              <a @click="codeCopied(data.code)" title="复制编码">
                <icon type="md-copy" size="16"></icon>
              </a>
            </template>
            <i-input
              v-else
              size="small"
              v-model="data.EventCode"
              :readonly="data.EventType === 'Auto'"
              :autofocus="data.autofocus||false"
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
      search: "panelTools"
    };
  },
  mounted() {
    //this.load();
  },
  methods: {
    onSearch(value) {},
    eventChanged(data) {
      data.EventName = this.eventName;
    },
    codeCopied(code) {
      this.$Message.success("已复制");
    },
    add() {
      addEvent(this.eventData);
      //   $("eventView").scrollTop($("eventView")[0].scrollHeight);
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
    }
  }
};
</script>
<style scoped>
.cardView {
  padding: 8px 0 4px;
  border-bottom: 1px solid #f5f5f6;
  transition: 0.2s background ease;
}
.cardView:hover {
  background: #fafafa;
}
.cardView:hover .cardView-hd h6 .edit {
  color: #33a7ff;
  display: inline-block;
}
.cardView-hd {
  position: relative;
  line-height: 24px;
  padding: 0 12px;
  text-align: left;
  font-weight: 700;
  color: #000;
  font-size: 13px;
}
.cardView-hd h6 > span {
  display: inline-block;
  max-width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
.cardView-hd h6 .edit {
  display: none;
  padding-left: 2px;
}
.cardView-hd .ivu-poptip-title {
  padding: 8px 16px 4px;
}
.cardView-hd .ivu-poptip-title:after {
  display: none;
}
.cardView-hd .ivu-poptip-body {
  padding-top: 0;
  text-align: right;
}
.cardView-hd .ivu-poptip-body .ivu-btn {
  margin-top: 6px;
}
.cardView-hd .extra {
  position: absolute;
  right: 16px;
  top: 3px;
  color: #999;
  cursor: pointer;
  transition: 0.3s;
}
.cardView-bd {
  padding: 8px 12px 6px;
}
.cardView-bd .ivu-form-item {
  margin-bottom: 6px;
}
.cardView-bd .ivu-input-group-append .ivu-icon {
  cursor: pointer;
}
.cardView-bd .ivu-form .ivu-form-item-label {
  padding: 6px 12px 6px 0;
  color: #777;
}
.cardView-bd .ivu-form-item-content {
  line-height: 24px;
}
.cardView-bd .ivu-form-item-content a {
  color: #aaa;
}
.cardView-bd .ivu-form-item-content a:hover {
  color: #33a7ff;
}
.cardView-bd .ivu-input[disabled],
.cardView-bd fieldset[disabled] .ivu-input {
  color: #aaa;
}
</style>