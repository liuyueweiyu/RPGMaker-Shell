import { getNewID } from '../Generator/id';
import { Project } from './project';
import { engine } from '../Render/state/engine';
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
    const d = { row : row, column : column};
    console.log(d)
    engine.api.callAPICallBack("CreateMapFile",d,(data)=>{
        console.log(data)
        engine.map.renderMap()
    })
    return ([] as Array<Project>).concat(...list);
}

export const FILE_IS_NULL = 0;