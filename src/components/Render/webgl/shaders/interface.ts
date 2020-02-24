export interface Shader {
    vertexShader: string;
    fragmentShader : string;
}

export interface AttributeConfig {
    name : string;
    type : string;
    size : number;
    renderType : number;
    normalize : boolean;
    stride : number;
    offset : number;    
}

export interface UniformConfig {
    name : string;
    type : string;
}