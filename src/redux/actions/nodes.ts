export const ACTION_TYPE_ADD_ACTIVE_NODE = "ADD_ACTIVE_NODE";
export function addFileAction(name:string, row:number ,column:number , projectId: number) {
    return {
        type : ACTION_TYPE_ADD_ACTIVE_NODE,
        name : name,
        row : row,
        column : column,
        projectId : projectId
    }
}
