var htmlparser = require("htmlparser2");
var fs = require('fs');
var a = fs.readFileSync('D:\\源代码\\NodejsWorkspace\\monaco-editor-esm\\dist\\index.html',{encoding: 'utf-8'});

// var parser = new htmlparser.Parser({
//     onopentag: function(name, attribs){
//         if(name === "script" && attribs.type === "text/javascript"){
//             console.log("JS! Hooray!");
//         }
//     },
//     ontext: function(text){
//         console.log("-->", text);
//     },
//     onclosetag: function(tagname){
//         if(tagname === "script"){
//             console.log("That's it?!");
//         }
//     }
// }, {decodeEntities: true,xmlMode:true});
// parser.write(a);
// parser.end();


var handler = new htmlparser.DomHandler(function (error, dom) {
    if (error){
    	throw new error()
    }else{
    	console.log(dom[2].childs);
    }
       
});
var parser = new htmlparser.Parser(handler);
parser.write(a);
parser.done();

