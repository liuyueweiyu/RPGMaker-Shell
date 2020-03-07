export interface HistoryAction {
    (data: any) : any;
}
export interface Action {
    redo : HistoryAction;
    undo : HistoryAction;
    redoData : any;
    undoData : any;
}

