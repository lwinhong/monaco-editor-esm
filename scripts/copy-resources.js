"use strict"

const childProcess = require("child_process")
const args = process.argv.slice(2)
const root = "src/resource/"
const files = [
    "jquery-3.3.1.js",

    "images/icon-enter-dark.png",
    "images/icon-enter-light.png",
    "images/icon-prop-dark.png",
    "images/icon-prop-light.png",
    "images/waitting.gif",
    "images/clolse.png",
    "images/error.png",
    "images/fixed.png",
    "images/flow.png"

    // "dataSource/global/ThemeVar.json",
    // "dataSource/global/VLanguage.json",
    // "dataSource/global/VuiPropOption.json",
    // "dataSource/global/VuiTag.json",

    // "dataSource/local/Entities.json",
    // "dataSource/local/Resource.json",
]
const binFile = "node_modules/cpx/bin/index.js"
const glob = `${root}{${files.join(",")}}`
const dist = "dist/resource"

console.log("> cpx", glob, dist, ...args)
const cp = childProcess.spawn(
    process.execPath,
    [binFile, glob, dist, ...args],
    { stdio: "inherit" }
)
cp.on("exit", (exitCode) => {
    process.exitCode = exitCode
})
