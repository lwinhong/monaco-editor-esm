import { eventBus } from "../../app/event-bus";
import { cmdData } from "../../app/command";

export const initEventBus = (vue) => {
    eventBus.$on("executeCmd", (cmdId, value) => {
        switch (cmdId) {
            case cmdData.editorChanged:
                
                break;
        }
    });
}