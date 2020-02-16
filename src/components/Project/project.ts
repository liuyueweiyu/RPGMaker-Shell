import { MapFile } from './file';
import { getNewID } from '../Generator/id';

class Project  {
    private name = "";
    private id = 0;
    private files : Map<number,MapFile>= new Map();
    constructor(name:string) {        
        this.name = name;
        this.id = getNewID();
    }
    openFile() {

    }
}

export default Project;