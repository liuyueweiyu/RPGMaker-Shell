export interface Program {
    program : WebGLProgram;
    uniforms : Map<string,Uniform>;
    attributes : Map<string,Attribute>;
}

export interface Uniform {
    name : string;
    type : string;
    entity : WebGLUniformLocation;
}

export interface Attribute {
    name : string;
    type : string;
    entity : number;
}