import { eventBus } from "../../../app/event-bus";
import { cmdData } from "../../../app/command";

function buildOutlineRecursion(elements, datasource) {
    if (elements && elements.length > 0) {
        for (const element of elements) {
            if (element.tag) {
                var subTitle = getNodeName(element)
                element.tagName = subTitle
                let treeNode = {
                    title: element.tag,
                    subTitle,
                    expand: true,
                    element,

                };

                if (element.children && element.children.length > 0) {
                    var ds = []
                    buildOutlineRecursion(element.children, ds)
                    treeNode.children = ds
                }
                datasource.push(treeNode)
            }
        }
    }
}
function getNodeName(element) {
    let subName
    let attrsMap = element.attrsMap
    if (attrsMap) {
        subName = attrsMap['widget-name'] || attrsMap['widget-code'] || attrsMap.class || attrsMap.id
    }
    return subName || ""
}

export default class outlineHandler {
    constructor(vue) {
        this.parentVue = vue
    }

    buildOutline(treeDataSource, nodes) {
        if (nodes) {
            buildOutlineRecursion([nodes], treeDataSource)
        }
    }

    initEventBus() {
        // eventBus.$on("executeCmd", (cmdId, value) => {
        //     switch (cmdId) {
        //         case cmdData.editorChanged:

        //             break;
        //     }
        // })
    }

    onOuntlineItemChanged(item) {
        let start = item.element.start;
        let end = item.element.end
        //let range = new monaco.Range(start.line + 1, start.col + 2, end.line + 1, end.col + 1)
        this.parentVue.v3global.executeCmd(cmdData.setPosition, { start, end })

    }
}
