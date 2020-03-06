import ModeManager from '../manager';
import { 
    GLOBAL_MODE_SELETED_MODE, GLOBAL_MODE_HOVER_ACTION, GLOBAL_MODE_WIDGET_ADD_MODE, GLOBAL_MODE_GENERAL_MODE 
} from '../define';
import Node from '../../node';
import store from '../../../../../../redux';
import { addHoverNodeAction } from '../../../../../../redux/actions/nodes';

function register(modeManager:ModeManager) {
    modeManager.addModeAction(
        GLOBAL_MODE_GENERAL_MODE,
        GLOBAL_MODE_HOVER_ACTION,
        (nodes:Array<Array<Node>>)=>{
            //@ts-ignore
            store.dispatch(addHoverNodeAction(nodes,false));
        }       
    )

}

export default register;