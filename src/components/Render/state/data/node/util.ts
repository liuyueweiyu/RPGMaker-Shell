import Node from './index';
export function getNodeWithJson(jsonObj: any) {
    const obj = jsonObj;
    const node = new Node(obj.x,obj.y,obj.nodeType,obj.styleType);
    node.setId(obj.id);
    node.setWidgets(obj.widgets);
    node.setCanReach(obj.canReach);
    return node;
}