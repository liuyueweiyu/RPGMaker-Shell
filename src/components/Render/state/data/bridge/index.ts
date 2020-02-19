import {
    RENDER_TICK_TYPE_ADD_SHAPE,
    RENDER_TICK_TYPE_DELETE_SHAPE,
    RENDER_TICK_TYPE_UPDATE_SHAPE 
} from '../../../constant/bridge';
import { drawRectangles } from '../../../webgl/index';
import { Style } from '../style';
import { ViewData } from '../../../webgl/drawData';
import { engine } from '../../engine';
export interface RenderTick {
    type : string;
    viewData : ViewData;
}

class RenderBridge {
    private shadelist : Array<ViewData> = [];
    private texturelist : Array<ViewData> = [];
    start() {
        this.shadelist = [];
        this.texturelist = [];
    }
    addTick(tick : RenderTick) {
        if(tick.type === RENDER_TICK_TYPE_ADD_SHAPE || tick.type === RENDER_TICK_TYPE_DELETE_SHAPE || tick.type === RENDER_TICK_TYPE_UPDATE_SHAPE) {
            this.shadelist.push(tick.viewData)
        } 
    }
    end() {
        console.log("bridget endddddddddddddddd")
        drawRectangles(engine.canvas as HTMLCanvasElement,this.shadelist);
        // test(engine.canvas as HTMLCanvasElement,this.shadelist,[255,0,0,1]);
    }
}

export default RenderBridge;