import {
    RENDER_TICK_TYPE_ADD_SHAPE,
    RENDER_TICK_TYPE_DELETE_SHAPE,
    RENDER_TICK_TYPE_UPDATE_SHAPE 
} from '../../../constant/bridge';
import { drawRectangles } from '../../../webgl/index';
import { engine } from '../../engine';
export interface RenderConfig {
    x : number;
    y : number;
    w : number;
    h : number;
}

export interface RenderTick {
    type : string;
    config : RenderConfig;
}

class RenderBridge {
    private shadelist : Array<RenderConfig> = [];
    private texturelist : Array<RenderConfig> = [];
    start() {
        this.shadelist = [];
        this.texturelist = [];
    }
    addTick(tick : RenderTick) {
        if(tick.type === RENDER_TICK_TYPE_ADD_SHAPE || tick.type === RENDER_TICK_TYPE_DELETE_SHAPE || tick.type === RENDER_TICK_TYPE_UPDATE_SHAPE) {
            this.shadelist.push(tick.config)
        } 
    }
    end() {
        console.log("bridget endddddddddddddddd")
        drawRectangles(engine.canvas as HTMLCanvasElement,this.shadelist,[255,0,0,1]);
    }
}

export default RenderBridge;