<template>
  <div>
    <div class="cardView">
      <div class="cardView-hd">
        <h6 class="title">
          <span>事件1</span>
          <a href="#" title="修改事件名称">
            <icon type="ios-create-outline" size="18"></icon>
          </a>
        </h6>
        <icon type="ios-trash-outline" size="18" class="extra"></icon>
      </div>
      <div class="cardView-bd">
        <i-form :label-width="60">
          <form-item label="事件编码">
            <i-input size="small"></i-input>
          </form-item>
          <form-item label="处理方法">
            <i-input size="small" readonly>
              <icon slot="append" type="md-open"></icon>
            </i-input>
          </form-item>
          <form-item label="参数映射">
            <i-input size="small" readonly>
              <icon slot="append" type="md-open"></icon>
            </i-input>
          </form-item>
        </i-form>
      </div>
    </div>
    <div class="cardView">
      <div class="cardView-hd">
        <h6 class="title">
          <span>事件1</span>
          <a href="#" title="修改事件名称">
            <icon type="ios-create-outline" size="18"></icon>
          </a>
        </h6>
      </div>
      <div class="cardView-bd">
        <i-form :label-width="60">
          <form-item label="事件编码">
            <i-input size="small" disabled></i-input>
          </form-item>
          <form-item label="处理方法">
            <i-input size="small" readonly>
              <icon slot="append" type="md-open"></icon>
            </i-input>
          </form-item>
          <form-item label="参数映射">
            <i-input size="small" readonly>
              <icon slot="append" type="md-open"></icon>
            </i-input>
          </form-item>
        </i-form>
      </div>
    </div>
    <div class="cardView">
      <div class="cardView-hd">
        <h6 class="title">
          <span>事件1</span>
          <a href="#" title="修改事件名称">
            <icon type="ios-create-outline" size="18"></icon>
          </a>
        </h6>
      </div>
      <div class="cardView-bd">
        <i-form :label-width="60">
          <form-item label="事件编码">
            <i-input size="small" disabled></i-input>
          </form-item>
          <form-item label="处理方法">
            <i-input size="small" readonly>
              <icon slot="append" type="md-open"></icon>
            </i-input>
          </form-item>
          <form-item label="参数映射">
            <i-input size="small" readonly>
              <icon slot="append" type="md-open"></icon>
            </i-input>
          </form-item>
        </i-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "eventView",
  data() {
    return {
      code: "// type your code \n"
    };
  },
  methods: {
    onSearch(value) {}
  }
};
</script>
<style scoped>
.cardView {
  border-bottom: 1px solid #f5f5f6;
  padding: 8px 0 4px;
  transition: 0.2s background ease;
}
.cardView .cardView-hd {
  position: relative;
  line-height: 24px;
  padding: 0 12px;
  text-align: left;
  font-weight: bold;
  color: #000;
  font-size: 13px;
}
.cardView .cardView-hd h6 > span {
  display: inline-block;
  max-width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
.cardView .cardView-hd h6 > a {
  display: none;
  padding-left: 2px;
}
.cardView .cardView-hd .extra {
  position: absolute;
  right: 16px;
  top: 3px;
  color: #999;
  cursor: pointer;
  transition: 0.3s;
}
.cardView .cardView-hd .extra:hover {
  color: #4285f4;
}
.cardView .cardView-bd {
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

.cardView:hover {
  background: #fafafa;
}
.cardView:hover .cardView-hd h6 > a {
  display: inline-block;
}
.cardView .ivu-input[disabled],
.cardView fieldset[disabled] .ivu-input {
  color: #aaa;
}
</style>

<style >

</style>


