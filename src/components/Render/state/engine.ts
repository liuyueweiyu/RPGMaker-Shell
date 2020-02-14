// import { getWebGLContext } from '../webgi-utils/base';
import APIManager from './api/index';
import { drawRectangle } from '../webgl';

interface Engine {
    canvas : HTMLCanvasElement | null;
    api : APIManager ;
}

export const engine : Engine = {
    canvas : null,
    api : new APIManager()
}

export function initEngine(canvas:HTMLCanvasElement) {
    engine.canvas = canvas;
    drawRectangle(canvas,0,0,canvas.width,canvas.height,[0,0,0,0]);
}