import {
    RENDER_TICK_TYPE_ADD_SHAPE,
    RENDER_TICK_TYPE_DELETE_SHAPE,
    RENDER_TICK_TYPE_UPDATE_SHAPE 
} from '../../../constant/bridge';
import { drawRectangles } from '../../../webgl/index';
import { ViewData, UniformData } from '../../../webgl/drawData';
import { engine } from '../../engine';
import { getAttributeAndUniformWithViewData } from './util';
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
        const [a,u] = getAttributeAndUniformWithViewData(this.shadelist);
        engine.webgl.runProgram("initBatchOfShape",a,u,{
            primitiveType:engine.webgl.getGL().TRIANGLES,
            offset:0,
            count:a.length / 2
        });
        // engine.webgl.test_runProgram(this.shadelist);
        // drawRectangles(engine.canvas as HTMLCanvasElement,this.shadelist);
    }
}

export default RenderBridge;