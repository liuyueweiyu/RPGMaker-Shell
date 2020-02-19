import Node from '../node';
import { engine } from '../../engine';
import { NODE_WIDTH, NODE_HEIGHT } from '../../../constant/node';
import { NODE_TYPE_GRASS } from '../../../constant/node';

class MapManager {
    nodes : Map<number,Node> = new Map()
    constructor() {}
    createMap(row : number,column: number) {
        if(engine.canvas?.width && engine.canvas?.height) {
            // const startX = (engine.canvas?.width - column * NODE_WIDTH) / 2;
            // const startY = (engine.canvas?.height - row * NODE_HEIGHT) / 2;
            const startY = 0,startX = 0;
            for (let i = 0; i < row; i++) {
                for (let j = 0; j < column; j++) {
                    const node = new Node(startX + i * NODE_WIDTH, startY + j * NODE_HEIGHT , NODE_TYPE_GRASS);
                    this.nodes.set(node.getId(),node);
                }
            }
        }
    }
    renderMap() {
        this.nodes.forEach(v=>{
            v.render()
        })
    }
}

export default MapManager;