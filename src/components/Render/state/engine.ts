import APIManager from './api/index';
import WidegtManager from './data/widget/manager';
import StyleManager from './data/style/manager';
import MapFile from '../state/data/map/manager';
import EventManager from './event/manager';
import NodeManager from './data/node/manager';
import ModeManager from './data/mode/manager';
import WebglManager from '../webgl/manager';
import HistoryManager from './data/history/manager';
import { commonShape } from '../webgl/shaders/shape';
import { commonTexture } from '../webgl/shaders/texture';
import imageSrc from '../state/data/image/tilesets/Dungeon_A1.png';
export interface Engine {
    canvas : HTMLCanvasElement | null;
    api : APIManager ;
    widgets : WidegtManager;
    map : MapFile;
    style : StyleManager;
    event : EventManager;
    node : NodeManager;
    mode : ModeManager;
    webgl : WebglManager;
    history : HistoryManager;
}

export const engine : Engine = {
    canvas : null,
    api : new APIManager(),
    widgets : new WidegtManager(),
    map: new MapFile(),
    style : new StyleManager(),
    event : new EventManager(),
    node : new NodeManager(),
    mode : new ModeManager(),
    history : new HistoryManager(),
    webgl : new WebglManager()
}

// @ts-ignore
window.engine = engine;

export function initEngine(canvas:HTMLCanvasElement) {
    engine.canvas = canvas;
    engine.webgl.setCanvas(canvas);

    const image = new Image();
    image.src = imageSrc;
    image.onload = function () {

    engine.webgl.creatProgram("initBatchOfShape",commonShape,[{
        name : 'u_resolution',
        type : 'uniform2f'
    },{
        name : 'u_color',
        type : 'uniform4f'     
    }],[{
        name : 'u_resolution',
        data : {
            x : engine.webgl.getGL().canvas.width,
            y : engine.webgl.getGL().canvas.height
        }
    }],[{
        name : 'a_Position',
        type : 'Float32Array',
        normalize : false,
        size : 2,
        renderType : engine.webgl.getGL().FLOAT,
        stride : 0,
        offset : 0
    }],[])

    
        engine.webgl.creatProgram("initTexture",commonTexture,[{
            name : 'u_resolution',
            type : 'uniform2f'
        }],[{
            name : 'u_resolution',
            data : {
                x : engine.webgl.getGL().canvas.width,
                y : engine.webgl.getGL().canvas.height
            }
        }],[{
            name : 'a_Position',
            type : 'Float32Array',
            normalize : false,
            size : 2,
            renderType : engine.webgl.getGL().FLOAT,
            stride : 0,
            offset : 0
        },{
            name : 'a_texCoord',
            type : 'Float32Array',
            normalize : false,
            size : 2,
            renderType : engine.webgl.getGL().FLOAT,
            stride : 0,
            offset : 0
        }],[{
            name : 'textImg1',
            image
        },{
            name : 'textImg2',
            image
        },{
            name : 'textImg3',
            image
        }])
    }

}