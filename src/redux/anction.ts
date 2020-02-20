export const ACTION_TYPE_ADD_PROJECT = "ADD_PROJECT";
export function addProjectAction(name : string) {
    return {
        type : ACTION_TYPE_ADD_PROJECT,
        name : name
    };
}

export const ACTION_TYPE_SET_OPENED_PROJECT = "SET_OPENED_PROJECT";
export function setOpenedProjectAction(id: number) {
    return {
        type : ACTION_TYPE_SET_OPENED_PROJECT,
        id : id
    }
}

export const ACTION_TYPE_SET_OPENED_FILE = "SET_OPENED_FILE";
export function setOpenedFileAction(id:number) {
    return {
        type : ACTION_TYPE_SET_OPENED_FILE,
        id : id
    }
}

export const ACTION_TYPE_ADD_FILE = "ADD_FILE";
export function addFileAction(name:string, row:number ,column:number , projectId: number) {
    return {
        type : ACTION_TYPE_ADD_FILE,
        name : name,
        row : row,
        column : column,
        projectId : projectId
    }
}