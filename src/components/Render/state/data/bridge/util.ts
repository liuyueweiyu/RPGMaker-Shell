import { ViewData, FrameData,NewWebGLData } from "../../../webgl/drawData";
import { getRectangle, ColorToWebglColor } from "../../../webgl/utils";
import { NODE_WIDTH, NODE_HEIGHT, NODE_HOVER_STATUS, NODE_ACTIVE_STATUS } from "../../../constant/node";
import { getStartXY, getRowColumn } from "../../../../Project/util";
import { engine } from "../../engine";
import store from "../../../../../redux";
import Node from '../node';
import { STYLE_NODE_HOVER_BORDER_COLOR, STYLE_HOVER_WIDTH, STYLE_NODE_ACTIVE_BORDER_COLOR, STYLE_ACTIVE_WIDTH, STYLE_GRID_COLOR } from "../style/define";
import { strToColor } from "../style/util";
import { createTexture } from "../../../webgl/base";

export function getFrameDataWithViewData(list:Array<ViewData>) {
    const frameData : Array<FrameData> = [];
    list.forEach(v=>{
        const a_Position = NewWebGLData('a_Position',getRectangle(v.x ,v.y,v.w,v.h))
        const u_Color = NewWebGLData('u_color',ColorToWebglColor(v.style.backgound))
        frameData.push({
            uniforms : [u_Color],
            attributes : [a_Position],
            count: 6
        })
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
        const u_Color = NewWebGLData('u_color',ColorToWebglColor(strToColor(STYLE_GRID_COLOR)));
        return {
            uniforms : [u_Color],
            attributes : [a_Position]
        }
    }   
    return null;
}

function getFrameData(status:string,nodes : Array<Array<Node>>) {
    if(!nodes || !nodes[0] || nodes[0].length === 0) {
        return null;
    }
    let border = "",borderWidth = 0;
    switch (status) {   
        case NODE_HOVER_STATUS:
            border = STYLE_NODE_HOVER_BORDER_COLOR;
            borderWidth = STYLE_HOVER_WIDTH;
            break;
        case NODE_ACTIVE_STATUS:
            border = STYLE_NODE_ACTIVE_BORDER_COLOR;
            borderWidth = STYLE_ACTIVE_WIDTH;
            break;
        default:
            break;
    }
    const startX = nodes[0][0].getX(),startY = nodes[0][0].getY();
    const w = nodes[0].length * NODE_WIDTH,h = nodes.length * NODE_HEIGHT;
    const datalist : Array<number> = [];
    datalist.push(...getRectangle(startX,startY,w,borderWidth));
    datalist.push(...getRectangle(startX,startY,borderWidth,h));
    datalist.push(...getRectangle(startX+w-borderWidth,startY,borderWidth,h));
    datalist.push(...getRectangle(startX,startY+h-borderWidth,w,borderWidth));
    const a_Position = NewWebGLData('a_Position',datalist);
    const u_Color = NewWebGLData('u_color',ColorToWebglColor(strToColor(border)));
    return {
        uniforms : [u_Color],
        attributes : [a_Position],
        count: datalist.length / 2
    }
}

export function getHoverFrameData(nodes : Array<Array<Node>>) {
    return getFrameData(NODE_HOVER_STATUS,nodes);
}

export function getActiveFrameData(nodes : Array<Array<Node>>) {
    return getFrameData(NODE_ACTIVE_STATUS,nodes);
}

export function getTestFrameData(list:Array<ViewData>) {
    const frameData : Array<FrameData> = [];
    const list_pos : Array<number> = []
    const list_tex : Array<number> = [];
    list.forEach(v=>{
        list_pos.push(...getRectangle(v.x ,v.y,v.w,v.h));
        list_tex.push(...getRectangle(0.0,0.0,0.5,0.5));
    })
    const a_Position = NewWebGLData('a_Position',list_pos);
    const a_texCoord = NewWebGLData('a_texCoord',list_tex);
    frameData.push({
        uniforms : [],
        attributes: [a_Position,a_texCoord],
        count : list_pos.length / 2,
        texSrc : 'textImg1'
    })
    return frameData;
}

export function getWidgetFrameData() {
    const frameData : Array<FrameData> = [];
    const widgets = engine.widgets.getWidgetMapSortByImage();
    widgets.forEach((value,key)=>{
        const list_tex : Array<number> = [];
        const list_pos : Array<number> = [];
        value.forEach((w)=>{
            const widgetInfor = engine.widgets.getWidgetInfor(w.getWidgetType());
            if(widgetInfor) {
                list_tex.push(...getRectangle(widgetInfor?.x,widgetInfor?.y,widgetInfor?.w,widgetInfor?.h));            
                list_pos.push(...getRectangle(w.getX(),w.getY(),NODE_WIDTH,NODE_HEIGHT));
            } else {
                throw new Error( w.getWidgetType() + "&widgetInfor not exit")
            }
        })
        const a_Position = NewWebGLData('a_Position',list_pos);
        const a_texCoord = NewWebGLData('a_texCoord',list_tex);
        frameData.push({
            uniforms : [],
            attributes: [a_Position,a_texCoord],
            count : list_pos.length / 2,
            texSrc : key
        })
    })
    return frameData;
}

export function getTextureFrameData(image:HTMLImageElement) {
    return createTexture(engine.webgl.getGL(),image);
}