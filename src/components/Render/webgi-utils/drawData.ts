export interface DrawData {
    attributes : Array<AttributeData>|null;
    uniforms : Array<UniformData>|null;
    drawdata : DrawArrayData;
}


export interface AttributeData {
    name : string;
    data : Array<any>;
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


// export function NewDrawData(attributes:Array<AttributeData>,uniforms:Array<UniformData>,drawdata:DrawArrayData) {
//     const data : DrawData = {
//         attributes,
//         uniforms,
//         drawdata
//     }
//     return data;
// }


// export function NewAttributeDatas(data:any) {
//     cons
// }

// export function NewUniformDatas() {
    
// }

// export function NewDrawArrayDatas() {
    
// }