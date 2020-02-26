import Node from './index';
import { 
    STYLE_TYPE_NODE_DEFAULT, 
    STYLE_TYPE_NODE_DEFAULT_ACTIVE, 
    STYLE_TYPE_NODE_DEFAULT_HOVER 
} from '../style/define';
import { NODE_ACTIVE_STATUS,NODE_HOVER_STATUS } from '../../../constant/node';
class NodeManager {
    addHoverNode(state:any,nodes:Array<Array<Node>>) {
        if(!nodes) {
            return state;
        }
        if(!state.nodes) {
            state.nodes = [[]];
        }
        // state.status = NODE_HOVER_STATUS;
        // state.nodes = nodes;
        return ;
    }

    addActiveNode(state:any,nodes:Array<Array<Node>>,isAppend:boolean) {
        if(!nodes) {
            return state;
        }
        if(!state.nodes) {
            state.nodes = [[]];
        }
        if(state.status === NODE_HOVER_STATUS || !isAppend) {
            state.nodes = nodes;
        }
        if(state.status === NODE_ACTIVE_STATUS && isAppend) {
            // state.nodes.push(node);
            // ... anppend todo
        }
        state.status = NODE_ACTIVE_STATUS;
        return state;
    }

}


export default NodeManager;