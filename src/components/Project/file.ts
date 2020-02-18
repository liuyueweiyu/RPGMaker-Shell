import store from '../../redux';
import { getNewID } from '../Generator/id';
import { Project } from './project';
export interface MapFile {
    id : number;
    name : string;
    column : number;
    row : number;
    parent : number;
}

export function NewMapFile(name:string, column: number, row:number,list :Array<Project>,projectId : number) {
    const file : MapFile = {
        id : getNewID(),
        name : name,
        column : column,
        row : row,
        parent : projectId
    }
    list.some((v)=>{
        if(v.id === projectId) {
            v.files.push(file);
        }
        return v.id === projectId;
    })
    return ([] as Array<Project>).concat(...list);
}

export const FILE_IS_NULL = 0;