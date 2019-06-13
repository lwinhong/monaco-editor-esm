const recast = require('recast');

export default class eventGenerator {
    constructor() {
        this.events = []
    }
    addEvent({ eventCode, argumentNum }) {
        let found = false
        for (const e of this.events) {
            if (e.eventCode == eventCode) {
                found = true
                e.argumentNum = argumentNum
            }
        }
        if (!found)
            this.events.push({ eventCode, argumentNum })
    }
    async analyzeDev(nodes, script) {
        for (const node of nodes) {
            await this.analyzeNode(node);
        }
    }

    async analyzeNode(node) {
        for (const key in node.attrsMap) {
            if (node.attrsMap.hasOwnProperty(key)) {
                const value = node.attrsMap[key];
                let e = await this.getEventCode(key, value)
                if (e)
                    this.addEvent(e)
            }
        }
    }

    async getEventCode(attrName, attrValue) {
        if (attrValue && attrName) {
            if (attrName.startsWith("@") || attrName.startsWith("v-on")) {
                if (attrValue.indexOf("$emit") != -1) {
                    return await parseDomEventCaller(attrValue)
                }
            }
        }
        return null
    }
}

/**
 * 解析emit字符串
 * @param {String} val emit字符串
 */
function parseDomEventCaller(val) {
    let ast = recast.parse(val);
    return new Promise((resolve, reject) => {
        try {
            //let events = [];
            recast.visit(ast, {
                //events: events,
                visitCallExpression: function (path) {
                    let node = path.value;
                    let callee = node.callee;
                    if (callee) {
                        if (callee.name == "$emit") {
                            let args = node.arguments;
                            if (args.length > 0) {
                                let eventCode = args[0].value;
                                resolve({ eventCode, argumentNum: args.length - 1 })
                            }
                        }
                    }
                }
            });
        } catch (e) {
            reject("解析事件参数错误，解析的字符串：[" + val + "]");
        }
    })
}

function analyzeJavascript(javascript) {
    let ast = recast.parse(javascript);
    //let events = [];

    return new Promise((resolve, reject) => {
        recast.visit(ast, {
            //events: events,
            visitCallExpression: function (path) {
                let node = path.value;
                let callee = node.callee;
                if (callee) {
                    let obj = callee.object;
                    let property = callee.property;
                    if (obj && property && obj.type == "ThisExpression" && property.type == "Identifier" && property.name == "$emit") {
                        let args = node.arguments;
                        let eventCode = args[0].value;
                        resolve({ eventCode, argumentNum: args.length - 1 })
                    }
                }
            }
        })
    });
}