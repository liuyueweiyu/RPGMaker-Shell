import { ViewData, WebGLData, FrameData } from "../../../webgl/drawData";
import { setRectangle, ColorToWebglColor } from "../../../webgl/utils";

export function getFrameDataWithViewData(list:Array<ViewData>) {
    const frameData : Array<FrameData> = [];
    list.forEach(v=>{
        const a_Position : WebGLData = {
            name : 'a_Position',
            data : setRectangle(v.x,v.y,v.w,v.h)
        }
        const u_Color : WebGLData = {
            name : 'u_color',
            data : ColorToWebglColor(v.style.borderColor)
        }
        frameData.push({
            uniforms : [u_Color],
            attributes : [a_Position]
        })
    })
    return frameData;
}