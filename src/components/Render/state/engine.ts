import { getWebGLContext } from '../webgi-utils/base';


interface Engine {
    canvas : HTMLCanvasElement | null;
}

export const engine : Engine = {
    canvas : null
}

export function initEngine(canvas:HTMLCanvasElement) {
    engine.canvas = canvas;
    const gl = getWebGLContext(canvas);
}