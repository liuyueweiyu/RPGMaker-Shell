import Node from "../data/node";

export interface EventTarget {
    nodes : Array<Array<Node>>
    x:number,
    y:number,
    indexX:number,
    indexY:number
}