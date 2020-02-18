import { MapFile } from './file';
import { getNewID } from '../Generator/id';

export interface Project {
    id : number;
    name : string;
    files : Array<MapFile>;
}

export function NewProject(name:string):Project{
    return {
        id : getNewID(),
        name : name,
        files : []
    } 
}

export const PROJECT_IS_NULL = 0;