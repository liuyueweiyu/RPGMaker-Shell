export interface DrawData {
    attributes : Array<AttributeData>|null;
    uniforms : Array<UniformData>|null;
    drawdata : DrawArrayData;
}


export interface AttributeData {
    name : string;
    data : any;
    dataType : string;
    size : number;
    type : number;
    normalize : boolean;
    stride : number;
    offset : number;
}

export interface UniformData {
    name : string;
    type : string;
    data : any;
}

export interface DrawArrayData {
    primitiveType : number;
    offset : number;
    count : number;
}
