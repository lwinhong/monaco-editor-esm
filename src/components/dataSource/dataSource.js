const DATASOURCE_KEY = Symbol.for('datasource');
//const uuidv1 = require('uuid/v1');

/************************************** 数据文件路径定义 ************************************/

const dsDir = './resource/datasource';
const commomPaths = {
    get global() { return `${dsDir}/global`; },
    get local() { return `${dsDir}/local/${divFlag}`; }
}

const paths = {
    /******* 项目级别的数据 *******/
    get themeVarJsonPath() { return `${commomPaths.global}/ThemeVar.json`; },
    get vlanguageJsonPath() { return `${commomPaths.global}/VLanguage.json`; },
    get vuiTagJsonPath() { return `${commomPaths.global}/VuiTag.json`; },
    get scriptResourcePath() { return `${commomPaths.global}/ScriptResources.json`; },

    /******* 构件和窗体的数据 *******/
    get entitiesJsonPath() { return `${commomPaths.local}/Entities.json`; },
    get resourceJsonPath() { return `${commomPaths.local}/Resource.json`; },
    get viewStatePath() { return `${commomPaths.local}/ViewState.json`; },
    get existWindowControlCodePath() { return `${commomPaths.local}/ExistWindowControlCode.json`; },
    get vuiPropValueOptionsJsonPath() { return `${commomPaths.local}/VuiPropValueOptions.json`; }
}

/*************************************** 数据文件路径定义 END ***********************************/

/**
 * 获取json数据
 * @param {String} path json路径
 */
function loadJsonDataAsync(path) {
    return new Promise(function (resolve, reject) {
        $.getJSON(path, '', data => resolve(data));
    })
}


class dataSource {

    constructor(appVue) {
        //this.uuid1 = uuidv1();
        this.appVue = appVue;
        //console.log("ds:" + this.uuid1)
    }

    /**
     * 初始化全部数据源
     */
    async initDs(divFlag, appVue) {
        await this.initGlobalDs();
        await this.initlocalDs();
    }

    /**
     * 初始化全局数据（）
     */
    async initGlobalDs() {
        this.themeVarData = await loadJsonDataAsync(paths.themeVarJsonPath);
        this.vlanguageData = await loadJsonDataAsync(paths.vlanguageJsonPath);
        this.vuiPropOptionData = await loadJsonDataAsync(paths.vuiPropValueOptionsJsonPath);
        this.vuiTagData = await loadJsonDataAsync(paths.vuiTagJsonPath);
        this.scriptResourceData = await loadJsonDataAsync(paths.scriptResourcePath);
    }

    /**
     * 初始化局部数据(实体，资源)
     */
    async initlocalDs() {
        this.entitiesData = await loadJsonDataAsync(paths.entitiesJsonPath);
        this.resourceData = await loadJsonDataAsync(paths.resourceJsonPath);
        this.viewStateData = await loadJsonDataAsync(paths.viewStatePath);
        this.existWindowControlCodeData = await loadJsonDataAsync(paths.existWindowControlCodePath);
        this.divCode = this.existWindowControlCodeData.divCode;
    }


    getEntities() {
        return this.entitiesData;
    }

    getVlanguage() {
        return this.vlanguageData
    }

    getViewState() {
        return this.viewStateData;
    }

    getVuiTag() {
        return this.vuiTagData;
    }

    getVuiPropValueOptions() {
        return this.vuiPropOptionData;
    }

    getThemeVars() {
        return this.themeVarData;
    }

    getResources() {
        return this.resourceData;
    }

    getScriptResource() {
        return this.criptResourceData;
    }

    getExistWindowControlCodes() {
        if (this.existWindowControlCodeData)
            this.divCode = this.existWindowControlCodeData.divCode;
        return this.existWindowControlCodeData;
    }

    getDataSource() {
        if (!this.getAll) {
            this.getAll = {
                getVlanguage: this.getVlanguage,
                getEntities: this.getEntities,
                getViewState: this.getViewState,
                getVuiTag: this.getVuiTag,
                getVuiPropValueOptions: this.getVuiPropValueOptions,
                getThemeVars: this.getThemeVars,
                getResources: this.getResources,
                getExistWindowControlCodes: this.getExistWindowControlCodes,
                getScriptResource: this.getScriptResource
            }
        }
        return this.getAll;
    }

}

if (!global[DATASOURCE_KEY]) {
    global[DATASOURCE_KEY] = new dataSource();
}

export default global[DATASOURCE_KEY];