// import { getWebGLContext } from '../webgi-utils/base';
import APIManager from './api/index';
import WidegtManager from './data/widget/manager';
import { drawRectangle } from '../webgl';
import StyleManager from './data/style/manager';
import MapFile from '../state/data/map/manager';
import { WINDOW_CANVAS_BACKGROUND_COLOR } from '../constant/window';
import EventManager from './event/manager';
import NodeManager from './data/node/manager';
import WebglManager from '../webgl/manager';
import { commonShape } from '../webgl/shaders/shape';
export interface Engine {
    canvas : HTMLCanvasElement | null;
    api : APIManager ;
    widgets : WidegtManager;
    map : MapFile;
    style : StyleManager;
    event : EventManager;
    node : NodeManager;
    webgl : WebglManager;
}

export const engine : Engine = {
    canvas : null,
    api : new APIManager(),
    widgets : new WidegtManager(),
    map: new MapFile(),
    style : new StyleManager(),
    event : new EventManager(),
    node : new NodeManager(),
    webgl : new WebglManager()
}

export function initEngine(canvas:HTMLCanvasElement) {
    engine.canvas = canvas;
    drawRectangle(canvas,0,0,canvas.width,canvas.height,WINDOW_CANVAS_BACKGROUND_COLOR);
    engine.webgl.setCanvas(canvas);
    engine.webgl.test_creatProgram("",commonShape,[],[],[]);
    // engine.webgl.creatProgram("initBatchOfShape",commonShape,[{
    //     name : 'u_resolution',
    //     type : 'uniform2f'
    // },{
    //     name : 'u_color',
    //     type : 'uniform4f'     
    // }],[{
    //     name : 'u_resolution',
    //     data : {
    //         x : engine.webgl.getGL().canvas.width,
    //         y : engine.webgl.getGL().canvas.height
    //     }
    // }],[{
    //     name : 'a_Position',
    //     type : 'Float32Array',
    //     normalize : false,
    //     size : 2,
    //     renderType : engine.webgl.getGL().FLOAT,
    //     stride : 0,
    //     offset : 0
    // }])
}