import ModeManager from '../manager';
import { 
    GLOBAL_MODE_SELETED_MODE, GLOBAL_MODE_CLICK_ACTION, GLOBAL_MODE_WIDGET_ADD_MODE 
} from '../define';
import Node from '../../node';
import store from '../../../../../../redux';
import { addActiveNodeAction } from '../../../../../../redux/actions/nodes';
import { engine } from '../../../engine';
import { NewSuccess } from '../../../api/response';
import { HistoryAction } from '../../history/define';
function register(modeManager:ModeManager) {
    modeManager.addModeAction(
        GLOBAL_MODE_SELETED_MODE,
        GLOBAL_MODE_CLICK_ACTION,
        (nodes:Array<Array<Node>>)=>{
            //@ts-ignore
            store.dispatch(addActiveNodeAction(nodes,false));
        }
    )
    modeManager.addModeAction(
        GLOBAL_MODE_WIDGET_ADD_MODE,
        GLOBAL_MODE_CLICK_ACTION,
        (nodes)=>{
            const nextWidgetTypes = store.getState().nextWidgets as Array<Array<string>>;
            const res = engine.widgets.addWidget(nextWidgetTypes,nodes);
            // 添加到历史栈
            const undoData = engine.node.copyNode(nodes);
            const redoData = engine.node.copyNode(res);
            const undo : HistoryAction = (undoData)=>{
                
            }
            engine.api.triggerCallBack("AddWidgetCallBack",NewSuccess(res));
        }
    )
}

export default register;