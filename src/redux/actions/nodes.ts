import Node from '../../components/Render/state/data/node';

export const ACTION_TYPE_ADD_ACTIVE_NODE = "ADD_ACTIVE_NODE";
export function addActiveNodeAction(node : Node, isMuti :boolean) {
    return {
        type : ACTION_TYPE_ADD_ACTIVE_NODE,
        node : node,
        isMuti
    }
}

export const ACTION_TYPE_ADD_HOVER_NODE = "ADD_HOVER_NODE";
export function addHoverNodeAction(node : Node) {
    return {
        type : ACTION_TYPE_ADD_HOVER_NODE,
        node : node,
    }
}
