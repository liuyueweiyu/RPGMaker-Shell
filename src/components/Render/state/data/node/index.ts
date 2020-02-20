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
    private widgets : Array<Widegt>;  // 渲染类型
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
    
    addWidget(w:Widegt) {
        this.canReach = this.canReach || w.getCanReach();
        let pos = -1;
        this.widgets.some((v,i)=>{
            const flag = v.getWidgetType() === w.getWidgetType();
            if(flag) {
                pos = i;
            }
            return flag;
        })
        if(pos < 0){
            this.widgets.push(w);
            this.widgets.sort((a,b)=>a.getZ()- b.getZ());
        } else {
            this.widgets[pos] = w;
        }
    }
    getId() {
        return this.id;
    }

    getRenderTick() {
        return {
            x : this.x,
            y : this.y,
            w : NODE_WIDTH,
            h : NODE_HEIGHT,
            style : engine.style.getStyle(this.styleType) as Style,
        }
    }
}

export default Node;