import { getNewID } from '../../id';
class Node {
    private id : number;
    private x : number;
    private y : number;
    private nodeType : number;        // 节点类型
    private renderType : number;  // 渲染类型
    constructor(x: number,y : number,nodeType : number,renderType : number) {
        this.id = getNewID(); 
        this.x = x;
        this.y = y;
        this.nodeType = nodeType;
        this.renderType = renderType;
    }
    render() {

    }
}

export default Node;