import {
    RENDER_TICK_TYPE_ADD_SHAPE,
    RENDER_TICK_TYPE_DELETE_SHAPE,
    RENDER_TICK_TYPE_UPDATE_SHAPE 
} from '../../../constant/bridge';
import { ViewData } from '../../../webgl/drawData';
import { engine } from '../../engine';
import { getFrameDataWithViewData, getGrid, getActiveFrameData,getHoverFrameData, getTextureFrameData, getTestFrameData, getWidgetFrameData } from './util';
import store from '../../../../../redux';
import imageSrc from '../../data/image/tilesets/Dungeon_A1.png';


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
            this.texturelist.push(tick.viewData); // 这个看来得当作widget一层渲染
        } 
    }
    end() {
        const image = new Image();
        image.src = imageSrc;
        image.onload =  ()=> {
        // 基础node
        const frameData = getFrameDataWithViewData(this.shadelist);
        // const frameData = getTestFrameData(this.shadelist);
        // 渲染网格
        // const grid = getGrid();
        // if(grid){
        //     frameData.push(grid);
        // }
        // 获取hover/active态的边框
        const hoverBorder = getHoverFrameData(store.getState().hoverNodes);
        if(hoverBorder) {
            frameData.push(hoverBorder);
        }
        const activeBorder = getActiveFrameData(store.getState().activeNodes);
        if(activeBorder) {
            frameData.push(activeBorder);
        }

        // const texture = getTextureFrameData(image);
        // engine.webgl.runProgram("initTexture",frameData)
        // const frameData = getTestFrameData(this.shadelist)
        // engine.webgl.testTextureProgram(image);
        engine.webgl.runProgram("initBatchOfShape",frameData);
        const textureFrame = getWidgetFrameData();
        console.log("textureFrame",textureFrame)
        engine.webgl.runProgram("initTexture",textureFrame)

        }

    }
}

export default RenderBridge;