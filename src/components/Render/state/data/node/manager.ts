import Node from './index';
import { 
    STYLE_TYPE_NODE_DEFAULT, 
    STYLE_TYPE_NODE_DEFAULT_ACTIVE, 
    STYLE_TYPE_NODE_DEFAULT_HOVER 
} from '../style/define';
import { NODE_ACTIVE_STATUS,NODE_HOVER_STATUS } from '../../../constant/node';
class NodeManager {
    addHoverNode(state:any,node:Node) {
        if(!node) {
            return state;
        }
        if(!state.nodes) {
            state.nodes = [];
        }
        node.setStyleType(STYLE_TYPE_NODE_DEFAULT_HOVER);
        state.nodes.forEach((node:Node)=>{
            node.setStyleType(STYLE_TYPE_NODE_DEFAULT);
        })
        state.status = NODE_HOVER_STATUS;
        state.nodes = [node];
        return state;
    }

    addActiveNode(state:any,node:Node,isMuti:boolean) {
        if(!node) {
            return state;
        }
        if(!state.nodes) {
            state.nodes = [];
        }
        node.setStyleType(STYLE_TYPE_NODE_DEFAULT_ACTIVE);
        if(state.status === NODE_HOVER_STATUS || !isMuti) {
            state.nodes.forEach((node:Node)=>{
                node.setStyleType(STYLE_TYPE_NODE_DEFAULT);
            })
            state.nodes = [node];
        }
        if(state.status === NODE_ACTIVE_STATUS) {
            state.nodes.push(node);
        }
        state.status = NODE_ACTIVE_STATUS;
        return state;
    }
}


export default NodeManager;