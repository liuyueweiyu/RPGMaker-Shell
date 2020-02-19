// import { getWebGLContext } from '../webgi-utils/base';
import APIManager from './api/index';
import WidegtManager from './data/widget/manager';
import { drawRectangle } from '../webgl';
import StyleManager from './data/style/manager';
import Widget from './data/widget';
import MapFile from '../state/data/map/manager';
import { WINDOW_CANVAS_BACKGROUND_COLOR } from '../constant/window';
export interface Engine {
    canvas : HTMLCanvasElement | null;
    api : APIManager ;
    widgets : WidegtManager;
    map : MapFile;
    style : StyleManager;
}

export const engine : Engine = {
    canvas : null,
    api : new APIManager(),
    widgets : new WidegtManager(),
    map: new MapFile(),
    style : new StyleManager()
}

export function initEngine(canvas:HTMLCanvasElement) {
    engine.canvas = canvas;
    drawRectangle(canvas,0,0,canvas.width,canvas.height,WINDOW_CANVAS_BACKGROUND_COLOR);
    engine.map.createMap(35,25);
    engine.map.renderMap();
}