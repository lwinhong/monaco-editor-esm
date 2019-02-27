<template>
  <DropdownMenu slot="list" v-if="items&&items.length>0">
    <DropdownItem v-for="child in items" :key="child.key">{{child.text}}</DropdownItem>

    <Dropdown v-if="child.childs" transfer placement="left-end">
      <BarItem :items="child.childs"></BarItem>
    </Dropdown>
  </DropdownMenu>
</template>
<script>
export default {
  name: "BarItem",
  props: {
    items: Array
  },
  methods: {
    itemclick(item) {
      this.$emit("itemClick", item);
    }
  }
};
</script>
