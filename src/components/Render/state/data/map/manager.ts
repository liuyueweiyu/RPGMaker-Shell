import Node from '../node';
import { engine } from '../../engine';
import { NODE_WIDTH, NODE_HEIGHT } from '../../../constant/node';
import { NODE_TYPE_GRASS } from '../../../constant/node';
import RenderBridge from '../bridge';
import { RENDER_TICK_TYPE_ADD_SHAPE } from '../../../constant/bridge';
import { STYLE_TYPE_NODE_DEFAULT } from '../style/define';
import { MapFile } from '../../../../Project/file';
import { getStartXY } from '../../../../Project/util';
class MapManager {
    nodes : Map<number,Node> = new Map();
    nodesPos : Array<Array<number>> = [];
    requestID  = -1;
    renderFlag = false;
    createMap(row : number,column: number) {
        const nodes : Map<number,Node> = new Map();
        const nodesPostion : Array<Array<number>> = [];
        if(engine.canvas?.width && engine.canvas?.height) {
            const [startX,startY] = getStartXY(row,column);
            for (let i = 0; i < row; i++) {
                const pos : Array<number> = [];
                for (let j = 0; j < column; j++) {
                    const node = new Node(startX + j * NODE_WIDTH, startY + i * NODE_HEIGHT , NODE_TYPE_GRASS,STYLE_TYPE_NODE_DEFAULT);
                    pos.push(node.getId())
                    nodes.set(node.getId(),node);
                }
                nodesPostion.push(pos);
            }
        }
        return [nodes,nodesPostion];
    }

    async openFile(mf:MapFile) {
        this.nodes = mf.nodes;
        this.nodesPos = mf.nodesPos;
        engine.widgets.setWidgets(mf.widgets)
        await engine.widgets.init()
        this.renderFlag = true;
        this.requestID = requestAnimationFrame(this.renderMap.bind(this));
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
        if(!this.renderFlag) {
            cancelAnimationFrame(this.requestID);
        } else {
            this.requestID = requestAnimationFrame(this.renderMap.bind(this))
        }
    }
}

export default MapManager;