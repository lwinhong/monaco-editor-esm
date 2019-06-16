import dataSource from "../../../dataSource/dataSource";
import { debounceWrapper } from '../../../app/util';

const COMPONENTWIZARD_KEY = Symbol.for("COMPONENTWIZARD_KEY");
const contentWidgetId = "v3.div.wizard.content.widget";
const gridKeysSet = new Set(["vui-grid", "vui-tree-grid"])
const contentWidget = {
    domNode: null,
    getId() {
        return contentWidgetId;
    },
    getDomNode() {
        if (!this.domNode) {
            this.domNode = document.createElement('div');
            this.domNode.className = 'chartSetting';
            let span = document.createElement('span');
            span.innerText = "打开向导"
            this.domNode.appendChild(span)
        }
        return this.domNode;
    },
    getPosition() {
        return {
            position: wizardWidgetPosition,
            preference: [monaco.editor.ContentWidgetPositionPreference.BELOW]
        };
    }
};

let _this;
let gridNode;
let wizardWidgetPosition

class componentWizard {

    constructor() {
        _this = this;
    }

    init(parentVue) {
        this.parentVue = parentVue;
    }

    initOpenWizard(editor, model) {
        let onMouseDown = debounceWrapper(args => {
            let e = args[0]
            if (e.event.leftButton) {
                if (e.target.detail == contentWidgetId) { //点击向导的wizard，打开向导
                    _this.parentVue.showWizard();
                    wizardWidgetPosition = null
                    editor.layoutContentWidget(contentWidget);
                    return;
                }

                wizardWidgetPosition = e.target.position
                if (!wizardWidgetPosition)
                    return;
                let offset = model.getOffsetAt(wizardWidgetPosition)
                gridNode = _this.parentVue.getNearestNode()(offset)

                if (gridNode && gridNode.tag) {
                    if (!gridKeysSet.has(gridNode.tag)) {
                        wizardWidgetPosition = null
                    }
                    editor.layoutContentWidget(contentWidget)
                }
            }
        }, 150);

        editor.onMouseDown(onMouseDown)
        editor.addContentWidget(contentWidget);
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

if (!global[COMPONENTWIZARD_KEY])
    global[COMPONENTWIZARD_KEY] = new componentWizard();

export default global[COMPONENTWIZARD_KEY];