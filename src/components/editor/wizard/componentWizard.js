
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

        let ds = window.v3global.dataSourceHandler
        var dsData = ds.getEntities()
        if (!dsData) return;
        debugger
        $.each(dsData, function (i, data) {
            entities.push({
                code: i,
                name: data.name,
                columns: data.columns
            })
        })
    }
}