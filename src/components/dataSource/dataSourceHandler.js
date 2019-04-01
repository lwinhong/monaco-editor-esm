//let util = require('util');

/************************************** 数据文件路径定义 ************************************/

const dsDir = './resource/datasource'
const commomPaths = {
    get global() { return `${dsDir}/global` },
    get local() { return `${dsDir}/local/${divFlag}` }
}

const paths = {
    /******* 项目级别的数据 *******/
    get themeVarJsonPath() { return `${commomPaths.global}/ThemeVar.json` },
    get vlanguageJsonPath() { return `${commomPaths.global}/VLanguage.json` },
    get vuiTagJsonPath() { return `${commomPaths.global}/VuiTag.json` },
    get scriptResourcePath() { return `${commomPaths.global}/ScriptResources.json` },

    /******* 构件和窗体的数据 *******/
    get entitiesJsonPath() { return `${commomPaths.local}/Entities.json` },
    get resourceJsonPath() { return `${commomPaths.local}/Resource.json` },
    get viewStatePath() { return `${commomPaths.local}/ViewState.json` },
    get existWindowControlCodePath() { return `${commomPaths.local}/ExistWindowControlCode.json` },
    get vuiPropValueOptionsJsonPath() { return `${commomPaths.local}/VuiPropValueOptions.json` }
}

/*************************************** 数据文件路径定义 END ***********************************/

var themeVarData
var vlanguageData
var vuiPropOptionData
var vuiTagData
var scriptResourceData

var entitiesData
var resourceData
var viewStateData
var existWindowControlCodeData

/**
 * 获取json数据
 * @param {json路径} path 
 */
function loadJsonDataAsync(path) {
    return new Promise(function (resolve, reject) {
        $.getJSON(path, '', data => resolve(data))
    })
}

/**
 * 初始化全局数据（）
 */
const initGlobalDs = async () => {
    themeVarData = await loadJsonDataAsync(paths.themeVarJsonPath)
    vlanguageData = await loadJsonDataAsync(paths.vlanguageJsonPath)
    vuiPropOptionData = await loadJsonDataAsync(paths.vuiPropValueOptionsJsonPath)
    vuiTagData = await loadJsonDataAsync(paths.vuiTagJsonPath)
    scriptResourceData = await loadJsonDataAsync(paths.scriptResourcePath)
}

/**
 * 初始化局部数据(实体，资源)
 */
const initlocalDs = async () => {
    entitiesData = await loadJsonDataAsync(paths.entitiesJsonPath)
    resourceData = await loadJsonDataAsync(paths.resourceJsonPath)
    viewStateData = await loadJsonDataAsync(paths.viewStatePath)
    existWindowControlCodeData = await loadJsonDataAsync(paths.existWindowControlCodePath)
    divCode = existWindowControlCodeData.divCode
}

/**
 * 初始化全部数据源
 */
const initDs = async (divFlag, appVue) => {
    await initGlobalDs()
    await initlocalDs()
}

/************************************ 数据源获取 *************************************/
const getEntities = () => {
    // if (!entitiesData)
    //     entitiesData = await loadJsonDataAsync(paths.entitiesJsonPath)
    return entitiesData
}

const getVlanguage = () => {
    // if (!vlanguageData)
    //     vlanguageData = await loadJsonDataAsync(paths.vlanguageJsonPath)
    return vlanguageData
}

const getViewState = () => {
    return viewStateData
}

const getVuiTag = () => {
    // if (!vuiTagData)
    //     vuiTagData = await loadJsonDataAsync(paths.vuiTagJsonPath)
    return vuiTagData
}

const getVuiPropValueOptions = () => {
    // if (!vuiPropOptionData)
    //     vuiPropOptionData = await loadJsonDataAsync(paths.vuiPropValueOptionsJsonPath)
    return vuiPropOptionData
}

const getThemeVars = () => {
    // if (!themeVarData)
    //     themeVarData = await loadJsonDataAsync(paths.themeVarJsonPath)
    return themeVarData
}

const getResources = () => {
    // if (!resourceData)
    //     resourceData = await loadJsonDataAsync(paths.resourceJsonPath)
    return resourceData
}

const getScriptResource = () => {
    // if (!scriptResourceData)
    //     scriptResourceData = await loadJsonDataAsync(paths.scriptResourcePath)
    return scriptResourceData
}

const getExistWindowControlCodes = () => {
    // if (!existWindowControlCodeData)
    //     existWindowControlCodeData = await loadJsonDataAsync(paths.existWindowControlCodePath)
    if (existWindowControlCodeData)
        divCode = existWindowControlCodeData.divCode
    return existWindowControlCodeData
}


///////////////////////////////////////

const getDataSource = () => {
    return {
        getVlanguage, getEntities, getViewState, getVuiTag, getVuiPropValueOptions, getThemeVars, getResources, getExistWindowControlCodes, getScriptResource
    }
}

export default {
    initDs, initGlobalDs, initlocalDs, getDataSource
}