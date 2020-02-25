import { ViewData, WebGLData, FrameData,NewWebGLData } from "../../../webgl/drawData";
import { setRectangle, ColorToWebglColor, getBorderPoint } from "../../../webgl/utils";
import { NODE_WIDTH, NODE_HEIGHT } from "../../../constant/node";

export function getFrameDataWithViewData(list:Array<ViewData>) {
    const frameData : Array<FrameData> = [];
    list.forEach(v=>{
        let border = v.style.borderSize;
        const flag = !!border;
        if(!border) {
            border = {
                top : 0,
                bottom : 0,
                left : 0,
                right : 0
            }
        }
        const a_Position = NewWebGLData('a_Position',setRectangle(v.x + border.left,v.y + border.top,v.w,v.h))
        const u_Color = NewWebGLData('u_color',ColorToWebglColor(v.style.backgound))
        frameData.push({
            uniforms : [u_Color],
            attributes : [a_Position]
        })
        if(flag) {
            const a_Position = NewWebGLData('a_Position',getBorderPoint(v,NODE_WIDTH,NODE_HEIGHT))
            const u_Color = NewWebGLData('u_color',ColorToWebglColor(v.style.borderColor))
            frameData.push({
                uniforms : [u_Color],
                attributes : [a_Position]
            })  
        }
    })
    return frameData;
}
