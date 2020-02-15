import { getNewID } from '../../id';
class Widget {
    private id : number;
    private parent : number = 0;    //父节点id
    private type : number;//在widget下继续的细分，比如grass有多种
    private widgetType : number; 
    private z : number ;         //渲染纵轴
    private canReach : boolean = true;
    constructor(type:number,widgetType : number,z:number,canReach:boolean){
        this.id = getNewID()
        this.type = type;
        this.widgetType = widgetType;
        this.z = z;
        this.canReach = canReach;
    }

    setParent(p:number) {
        this.parent = p;
    }
    getParent(){
        return this.parent;
    }
    getCanReach() {
        return this.canReach;
    }
    getWidgetType(){
        return this.widgetType;
    }
    getZ(){
        return this.z;
    }
}

export default Widget;