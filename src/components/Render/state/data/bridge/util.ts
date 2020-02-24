import { ViewData, WebGLData } from "../../../webgl/drawData";
import { setRectangle, RGBA256toWebglColor, ColorToArray,getBorderPoint } from "../../../webgl/utils";
import { NODE_WIDTH, NODE_HEIGHT } from "../../../constant/node";

export function getAttributeAndUniformWithViewData(list:Array<ViewData>) {
    const attributes:Array<WebGLData> = [];
    const unifroms: Array<WebGLData> = [];
    const a_Position : WebGLData = {
        name : 'a_Position',
        data : []
    }
    const u_Color : WebGLData = {
        name : 'u_color',
        data : []
    }
    
    list.forEach(v=>{
        let border = v.style.borderSize;
        if(!border) {
            border = {
                right : 0, left : 0, top : 0,bottom : 0
            }
        }
        a_Position.data.push(...setRectangle(v.x + border.left,v.y + border.top,v.w - border.left-border.right,v.h- border.top - border.bottom))
        u_Color.data.push(RGBA256toWebglColor(ColorToArray(v.style.backgound)));
        const borderData = getBorderPoint(v,NODE_WIDTH,NODE_HEIGHT);
        if(borderData.length) {
            a_Position.data.push(...borderData);
            u_Color.data.push(RGBA256toWebglColor(ColorToArray(v.style.borderColor)));
        }
    })
    unifroms.push(u_Color)
    attributes.push(a_Position);
    return [unifroms,attributes];
}