/**
 * 获取url的参数
 * @returns {} 
 */
function getQueryString() {
    var qs = location.search.substr(1), // 获取url中"?"符后的字串  
        args = {}, // 保存参数数据的对象
        items = qs.length ? qs.split("&") : [], // 取得每一个参数项,
        item,
        len = items.length;

    for (var i = 0; i < len; i++) {
        item = items[i].split("=");
        var name = decodeURIComponent(item[0]),
            value = decodeURIComponent(item[1]);
        if (name) {
            args[name] = value;
        }
    }
    return args;
}

/********************************************** js 和 html 注释去除相关处理***************************************************/

const htmlCommentReg = /\<\!\-\-[\s\S]*?\-\-\>/g;
const jsCommentReg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n|$))|(\/\*(\n|.)*?\*\/)/g;

/**
 * html注释
 * @param {} html 
 * @returns {} 
 */
function removeComments(html) {
    if (!html)
        return html
    return html.replace(htmlCommentReg, "")
}

/**
 * 去除js注释
 * @param {} script 
 * @returns {} 
 */
function removeJsComments(script) {
    if (!script)
        return script
    return script.replace(jsCommentReg,
        function (word) {
            // 去除注释后的文本 
            return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word
        })
}

/********************************************** js 和 html 注释去除相关处理 END***************************************************/


/********************************************** prototype ***************************************************/
String.prototype.trimStr = function (char, type) {
    if (char) {
        if (type === 'left') {
            return this.replace(new RegExp('^\\' + char + '+', 'g'), '');
        } else if (type === 'right') {
            return this.replace(new RegExp('\\' + char + '+$', 'g'), '');
        }
        return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
};

//字符串扩展
String.format = function (str) {
    var args = arguments, re = new RegExp("%([1-" + args.length + "])", "g");
    return String(str).replace(
        re,
        function ($1, $2) {
            return args[$2];
        }
    );
};

// ReSharper disable once NativeTypePrototypeExtending
String.prototype.format = function() {
    var str = this;
    var args = arguments, re = new RegExp("%([1-" + args.length + "])", "g");
    return String(str).replace(
        re,
        function($1, $2) {
            return args[$2];
        }
    );
};

// ReSharper disable once NativeTypePrototypeExtending
String.prototype.equalIgnoreCase = function(str) {
    if (str && (this.toLowerCase() === str.toLowerCase()))
        return true;
    return false;
};

/**
 * 获取数组中重复的数据
 * @returns {} 
 */
// ReSharper disable once NativeTypePrototypeExtending
Array.prototype.distinct = function() {
    var a = [], b = [], c = [], d;
    var object = this;
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            d = object[prop];
            if (d === a[prop]) {
                continue;
            } //防止循环到prototype
            if (b[d] !== 1) {
                a.push(d);
                b[d] = 1;
            } else {
                c.push(d);
                d[d] = 1;
            }
        }
    }
    return c.distinct1();
};

/**
 *  去除数组的重复数据
 * @returns {} 
 */
// ReSharper disable once NativeTypePrototypeExtending
Array.prototype.distinct1 = function() {
    var a = [], b = [];
    var object = this;
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            var d = object[prop];
            if (d === a[prop]) continue; //防止循环到prototype
            if (b[d] !== 1) {
                a.push(d);
                b[d] = 1;
            }
        }
    }
    return a;
};
/********************************************** prototype end ***************************************************/

export default {
    getQueryString, removeJsComments, removeComments
}