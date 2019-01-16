<template>
  <Tree :data="entityTree"></Tree>
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
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                }
              },
              [
                h("span", [h("span", data.title)]),
                h(
                  "span",
                  {
                    style: {
                      display: "inline-block",
                      float: "right",
                      marginRight: "30px"
                    }
                  },
                  [
                    h("Button", {
                      props: Object.assign(
                        {},
                        {
                          icon: "md-return-left",
                          type: "text"
                        }
                      ),
                      style: {
                        width: "30px"
                      },
                      on: {
                        click: () => {
                          alert("insert");
                        }
                      }
                    })
                  ]
                )
              ]
            );
          },
          children: [
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

    onSearch(value) {}
  }
};
</script>
<style scoped>
ul.tree,
ul.tree ul {
  list-style-type: none;

  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

ul.tree ul {
  margin-left: 10px;
}

ul.tree li {
  margin: 0;
  padding: 1px 15px;
  line-height: 30px;
  height: 30px;
  color: #369;
  font-weight: bold;
}
ul.tree li:hover {
  background-color: rgb(228, 241, 251);
  border: 1px rgb(51, 167, 255) solid;
}
ul.tree li:last-child {
  background: #fff;
}
</style>



