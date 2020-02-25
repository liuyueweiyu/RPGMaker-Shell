import {
    RENDER_TICK_TYPE_ADD_SHAPE,
    RENDER_TICK_TYPE_DELETE_SHAPE,
    RENDER_TICK_TYPE_UPDATE_SHAPE 
} from '../../../constant/bridge';
import { ViewData } from '../../../webgl/drawData';
import { engine } from '../../engine';
import { getFrameDataWithViewData, getGrid } from './util';
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
        const frameData = getFrameDataWithViewData(this.shadelist);
        const grid = getGrid();
        if(grid){
            frameData.push(grid);
        }
        engine.webgl.runProgram("initBatchOfShape",frameData);
    }
}

export default RenderBridge;