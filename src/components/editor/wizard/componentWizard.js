import dataSource from "../../../dataSource/dataSource";

export default class componentWizard {
    constructor(vue) {
        this.parentVue = vue;
    }

    getContainer(data, containers) {
        containers.splice(0, containers.length)

        for (const item of data) {
            if (item.tag && (item.tag == "vui-grid" || item.tag == "vui-tree-grid")) {
                containers.push({ tag: item.tag, tagName: item.tagName, item })
            }
        }
    }

    getEntities(entities) {
        entities.splice(0, entities.length)
        var dsData = dataSource.getEntities()
        if (!dsData) return;
        $.each(dsData, function (i, data) {
            let cols = [];
            if (data.columns) {
                $.each(data.columns, (code, filed) => {
                    cols.push({
                        code, 
                        name: filed.name,
                        dataType: filed.dataType
                    })
                })
            }
            entities.push({
                code: i,
                name: data.name,
                columns: cols
            })
        })
    }
}