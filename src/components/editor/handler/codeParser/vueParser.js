const vueCompiler = require("vue-template-compiler/browser")
const vueTempCompiler = require("vue-template-compiler")

const options = {
    outputSourceRange: true,
    whitespace: 'preserve',
}
export default  {

    parse(code) {
        return vueCompiler.compile(code, options).ast;
    },

    nodeToRange(node) {
        if (node.type || node.name) {
            return [node.start, node.end];
        }
    },

    opensByDefault(node, key) {
        return key === 'children';
    },

    getNodeName(node) {
        let nodeName = node.tag;
        if (nodeName && node.name) {
            nodeName += `(${node.name})`;
        }
        return nodeName;
    },

    parseComponent(code) {
        let rs = vueTempCompiler.parseComponent(data);
        return rs;
    }

}
