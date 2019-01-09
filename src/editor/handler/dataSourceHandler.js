import dsPath from './dataSourcePath'

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
 * @param {回调返回数据} callback 
 */
const loadJsonData = (path, callback) => {
    $.getJSON(path, '', data => {
        if (callback)
            callback(data);
    })
}

/**
 * 初始化全局数据（）
 */
const initGlobalDs = () => {
    loadJsonData(dsPath.themeVarJsonPath, data => themeVarData = data)
    loadJsonData(dsPath.vlanguageJsonPath, data => vlanguageData = data)
    loadJsonData(dsPath.vuiPropOptionJsonPath, data => vuiPropOptionData = data)
    loadJsonData(dsPath.vuiTagJsonPath, data => vuiTagData = data)
    loadJsonData(dsPath.scriptResourcePath, data => scriptResourceData = data)
}

/**
 * 初始化局部数据(实体，资源)
 */
const initlocalDs = () => {
    loadJsonData(dsPath.entitiesJsonPath, data => entitiesData = data)
    loadJsonData(dsPath.resourceJsonPath, data => resourceData = data)
    loadJsonData(dsPath.viewStatePath, data => viewStateData = data)
    loadJsonData(dsPath.existWindowControlCodePath, data => existWindowControlCodeData = data)
}

/**
 * 初始化全部数据源
 */
const initDs = () => {
    initGlobalDs();
    initlocalDs();
}

const getDataSource = () => {
    return {
        themeVarData, vlanguageData, vuiPropOptionData, vuiTagData, scriptResourceData,
        entitiesData, resourceData, viewStateData, existWindowControlCodeData
    }
}

export default {
    loadJsonData, initDs, initGlobalDs, initlocalDs, getDataSource
}