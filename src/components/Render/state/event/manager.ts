import React, { ReactEventHandler } from "react";
import { WINDOW_MENU_HEIGHT,WINDOW_DASHBORD_WIDTH } from '../../constant/window';
import store from "../../../../redux";
import { MapFile } from "../../../Project/file";
import { engine } from "../engine";
import { NODE_HEIGHT, NODE_WIDTH } from "../../constant/node";
import { throttle } from 'lodash';
import { addHoverNodeAction, addActiveNodeAction } from "../../../../redux/actions/nodes";
export default class EventManager {
    OnClick : ReactEventHandler = (e) => {
        const [x , y] = this.getXY(e);
        const nodes = this.getTargetNode(x,y,3,2);
        if(nodes) {
            //@ts-ignore
            store.dispatch(addActiveNodeAction(nodes,false));
        }
    }

    onHover : ReactEventHandler = (e) => {
        // const [x, y] = this.getXY(e);
        // const node = this.getTargetNode(x,y);
        // if(node) {
        //     store.dispatch(addHoverNodeAction(node))
        // }
    }
    OnHover = throttle(this.onHover,100);

    getXY(e:React.SyntheticEvent<Element, Event>) {
        e.persist();
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