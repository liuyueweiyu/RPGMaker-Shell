import {
    RENDER_TICK_TYPE_ADD_SHAPE,
    RENDER_TICK_TYPE_DELETE_SHAPE,
    RENDER_TICK_TYPE_UPDATE_SHAPE 
} from '../../../constant/bridge';
import { ViewData } from '../../../webgl/drawData';
import { engine } from '../../engine';
import { getFrameDataWithViewData, getGrid, getHoverOrActiveNodeFrameData } from './util';
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
        // 基础node
        const frameData = getFrameDataWithViewData(this.shadelist);
        // 渲染网格
        // const grid = getGrid();
        // if(grid){
        //     frameData.push(grid);
        // }
        // 获取hover/active态的边框
        const border = getHoverOrActiveNodeFrameData();
        if(border) {
            frameData.push(border);
        }
        engine.webgl.runProgram("initBatchOfShape",frameData);
    }
}

export default RenderBridge;