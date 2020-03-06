import React, { ReactEventHandler } from "react";
import { WINDOW_MENU_HEIGHT,WINDOW_DASHBORD_WIDTH } from '../../constant/window';
import store from "../../../../redux";
import { MapFile } from "../../../Project/file";
import { engine } from "../engine";
import { NODE_HEIGHT, NODE_WIDTH, NODE_ACTIVE_STATUS } from "../../constant/node";
import { throttle } from 'lodash';
import { addHoverNodeAction,addActiveNodeAction } from "../../../../redux/actions/nodes";
import { GLOBAL_MODE_CLICK_ACTION } from "../data/mode/define";
export default class EventManager {
    OnClick = (e:any) => {
        const [x , y] = this.getXY(e);
        const nodes = this.getTargetNode(x,y);
        const mode = engine.mode;
        if(nodes) {
            mode.triggerModeAction(mode.getGlobalMode(),GLOBAL_MODE_CLICK_ACTION,nodes);
        }
    }

    OnHover = (e:any) => {
        const [x, y] = this.getXY(e);
        const nodes = this.getTargetNode(x,y);
        const mode = engine.mode;
        if(nodes) {
            //@ts-ignore
            store.dispatch(addHoverNodeAction(nodes))
        }
    }
    // OnHover = throttle(this.onHover,16.6);

    getXY(e:any) {
        // @ts-ignore
        return [e.clientX - WINDOW_DASHBORD_WIDTH,e.clientY - WINDOW_MENU_HEIGHT]
    }

    getTargetNode(x:number,y:number,boxWidth = 1,boxHeight = 1):Array<Array<Node>> {
        const mf : MapFile = store.getState().openedMapFile as MapFile;
        const width = engine.canvas?.width || 0;
        const height = engine.canvas?.height || 0;
        const startX = ( width- mf.column * NODE_WIDTH) / 2;
        const startY = ( height - mf.row * NODE_HEIGHT) / 2;
        if(x < startX || y < startY ){
            return [[]];
        }
        const index = Math.floor(( x - startX ) / NODE_WIDTH) + Math.floor((y - startY) / NODE_HEIGHT) * mf.column;
        const nodes : Array<Array<Node>> = [];
        const nodesPos = engine.map.nodesPos;
        const nodesMap = engine.map.nodes;
        boxWidth = Math.min(boxWidth,mf.column - (index % mf.column));
        boxHeight = Math.min(boxHeight,mf.row - (index % mf.row));
        for (let i = 0; i < boxHeight; i++) {
            const list : Array<Node> = [];
            for (let j = 0; j < boxWidth; j++) {
                const id = nodesPos[index+j+i*mf.column];
                if(id && nodesMap.get(id)){
                    // @ts-ignore
                    list.push(nodesMap.get(id));
                }
            }
            nodes.push(list);
        }
        return nodes;
        
    }
}