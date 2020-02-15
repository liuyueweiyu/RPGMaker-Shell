// import { getWebGLContext } from '../webgi-utils/base';
import APIManager from './api/index';
import { drawRectangle,drawImage } from '../webgl';
import { WINDOW_CANVAS_BACKGROUND_COLOR } from '../../../constant/window';

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
    drawRectangle(canvas,0,0,canvas.width,canvas.height,WINDOW_CANVAS_BACKGROUND_COLOR);
    
    // var image = new Image();
    // image.src = "/logo192.png";
    // image.onload = function() {
    //     console.log("image load")
    //     drawImage(canvas,0,0,image.width,image.height,image);
    // }
    
}