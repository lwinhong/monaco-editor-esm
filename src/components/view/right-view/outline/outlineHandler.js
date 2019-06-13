// import { eventBus } from "../../../../app/event-bus";
import { cmdData } from "../../../../app/command"
// import { debounceWrapper } from '../../../../app/util'

function buildOutlineRecursion(elements, datasource, cacheNodes) {
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
                }
                cacheNodes.push(treeNode)

                if (element.children && element.children.length > 0) {
                    var ds = []
                    buildOutlineRecursion(element.children, ds, cacheNodes)
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

function getNearestNode(nodes, offset) {
    if (!nodes || !offset || nodes.length == 0)
        return null

    let nearestNode
    let os = 0
    for (let index = 0; index < nodes.length; index++) {
        const element = nodes[index]
        const node = element.element
        if (node.start <= offset && node.end >= offset) {
            let tmp = node.end - node.start;
            if (index == 0)
                os = tmp
            if (os >= tmp) {
                os = tmp
                nearestNode = element
            }
        }
    }
    return nearestNode
}

export default class outlineHandler {
    constructor(vue) {
        this.parentVue = vue
        this.cacheNodes = []
    }

    buildOutline(treeDataSource, nodes) {
        this.cacheNodes.splice(0, this.cacheNodes.length)
        if (nodes) {
            buildOutlineRecursion([nodes], treeDataSource, this.cacheNodes)
        }
    }

    // setSelectNode(position) {
    //     let _this = this
    //     if (!this.setSelectNodeDebounceWrapper) {
    //         this.setSelectNodeDebounceWrapper = debounceWrapper(args => {
    //             let p = args[0]
    //             let node = getNearestNode(_this.cacheNodes, p)
    //             if (node)
    //                 _this.parentVue.selectedNodeKey = node.nodeKey;
    //         }, 500)
    //     }
    //     this.setSelectNodeDebounceWrapper(position)
    // }

    setSelectNode(node) {
        if (this.cacheNodes.length > 0) {
            this.cacheNodes.forEach(element => {
                if (element.element == node) {
                    this.parentVue.selectedNodeKey = element.nodeKey
                    return
                }
            })
        }
    }

    onOuntlineItemChanged(item) {
        let start = item.element.start
        let end = item.element.end
        this.parentVue.v3global.executeCmd(cmdData.setPosition, { start, end })
    }
}
