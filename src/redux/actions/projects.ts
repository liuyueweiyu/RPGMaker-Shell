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