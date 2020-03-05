import { getNewID } from '../Generator/id';
import { Project } from './project';
import { engine } from '../Render/state/engine';
import  Node from '../Render/state/data/node';
import Widget from '../Render/state/data/widget';
export interface MapFile {
    id : number;
    name : string;
    column : number;
    row : number;
    parent : number;
    nodes : Map<number,Node>;
    nodesPos : Array<number>;
    widgets : Map<number,Widget>
    
}

export function NewMapFile(name:string, row: number, column:number,list :Array<Project>,projectId : number) {
    const file : MapFile = {
        id : getNewID(),
        name : name,
        column : column,
        row : row,
        parent : projectId,
        nodes : new Map(),
        nodesPos: [],
        widgets : new Map()
    }
    list.some((v)=>{
        if(v.id === projectId) {
            v.files.push(file);
        }
        return v.id === projectId;
    })
    const d = { row : row, column : column};
    engine.api.callAPICallBack("CreateMapFile",d,(res)=>{
        if(res.data) {
            file.nodesPos = res.data.nodesPos;
            file.nodes = res.data.nodes;
        }
    })
    return ([] as Array<Project>).concat(...list);
}

export function OpenMapFile(mf:MapFile) {
    engine.api.callAPICallBack("OpenFile",{mapFile : mf},(res)=>{
        console.log(res)
    })
    return mf;
}


export const FILE_IS_NULL = 0;