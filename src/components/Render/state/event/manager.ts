import React, { ReactEventHandler } from "react";
import { WINDOW_MENU_HEIGHT,WINDOW_DASHBORD_WIDTH } from '../../constant/window';
import store from "../../../../redux";
import { MapFile } from "../../../Project/file";
import { engine } from "../engine";
import { NODE_HEIGHT, NODE_WIDTH } from "../../constant/node";
import { addHoverNodeAction } from "../../../../redux/actions/nodes";
import { GLOBAL_MODE_CLICK_ACTION } from "../data/mode/define";
import { EventTarget } from './target';
export default class EventManager {
    OnClick = (e:any) => {
        const [x , y] = this.getXY(e);
        const eventTarget = this.getTarget(x,y);
        const mode = engine.mode;
        if(eventTarget.nodes.length !== 0) {
            mode.triggerModeAction(mode.getGlobalMode(),GLOBAL_MODE_CLICK_ACTION,eventTarget);
        }
    }

    OnHover = (e:any) => {
        const [x, y] = this.getXY(e);
        const eventTarget = this.getTarget(x,y);
        const mode = engine.mode;
        if(eventTarget.nodes.length !== 0) {
            //@ts-ignore
            store.dispatch(addHoverNodeAction(eventTarget))
        }
    }
    // OnHover = throttle(this.onHover,16.6);

    getXY(e:any) {
        // @ts-ignore
        return [e.clientX - WINDOW_DASHBORD_WIDTH,e.clientY - WINDOW_MENU_HEIGHT]
    }

    getTarget(x:number,y:number,boxWidth = 1,boxHeight = 1) {
        const mf : MapFile = store.getState().openedMapFile as MapFile;
        const width = engine.canvas?.width || 0;
        const height = engine.canvas?.height || 0;
        const startX = ( width- mf.column * NODE_WIDTH) / 2;
        const startY = ( height - mf.row * NODE_HEIGHT) / 2;
        if(x < startX || y < startY ){
            return {
                nodes : [],
                x,
                y,
                indexX : -1,
                indexY : -1
            };
        }
        const indexX = Math.floor(( x - startX ) / NODE_WIDTH),
              indexY = Math.floor((y - startY) / NODE_HEIGHT);
        const nodes : Array<Array<Node>> = [];
        const nodesPos = engine.map.nodesPos;
        const nodesMap = engine.map.nodes;
        boxWidth = Math.min(boxWidth,mf.column - indexX);
        boxHeight = Math.min(boxHeight,mf.row - indexY);
        for (let i = 0; i < boxHeight; i++) {
            const list : Array<Node> = [];
            for (let j = 0; j < boxWidth; j++) {
                const id = nodesPos[indexY+i][indexX+j];
                if(id && nodesMap.get(id)){
                    // @ts-ignore
                    list.push(nodesMap.get(id));
                }
            }
            nodes.push(list);
        }
        return {
            nodes,
            x,
            y,
            indexY,
            indexX
        };
        
    }
}