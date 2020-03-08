import { EventTarget } from '../../components/Render/state/event/target';

export const ACTION_TYPE_ADD_ACTIVE_NODE = "ADD_ACTIVE_NODE";
export function addActiveNodeAction(eventTarget:EventTarget,isAppend :boolean) {
    return {
        type : ACTION_TYPE_ADD_ACTIVE_NODE,
        eventTarget,
        isAppend
    }
}

export const ACTION_TYPE_ADD_HOVER_NODE = "ADD_HOVER_NODE";
export function addHoverNodeAction(eventTarget:EventTarget) {
    return {
        type : ACTION_TYPE_ADD_HOVER_NODE,
        eventTarget,
    }
}
