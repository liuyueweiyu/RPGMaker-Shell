import { MapFile } from './file';
import { getNewID } from '../Generator/id';

export interface Project {
    id : number;
    name : string;
    files : Map<number,MapFile>;
}

export function NewProject(name:string):Project{
    return {
        id : getNewID(),
        name : name,
        files : new Map()
    } 
}