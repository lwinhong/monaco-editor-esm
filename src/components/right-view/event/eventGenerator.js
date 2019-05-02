const recast = require('recast');

export default class eventGenerator {
    analyzeDev(template) {

    }

    analyzeNormal(template) {

    }

    async getEventCode(attrName, attrValue) {
        if (attrValue && attrName) {
            if (attrName.startsWith("@") || attrName.startsWith("v-on")) {
                if (attrValue.indexOf("$emit") != -1) {
                    let { eventCode } = await parseDomEventCaller(attrValue)
                    return eventCode
                }
            }
        }
        return ""
    }
}

/**
 * 解析emit字符串
 * @param {String} val emit字符串
 */
function parseDomEventCaller(val) {
    return new Promise((resolve, reject) => {
        try {
            let ast = recast.parse(val);
            let events = [];
            recast.visit(ast, {
                events: events,
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
    let events = [];

    return new Promise((resolve, reject) => {
        recast.visit(ast, {
            events: events,
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