import Node from '../../components/Render/state/data/node';

export const ACTION_TYPE_ADD_ACTIVE_NODE = "ADD_ACTIVE_NODE";
export function addActiveNodeAction(nodes : Array<Array<Node>>,isAppend :boolean) {
    return {
        type : ACTION_TYPE_ADD_ACTIVE_NODE,
        nodes,
        isAppend
    }
}

export const ACTION_TYPE_ADD_HOVER_NODE = "ADD_HOVER_NODE";
export function addHoverNodeAction(nodes : Array<Array<Node>>) {
    return {
        type : ACTION_TYPE_ADD_HOVER_NODE,
        nodes,
    }
}
