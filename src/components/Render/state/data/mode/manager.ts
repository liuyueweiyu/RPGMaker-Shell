import { 
    GLOBAL_MODE_SELETED_MODE
} from './define';
class Manager {
    private currentMode = GLOBAL_MODE_SELETED_MODE;
    setGlobalMode(mode:number){
        this.currentMode = mode;
    }    
    getGlobalMode(){
        return this.currentMode;
    }
}

export default Manager;