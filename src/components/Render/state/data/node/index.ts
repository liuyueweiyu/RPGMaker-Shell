import { getNewID } from '../../../../Generator/id';
import Widegt from '../widget';
import { NODE_WIDTH,NODE_HEIGHT } from '../../../constant/node';
import { engine } from '../../engine';
import { Style } from '../style';

class Node {
    private id : number;
    private x : number;
    private y : number;
    private nodeType : number;        // 节点类型
    private widgets : Array<number>;  // 吸附的组件
    private canReach : boolean = true;
    private styleType : string = "";

    constructor(x: number,y : number,nodeType : number,styleType:string) {
        this.id = getNewID(); 
        this.x = x;
        this.y = y;
        this.nodeType = nodeType;
        this.widgets = [];
        this.styleType = styleType;
    }
    
    addWidget(wId:number,widgetType:number,canReach:boolean) {
        this.canReach = this.canReach || canReach;

        let pos = -1;
        this.widgets.some((v,i)=>{
            const w = engine.widgets.getWidgetByID(v);
            if(w) {
                const flag = w.getWidgetType() === widgetType;
                if(flag) {
                    pos = i;
                }
                return flag;
            }
            return false;
        })
        if(pos < 0){
            this.widgets.push(wId);     //追加系
        } else {
            this.widgets[pos] = wId;    //替代系
        }
    }
    
    setId(id:number) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    setX(x:number) {
        this.x = x;
    }
    getX(){
        return this.x;
    }
    setY(y:number) {
        this.y = y;
    }
    getY(){
        return this.y;
    }
    setNodeType(nodeType:number) {
        this.nodeType = nodeType;
    }
    setWidgets(widgets:Array<number>) {
        this.widgets = widgets;
    }
    setCanReach(canReach:boolean) {
        this.canReach = canReach;
    }
    setStyleType(styleType:string) {
        this.styleType = styleType;
    }

    setBorderWidth(pos:string,size:number){
        // @ts-ignore
        this.borderWith[pos] = size;
    }

    getRenderTick() {
        return {
            x : this.x,
            y : this.y,
            w : NODE_WIDTH,
            h : NODE_HEIGHT,
            style: engine.style.getStyle(this.styleType) as Style
        }
    }
}

export default Node;