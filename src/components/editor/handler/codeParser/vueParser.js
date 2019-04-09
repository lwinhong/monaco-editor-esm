const vueCompiler = require("vue-template-compiler/browser")
const vueTempCompiler = require("vue-template-compiler")

const options = {
    outputSourceRange: true,
    whitespace: 'preserve',
}
export default {

    parse(code) {
        return vueCompiler.compile(code, options).ast;
    },

    nodeToRange(node) {
        if (node.type || node.name) {
            return [node.start, node.end]
        }
    },

    opensByDefault(node, key) {
        return key === 'children'
    },

    getNodeName(node) {
        let nodeName = node.tag;
        if (nodeName && node.name) {
            nodeName += `(${node.name})`
        }
        return nodeName
    },

    parseComponent(code) {
        let rs = vueTempCompiler.parseComponent(code);
        return rs
    },

    parseComponentWithData(data) {
        if (data && data.VueComponent) {
            try {
                let pc = vueTempCompiler.parseComponent(data.VueComponent)
                if (pc.template)
                    data.Template = pc.template.content
                if ( pc.script)
                    data.Script = pc.script.content
            } catch (error) {
                console.error(error)
            }
        }
    }
}
