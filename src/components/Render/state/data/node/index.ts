import { getNewID } from '../../../../Generator/id';
import Widegt from '../widget';
import { NODE_WIDTH,NODE_HEIGHT } from '../../../constant/node';

class Node {
    private id : number;
    private x : number;
    private y : number;
    private nodeType : number;        // 节点类型
    private widgets : Array<Widegt>;  // 渲染类型
    private canReach : boolean = true;
    constructor(x: number,y : number,nodeType : number) {
        this.id = getNewID(); 
        this.x = x;
        this.y = y;
        this.nodeType = nodeType;
        this.widgets = [];
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
            type : "normal",
            config : {
                x : this.x,
                y : this.y,
                w : NODE_WIDTH,
                h : NODE_HEIGHT
            }
        }
    }
}

export default Node;