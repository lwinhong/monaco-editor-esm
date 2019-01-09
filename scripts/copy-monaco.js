"use strict"

const childProcess = require("child_process")
const args = process.argv.slice(2)
const root = "src/monaco-editor/vs/"
const files = [
    "loader.js",
    "loader.js.map",
    "base/worker/workerMain.js",
    "base/worker/workerMain.js.map",
    "basic-languages/_.contribution.js",
    "basic-languages/apex/apex.contribution.js",
    "basic-languages/apex/apex.js",
    "basic-languages/azcli/azcli.contribution.js",
    "basic-languages/azcli/azcli.js",
    "basic-languages/bat/bat.contribution.js",
    "basic-languages/bat/bat.js",
    "basic-languages/clojure/clojure.contribution.js",
    "basic-languages/clojure/clojure.js",
    "basic-languages/coffee/coffee.contribution.js",
    "basic-languages/coffee/coffee.js",
    "basic-languages/cpp/cpp.contribution.js",
    "basic-languages/cpp/cpp.js",
    "basic-languages/csharp/csharp.contribution.js",
    "basic-languages/csharp/csharp.js",
    "basic-languages/csp/csp.contribution.js",
    "basic-languages/csp/csp.js",
    "basic-languages/css/css.contribution.js",
    "basic-languages/css/css.js",
    "basic-languages/dockerfile/dockerfile.contribution.js",
    "basic-languages/dockerfile/dockerfile.js",
    "basic-languages/fsharp/fsharp.contribution.js",
    "basic-languages/fsharp/fsharp.js",
    "basic-languages/go/go.contribution.js",
    "basic-languages/go/go.js",
    "basic-languages/handlebars/handlebars.contribution.js",
    "basic-languages/handlebars/handlebars.js",
    "basic-languages/html/html.contribution.js",
    "basic-languages/html/html.js",
    "basic-languages/ini/ini.contribution.js",
    "basic-languages/ini/ini.js",
    "basic-languages/java/java.contribution.js",
    "basic-languages/java/java.js",
    "basic-languages/javascript/javascript.contribution.js",
    "basic-languages/javascript/javascript.js",
    "basic-languages/less/less.contribution.js",
    "basic-languages/less/less.js",
    "basic-languages/lua/lua.contribution.js",
    "basic-languages/lua/lua.js",
    "basic-languages/markdown/markdown.contribution.js",
    "basic-languages/markdown/markdown.js",
    "basic-languages/msdax/msdax.contribution.js",
    "basic-languages/msdax/msdax.js",
    "basic-languages/mysql/mysql.contribution.js",
    "basic-languages/mysql/mysql.js",
    "basic-languages/objective-c/objective-c.contribution.js",
    "basic-languages/objective-c/objective-c.js",
    "basic-languages/perl/perl.contribution.js",
    "basic-languages/perl/perl.js",
    "basic-languages/pgsql/pgsql.contribution.js",
    "basic-languages/pgsql/pgsql.js",
    "basic-languages/php/php.contribution.js",
    "basic-languages/php/php.js",
    "basic-languages/postiats/postiats.contribution.js",
    "basic-languages/postiats/postiats.js",
    "basic-languages/powerquery/powerquery.contribution.js",
    "basic-languages/powerquery/powerquery.js",
    "basic-languages/powershell/powershell.contribution.js",
    "basic-languages/powershell/powershell.js",
    "basic-languages/pug/pug.contribution.js",
    "basic-languages/pug/pug.js",
    "basic-languages/python/python.contribution.js",
    "basic-languages/python/python.js",
    "basic-languages/r/r.contribution.js",
    "basic-languages/r/r.js",
    "basic-languages/razor/razor.contribution.js",
    "basic-languages/razor/razor.js",
    "basic-languages/redis/redis.contribution.js",
    "basic-languages/redis/redis.js",
    "basic-languages/redshift/redshift.contribution.js",
    "basic-languages/redshift/redshift.js",
    "basic-languages/ruby/ruby.contribution.js",
    "basic-languages/ruby/ruby.js",
    "basic-languages/rust/rust.contribution.js",
    "basic-languages/rust/rust.js",
    "basic-languages/sb/sb.contribution.js",
    "basic-languages/sb/sb.js",
    "basic-languages/scheme/scheme.contribution.js",
    "basic-languages/scheme/scheme.js",
    "basic-languages/scss/scss.contribution.js",
    "basic-languages/scss/scss.js",
    "basic-languages/shell/shell.contribution.js",
    "basic-languages/shell/shell.js",
    "basic-languages/solidity/solidity.contribution.js",
    "basic-languages/solidity/solidity.js",
    "basic-languages/sql/sql.contribution.js",
    "basic-languages/sql/sql.js",
    "basic-languages/st/st.contribution.js",
    "basic-languages/st/st.js",
    "basic-languages/swift/swift.contribution.js",
    "basic-languages/swift/swift.js",
    "basic-languages/typescript/typescript.contribution.js",
    "basic-languages/typescript/typescript.js",
    "basic-languages/vb/vb.contribution.js",
    "basic-languages/vb/vb.js",
    "basic-languages/xml/xml.contribution.js",
    "basic-languages/xml/xml.js",
    "basic-languages/yaml/yaml.contribution.js",
    "basic-languages/yaml/yaml.js",
    "editor/editor.main.css",
    "editor/editor.main.js",
    "editor/editor.main.js.map",
    "editor/editor.main.nls.zh-cn.js",
    "language/css/cssMode.js",
    "language/css/cssWorker.js",
    "language/html/htmlMode.js",
    "language/html/htmlWorker.js",
    "language/json/jsonMode.js",
    "language/json/jsonWorker.js",
    "language/typescript/languageFeatures.js",
    "language/typescript/ts.worker.js",
    "language/typescript/tsMode.js",
    "language/typescript/tsWorker.js",
    "language/typescript/workerManager.js",
    "language/typescript/lib/lib.js",
    "language/typescript/lib/typescriptServices.js"
  ]
const binFile = "node_modules/cpx/bin/index.js"
const glob = `${root}{${files.join(",")}}`
const dist = "dist/monaco-editor/vs"

console.log("> cpx", glob, dist, ...args)
const cp = childProcess.spawn(
    process.execPath,
    [binFile, glob, dist, ...args],
    { stdio: "inherit" }
)
cp.on("exit", (exitCode) => {
    process.exitCode = exitCode
})
