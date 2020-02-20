import Node from '../node';
import { engine } from '../../engine';
import { NODE_WIDTH, NODE_HEIGHT } from '../../../constant/node';
import { NODE_TYPE_GRASS } from '../../../constant/node';
import RenderBridge from '../bridge';
import { RENDER_TICK_TYPE_ADD_SHAPE } from '../../../constant/bridge';
import { STYLE_TYPE_NODE_DEFAULT } from '../style/define';
import { MapFile } from '../../../../Project/file';
class MapManager {
    nodes : Map<number,Node> = new Map();
    nodesPos : Array<number> = [];
    createMap(row : number,column: number) {
        const nodes : Map<number,Node> = new Map();
        const nodesPostion : Array<number> = [];
        if(engine.canvas?.width && engine.canvas?.height) {
            const startX = (engine.canvas?.width - column * NODE_WIDTH) / 2;
            const startY = (engine.canvas?.height - row * NODE_HEIGHT) / 2;
            for (let i = 0; i < column; i++) {
                for (let j = 0; j < row; j++) {
                    const node = new Node(startX + i * NODE_WIDTH, startY + j * NODE_HEIGHT , NODE_TYPE_GRASS,STYLE_TYPE_NODE_DEFAULT);
                    nodesPostion.push(node.getId());
                    nodes.set(node.getId(),node);
                }
            }
        }
        console.log(nodes)
        return [nodes,nodesPostion];
    }

    openFile(mf:MapFile) {
        this.nodes = mf.nodes;
        this.nodesPos = mf.nodesPos;
        this.renderMap();
    }

    renderMap() {
        const bridge = new RenderBridge();
        bridge.start();
        
        this.nodes.forEach(v=>{
            bridge.addTick({
                type : RENDER_TICK_TYPE_ADD_SHAPE,
                viewData : v.getRenderTick()
            });
        })
        bridge.end();
    }
}

export default MapManager;