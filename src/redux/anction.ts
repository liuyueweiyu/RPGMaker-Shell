export const ACTION_TYPE_ADD_PROJECT = "ADD_PROJECT";
export function addProject(name : string) {
    return {
        type : ACTION_TYPE_ADD_PROJECT,
        name : name
    };
}
