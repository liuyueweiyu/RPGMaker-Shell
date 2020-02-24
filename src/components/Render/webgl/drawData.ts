import { Style } from "../state/data/style";

export interface DrawData {
    attributes : Array<AttributeData>|null;
    uniforms : Array<UniformData>|null;
    drawdata : DrawArrayData;
}

export interface WebGLData {
    name : string,
    data : any
}

export interface AttributeData {
    name : string;
    data : any;
    dataType : string;  //待废弃
    size : number;
    type : number;
    normalize : boolean;
    stride : number;
    offset : number;
}

export interface UniformData {
    name : string;
    type : string; // 待废弃
    data : any;
}

export interface DrawArrayData {
    primitiveType : number;
    offset : number;
    count : number;
}

export interface ViewData {
    x: number,
    y: number,
    w: number,
    h: number,
    style : Style
}