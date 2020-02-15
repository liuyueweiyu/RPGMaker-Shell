// import { getWebGLContext } from '../webgi-utils/base';
import APIManager from './api/index';
import WidegtManager from './data/widget/manager';
import { drawRectangle,drawImage } from '../webgl';
import Widget from './data/widget';
import { WINDOW_CANVAS_BACKGROUND_COLOR } from '../../../constant/window';
interface Engine {
    canvas : HTMLCanvasElement | null;
    api : APIManager ;
    widgets : WidegtManager;
}

export const engine : Engine = {
    canvas : null,
    api : new APIManager(),
    widgets : new WidegtManager(),
}

export function initEngine(canvas:HTMLCanvasElement) {
    engine.canvas = canvas;
    drawRectangle(canvas,0,0,canvas.width,canvas.height,WINDOW_CANVAS_BACKGROUND_COLOR);
}