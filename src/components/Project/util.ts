import store from "../../redux";
import { engine } from "../Render/state/engine";
import { NODE_WIDTH, NODE_HEIGHT } from "../Render/constant/node";
import { MapFile } from "./file";

export function getStartXY(row = 0, column = 0) {
    if(!row && !column) {
        const mf = store.getState().openedMapFile as MapFile;
        row = mf.row;
        column = mf.column;
    }
    if(engine.canvas) {
        const startY = (engine.canvas.height - row * NODE_HEIGHT) / 2;
        const startX = (engine.canvas.width - column * NODE_WIDTH) / 2;
        return [startX,startY];
    }
    return [-1,-1]
}

export function getRowColumn() {
    const mf = store.getState().openedMapFile as MapFile;
    return [mf.row,mf.column]
}