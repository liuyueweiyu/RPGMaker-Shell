import { Action, HistoryAction } from "./define";

class Manager {
    private stack : Array<Action> = [];
    private current = -1;
    
    addAction(undoData:any,undo:HistoryAction,redoData:any,redo:HistoryAction) {
        const action : Action = {
            undo,
            undoData,
            redo,
            redoData
        }
        this.stack.push(action);
        this.current++;
    }
    redo() {
        if(this.current < this.stack.length) {
            const action = this.stack[this.current];
            action.redo(action.redoData);
        }
    }
    undo() {
        if(this.current >= 0) {
            const action = this.stack[this.current];
            action.undo(action.undoData);
        }
    }
}

export default Manager;