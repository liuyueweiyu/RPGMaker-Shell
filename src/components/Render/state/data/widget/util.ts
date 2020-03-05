import Widget from './index';

export function getWidgetWithJson(jsonObj: any){
    const w = new Widget(jsonObj.type,jsonObj.status,jsonObj.parent,jsonObj.x,jsonObj.y,jsonObj.z,jsonObj.canReach);
    w.setID(jsonObj.id);
    return w;
}