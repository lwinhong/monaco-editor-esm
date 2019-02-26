/************************************** 数据文件路径定义 ************************************/
const dsDir = './resource/datasource'
const global = `${dsDir}/global`
const local = `${dsDir}/local/${divFlag}`

/******* 项目级别的数据 *******/
const themeVarJsonPath = `${global}/ThemeVar.json`
const vlanguageJsonPath = `${global}/VLanguage.json`
const vuiTagJsonPath = `${global}/VuiTag.json`
const scriptResourcePath = `${global}/ScriptResources.json`

/******* 构件和窗体的数据 *******/
const entitiesJsonPath = `${local}/Entities.json`
const resourceJsonPath = `${local}/Resource.json`
const viewStatePath = `${local}/ViewState.json`
const existWindowControlCodePath = `${local}/ExistWindowControlCode.json`
const vuiPropValueOptionsJsonPath = `${local}/VuiPropValueOptions.json`
/*************************************** 数据文件路径定义 END ***********************************/

var themeVarData
var vlanguageData
var vuiPropOptionData
var vuiTagData
var scriptResourceData

var entitiesData
var resourceData
//var viewStateData
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
    loadJsonData(themeVarJsonPath, data => themeVarData = data)
    loadJsonData(vlanguageJsonPath, data => vlanguageData = data)
    loadJsonData(vuiPropValueOptionsJsonPath, data => vuiPropOptionData = data)
    loadJsonData(vuiTagJsonPath, data => vuiTagData = data)
    loadJsonData(scriptResourcePath, data => scriptResourceData = data)
}

/**
 * 初始化局部数据(实体，资源)
 */
const initlocalDs = () => {
    loadJsonData(entitiesJsonPath, data => entitiesData = data)
    loadJsonData(resourceJsonPath, data => resourceData = data)
    //loadJsonData(viewStatePath, data => viewStateData = data)
    loadJsonData(existWindowControlCodePath, data => {
        existWindowControlCodeData = data
        divCode = data.divCode
    })
}

/**
 * 初始化全部数据源
 */
const initDs = () => {
    initGlobalDs();
    initlocalDs();
}

/************************************ 数据源获取 *************************************/
const getEntities = callback => {
    getDataSourceCommon(entitiesData, entitiesJsonPath, callback)
}

const getVlanguage = callback => {
    getDataSourceCommon(vlanguageData, vlanguageJsonPath, callback)
    return vlanguageData
}

const getViewState = callback => {
    getDataSourceCommon(null, viewStatePath, callback)
}

const getVuiTag = callback => {
    getDataSourceCommon(vuiTagData, vuiTagJsonPath, callback)
    return vuiTagData
}

const getVuiPropValueOptions = callback => {
    getDataSourceCommon(vuiPropOptionData, vuiPropValueOptionsJsonPath, callback)
    return vuiPropOptionData
}

const getThemeVars = callback => {
    getDataSourceCommon(themeVarData, themeVarJsonPath, callback)
}

const getResources = callback => {
    getDataSourceCommon(resourceData, resourceJsonPath, callback)
}

const getExistWindowControlCodes = callback => {
    getDataSourceCommon(existWindowControlCodeData, existWindowControlCodePath, callback)
    if (existWindowControlCodeData)
        divCode = existWindowControlCodeData.divCode
    return existWindowControlCodeData
}

const getDataSourceCommon = (data, path, callback) => {
    if (!data)
        loadJsonData(path, callback)
    else
        if (callback)
            callback(data)
}

///////////////////////////////////////

const getDataSource = () => {
    return {
        getVlanguage, getEntities, getViewState, getVuiTag, getVuiPropValueOptions, getThemeVars, getResources, getExistWindowControlCodes
    }
}

export default {
    loadJsonData, initDs, initGlobalDs, initlocalDs, getDataSource
}