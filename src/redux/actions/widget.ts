import Node from '../../components/Render/state/data/node';
export const ACTION_TYPE_SET_NEXT_WIDGETS = "SET_NEXT_WIDGET";
export function setNextWidget(types : Array<Array<string>>) {
    return {
        type : ACTION_TYPE_SET_NEXT_WIDGETS,
        nextWidgetType : types
    }
}

export const ACTION_TYPE_ADD_NEW_WIDGETS = "ADD_NEW_WIDGETS";
export function addNewWidgets(nodes:Array<Array<Node>>) {
    return {
        type : ACTION_TYPE_ADD_NEW_WIDGETS,
        nodes
    }
}