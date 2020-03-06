import { 
    GLOBAL_MODE_SELETED_MODE, GLOBAL_MODE_GENERAL_MODE
} from './define';
import init from './actions';
class Manager {
    private currentMode = GLOBAL_MODE_SELETED_MODE;
    private modeAction : Map<number,Map<number,(data:any)=>any>> = new Map();
    constructor() {
        init(this);
    }
    setGlobalMode(mode:number){
        this.currentMode = mode;
    }    
    getGlobalMode(){
        return this.currentMode;
    }

    addModeAction(mode:number,actionType:number,action:(data:any)=>any) {
        if(!this.modeAction.has(mode)){
            this.modeAction.set(mode,new Map());
        }
        this.modeAction.get(mode)?.set(actionType,action);
    }
    triggerModeAction(mode:number,actionType:number,data?:any) {
        let action = this.modeAction.get(mode)?.get(actionType)
        if(action) {
            action(data);
        } else {
            const action = this.modeAction.get(GLOBAL_MODE_GENERAL_MODE)?.get(actionType)
            if(action) {
                action(data)
            }
        }

    }
}

export default Manager;