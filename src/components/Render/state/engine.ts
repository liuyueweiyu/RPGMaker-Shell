// import { getWebGLContext } from '../webgi-utils/base';
import APIManager from './api/index';

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
    // const gl = getWebGLContext(canvas);
    
}