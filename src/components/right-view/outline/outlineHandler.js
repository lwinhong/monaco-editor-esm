import { eventBus } from "../../../app/event-bus";
import { cmdData } from "../../../app/command";

class outlineHandler {
    constructor(vue) {
        this.parentVue = vue;
    }

    buildOutline(treeDataSource, nodes) {
        treeDataSource.splice(0, treeDataSource.length);

        function re(elements, datasource) {
            if (elements && elements.length > 0) {
                for (const element of elements) {
                    let treeNode = { title: element.name, expand: true ,element};
                    
                    if (element.children && element.children.length > 0) {
                        var ds = []
                        re(element.children, ds)
                        treeNode.children = ds
                    }
                    datasource.push(treeNode)
                }
            }
        }

        if (nodes)
            re(nodes.nodes, treeDataSource)
    };



    initEventBus() {
        eventBus.$on("executeCmd", (cmdId, value) => {
            switch (cmdId) {
                case cmdData.editorChanged:

                    break;
            }
        })
    };
}

export default outlineHandler 