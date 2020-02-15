import { getNewID } from '../../id';
class Node {
    private id : number;
    private x : number;
    private y : number;
    private nodeType : number;        // 节点类型
    private renderList : Array<number>;  // 渲染类型
    constructor(x: number,y : number,nodeType : number,renderList : Array<number>) {
        this.id = getNewID(); 
        this.x = x;
        this.y = y;
        this.nodeType = nodeType;
        this.renderList = renderList;
    }
    render() {

    }
}

export default Node;