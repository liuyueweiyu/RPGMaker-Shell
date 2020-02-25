import { Style } from "../state/data/style";


export interface WebGLData {
    name : string,
    data : any
}

export interface FrameData {
    attributes : Array<WebGLData>,
    uniforms : Array<WebGLData>
}



export interface ViewData {
    x: number,
    y: number,
    w: number,
    h: number,
    style : Style
}

export function NewWebGLData(name:string,data:any):WebGLData {
    return {
        name,
        data
    }
}