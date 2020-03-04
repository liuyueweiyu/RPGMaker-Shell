import { getNewID } from '../../../../Generator/id';
class Widget {
    private id : number;
    private parent : number = 0;    //父节点id
    private type : string;//在widget下继续的细分，比如grass有多种
    private status : string; 
    private x : number;
    private y : number;
    private z : number ;         //渲染纵轴
    private canReach : boolean = true;
    constructor(type:string,status : string,parent:number,x:number,y:number,z:number,canReach:boolean){
        this.id = getNewID()
        this.type = type;
        this.parent = parent;
        this.status = status;
        this.x = x;
        this.y = y;
        this.z = z;
        this.canReach = canReach;
    }

    setParent(p:number) {
        this.parent = p;
    }
    getID() {
        return this.id;
    }
    getParent(){
        return this.parent;
    }
    getCanReach() {
        return this.canReach;
    }
    getType() {
        return this.type;
    }
    getWidgetType(){
        return this.type+'#'+this.status;
    }
    getStatus(){
        return this.status;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getZ(){
        return this.z;
    }
}

export default Widget;