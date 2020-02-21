import React, { ReactEventHandler } from "react";
import { WINDOW_MENU_HEIGHT,WINDOW_DASHBORD_WIDTH } from '../../constant/window';
import store from "../../../../redux";
import { MapFile } from "../../../Project/file";
import { engine } from "../engine";
import { NODE_HEIGHT, NODE_WIDTH } from "../../constant/node";
import { throttle } from 'lodash';
import { addHoverNodeAction } from "../../../../redux/actions/nodes";
export default class EventManager {
    OnClick : ReactEventHandler = (e) => {
        const [x , y] = this.getXY(e);
        this.getTargetNode(x,y);
    }

    onHover : ReactEventHandler = (e) => {
        const [x, y] = this.getXY(e);
        const node = this.getTargetNode(x,y);
        if(node) {
            store.dispatch(addHoverNodeAction(node))
        }
    }
    OnHover = throttle(this.onHover,100);

    getXY(e:React.SyntheticEvent<Element, Event>) {
        // @ts-ignore
        return [e.clientX - WINDOW_DASHBORD_WIDTH,e.clientY - WINDOW_MENU_HEIGHT]
    }

    getTargetNode(x:number,y:number) {
        const mf : MapFile = store.getState().openedMapFile as MapFile;
        const width = engine.canvas?.width || 0;
        const height = engine.canvas?.height || 0;
        const startX = ( width- mf.column * NODE_WIDTH) / 2;
        const startY = ( height - mf.row * NODE_HEIGHT) / 2;
        const index = Math.floor(( x - startX ) / NODE_WIDTH) + Math.floor((y - startY) / NODE_HEIGHT) * mf.column;
        return engine.map.nodes.get(engine.map.nodesPos[index])
        
    }
}