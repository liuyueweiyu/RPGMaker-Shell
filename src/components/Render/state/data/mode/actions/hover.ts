import ModeManager from '../manager';
import { 
    GLOBAL_MODE_SELETED_MODE, GLOBAL_MODE_HOVER_ACTION, GLOBAL_MODE_WIDGET_ADD_MODE, GLOBAL_MODE_GENERAL_MODE 
} from '../define';
import Node from '../../node';
import store from '../../../../../../redux';
import { addHoverNodeAction } from '../../../../../../redux/actions/nodes';
import { EventTarget } from '../../../event/target';

function register(modeManager:ModeManager) {
    modeManager.addModeAction(
        GLOBAL_MODE_GENERAL_MODE,
        GLOBAL_MODE_HOVER_ACTION,
        (eventTarget:EventTarget)=>{
            store.dispatch(addHoverNodeAction(eventTarget));
        }       
    )

}

export default register;