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
        this.setNodesStyle(state.nodes,STYLE_TYPE_NODE_DEFAULT);
        this.setNodesStyle(nodes,STYLE_TYPE_NODE_DEFAULT_HOVER);
        state.status = NODE_HOVER_STATUS;
        state.nodes = nodes;
        return state;
    }

    addActiveNode(state:any,nodes:Array<Array<Node>>,isAppend:boolean) {
        if(!nodes) {
            return state;
        }
        if(!state.nodes) {
            state.nodes = [[]];
        }
        if(state.status === NODE_HOVER_STATUS || !isAppend) {
            this.setNodesStyle(state.nodes,STYLE_TYPE_NODE_DEFAULT);
            this.setNodesStyle(nodes,STYLE_TYPE_NODE_DEFAULT_ACTIVE);
            state.nodes = nodes;
        }
        if(state.status === NODE_ACTIVE_STATUS && isAppend) {
            // state.nodes.push(node);
            // ... anppend todo
        }
        state.status = NODE_ACTIVE_STATUS;
        return state;
    }

    setNodesStyle(nodes:Array<Array<Node>>,styleType:string) {
        nodes.forEach(list=>{
            list.forEach(n=>{
                n.setStyleType(styleType);
            })
        })
    }
}


export default NodeManager;