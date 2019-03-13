import { eventBus } from "../../app/event-bus";
import { cmdData } from "../../app/command";

const xmlParser = require("fast-xml-parser")
const Parser = xmlParser.j2xParser

const eventType = { Auto: "Auto", User: "User" }

/**
 * 初始化事件总线
 * @param {eventView.vue} vue 
 */
export const initEventBus = (vue) => {
    eventBus.$on("executeCmd", (cmdId, value) => {
        switch (cmdId) {
            case "load":
            case cmdData.dataLoaded:
                vue.load(value);
                break;
            case "updateEventDev":
                vue.updateEventDev(value)
                break;
            case "updateEventOld":
                vue.updateEventOld(value)
                break;
            case cmdData.editorChanged:
                if (!isDevEditorMode())
                    vue.updateEventOld(value)
                break;
        }
    });
}

/**
 * 新增一个事件
 * @param {数据源} eventDataSource 
 */
export const addEvent = (eventDataSource) => {
    eventDataSource.push({
        EventName: newEventName(eventDataSource),
        EventCode: newEventCode(eventDataSource),
        EventType: eventType.User,
        ParamMapping: "",
        ParamCount: 0,
        MethodCode: "",
        autofocus: true
    })
}

/**
 * 新建一个事件名称
 * @param {当前全部事件数据} eventDataSource 
 */
const newEventName = (eventDataSource) => {
    var index = 1
    while (true) {
        var exist = false
        for (const e of eventDataSource) {
            var newName = "事件" + index
            if (newName === e.EventName) {
                index++
                exist = true
            }
        }
        if (exist === false) {
            return "事件" + index
        }
    }
}

/**
 * 新建一个事件编码
 * @param {当前全部事件数据} eventDataSource 
 */
const newEventCode = (eventDataSource) => {
    var index = 1
    while (true) {
        var exist = false
        for (const e of eventDataSource) {
            var newCode = "onClick" + index
            if (newCode === e.EventCode) {
                index++
                exist = true
            }
        }
        if (exist === false) {
            return "onClick" + index
        }
    }
}

/**
 * 加载事件列表
 * @param {当前事件数据集合对象} eventDataSource 
 * @param {要加载数据} value 
 */
export const loadEvent = (eventDataSource, value) => {

    //debugger
    //value = JSON.parse(`{"Events":"<ArrayOfEventEntity><EventEntity><EventCode>OnClick</EventCode><EventName>OnClick</EventName><MethodCode>GetUseManualData</MethodCode><EventType>Auto</EventType><ParamMapping><MappingInfo><Key>key1</Key><Input>TypeId</Input></MappingInfo></ParamMapping><KeyValueString>{'key1': 'TypeId'}</KeyValueString></EventEntity><EventEntity><EventCode>OnClick</EventCode><EventName>OnClick</EventName><MethodCode>GetUseManualData</MethodCode><EventType>Auto</EventType><ParamMapping><MappingInfo><Key>key1</Key><Input>TypeId</Input></MappingInfo></ParamMapping><KeyValueString>{'key1': 'TypeId'}</KeyValueString></EventEntity></ArrayOfEventEntity>"}`)

    eventDataSource.splice(0, eventDataSource.length)
    if (!value || !value.Events)
        return

    const result = xmlParser.parse(value.Events)
    if (!result || !result.ArrayOfEventEntity || !result.ArrayOfEventEntity.EventEntity)
        return

    var entities = result.ArrayOfEventEntity.EventEntity
    console.log("event load:" + entities)
    if (entities instanceof Array) {
        console.log("laodeEvent: array")
        for (const entity of entities) {
            if (!entity || entity === "")
                continue
            pushEventData(eventDataSource, entity)
        }
    }
    else if (entities instanceof Object) {
        console.log("laodeEvent: object")
        pushEventData(eventDataSource, entities)
    }

    updateEmptyEventName(eventDataSource)
}

const pushEventData = (eventDataSource, entity) => {
    eventDataSource.push({
        EventName: entity.EventName,
        EventCode: entity.EventCode,
        EventType: entity.EventType || eventType.Auto,
        ParamMapping: entity.ParamMapping,
        ParamCount: entity.ParamCount || 0,
        MethodCode: entity.MethodCode
    })
}

const updateEmptyEventName = (eventDataSource) => {
    for (const e of eventDataSource) {
        if (!e.EventName || e.EventName === "") {
            e.EventName = newEventName(eventDataSource)
        }
    }
}

export const saveEvent = (eventDataSource) => {
    const parser = new Parser({})
    const json = { ArrayOfEventEntity: { EventEntity: eventDataSource } }
    const xml = parser.parse(json)
    return xml
}

export const refresh = () => {
    if (isDevEditorMode()) {
        window.global.executeCmdInternal("loadEvent")
    } else {

    }
}

export const updateEventDev = (eventDataSource, value) => {
    if (value && value.ok && value.value) {
        const events = value.value
        console.log(events)
        for (const e of events) {
            var exist = eventIsExist(eventDataSource, e.eventCode)
            if (exist) {
                exist["ParamCount"] = e.argumentNum
            } else {
                pushEventData({
                    EventCode: e.eventCode,
                    ParamCount: e.argumentNum,
                    EventName: newEventName(eventDataSource)
                })
            }
        }
    }
}

const eventIsExist = (eventDataSource, eventCode) => {
    for (const e of eventDataSource) {
        if (e.EventCode === eventCode)
            return e
    }
    return null
}

export const updateEventOld = (eventDataSource, value) => {
    debugger
}