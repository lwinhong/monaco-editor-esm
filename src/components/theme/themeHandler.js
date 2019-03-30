var lastThemeKey = "default"
const themeCssDir = "resource/styles/style."

function createThemeCssfile(themeKey) {
    let fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", themeCssDir + themeKey + ".css")
    return fileref
}

function changeThemeCss(newKey) {
    if (newKey == lastThemeKey)
        return

    let oldName = themeCssDir + lastThemeKey + ".css"
    let allsuspects = document.getElementsByTagName("link")
    for (var i = allsuspects.length; i >= 0; i--) {
        let link = allsuspects[i];
        if (!link)
            continue

        let attr = link.getAttribute("href")
        if (!attr || attr.indexOf(oldName) == -1)
            continue

        let newelement = createThemeCssfile(newKey)
        allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i])
        lastThemeKey = newKey
        break
    }
}
function getThemes() {
    return [{ key: "default", name: "默认(白)" }, { key: "dark", name: "黑" }]
}

export default { changeThemeCss, getThemes }