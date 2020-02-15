import { getNewID } from '../../id';
class Widget {
    private id : number;
    private parent : number;    //父节点id
    private type : number;
    private widgetType : number; //在widget下继续的细分，比如grass有多种
    private z : number ;         //渲染纵轴
    constructor(parent:number,type:number,widgetType : number,z:number){
        this.id = getNewID()
        this.parent = parent;
        this.type = type;
        this.widgetType = widgetType;
        this.z = z;
    }
}

export default Widget;