import { ViewData, FrameData,NewWebGLData } from "../../../webgl/drawData";
import { getRectangle, ColorToWebglColor, getBorderPoint } from "../../../webgl/utils";
import { NODE_WIDTH, NODE_HEIGHT } from "../../../constant/node";
import store from "../../../../../redux";
import { MapFile } from "../../../../Project/file";
import { getStartXY, getRowColumn } from "../../../../Project/util";
import { engine } from "../../engine";

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
        const a_Position = NewWebGLData('a_Position',getRectangle(v.x + border.left,v.y + border.top,v.w,v.h))
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

export function getGrid() {
    const [startX,startY] = getStartXY();
    const gridWidth = 1;
    if(engine.canvas) {
        const width = engine.canvas.width,height = engine.canvas.height;
        const [row,column] = getRowColumn();
        const gridlist : Array<number>= []
        for (let i = 1; i < column; i++) {
            gridlist.push(...getRectangle(startX+NODE_WIDTH*i- gridWidth/ 2,0,gridWidth,height));
        }
        for (let i = 0; i < row; i++) {
            gridlist.push(...getRectangle(0,startY+NODE_HEIGHT*i-gridWidth/2,width,gridWidth));           
        }
        const a_Position = NewWebGLData('a_Position',gridlist);
        const u_Color = NewWebGLData('u_color',[1,1,1,1]);
        return {
            uniforms : [u_Color],
            attributes : [a_Position]
        }
    }   
    return null;
}