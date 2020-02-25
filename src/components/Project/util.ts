import store from "../../redux";
import { engine } from "../Render/state/engine";
import { NODE_WIDTH, NODE_HEIGHT } from "../Render/constant/node";
import { MapFile } from "./file";

export function getStartXY() {
    const mf = store.getState().openedMapFile as MapFile;
    if(engine.canvas) {
        const startY = (engine.canvas.height - mf.row * NODE_HEIGHT) / 2;
        const startX = (engine.canvas.width - mf.column * NODE_WIDTH) / 2;
        return [startX,startY];
    }
    return [-1,-1]
}

export function getRowColumn() {
    const mf = store.getState().openedMapFile as MapFile;
    return [mf.row,mf.column]
}