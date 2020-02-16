import { MapFile } from './file';

class Project  {
    private name = "";
    private files : Map<number,MapFile>= new Map();
    constructor(name:string) {        
        this.name = name;
    }
    openFile() {

    }
}
