import { Style } from "../state/data/style";


export interface ImageInfor {
    name : string,
    image : HTMLImageElement
}

export interface WebGLData {
    name : string,
    data : any
}

export interface FrameData {
    attributes : Array<WebGLData>,
    uniforms : Array<WebGLData>,
    count : number, //渲染次数
    texSrc ?: string 
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