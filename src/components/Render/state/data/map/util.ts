import { Project } from "../../../../Project/project";
import Node from '../node/index';
import { getNodeWithJson } from "../node/util";
export function StateToJson(state : any) {
    const s = Object.assign({},state);
    s.openedMapFile = 0;
    s.openedProject = 0;
    const projects : Array<Project> = s.projects;
    projects.forEach(p=>{
        p.files.forEach(f=>{
            const obj = {};
            f.nodes.forEach((value,key)=>{
                // @ts-ignore
                obj[key] = value;
            })
            // @ts-ignore
            f.nodes = obj;
        })
    })
    return JSON.stringify(s);
}

export function JsonToState(str: string) {
    const state = JSON.parse(str);
    const projects : Array<Project> = [];
    if (state.projects) {
        state.projects.forEach((p:any)=>{
            p.files.forEach((f:any)=>{
                const m  : Map<number,Node>= new Map();
                for (const key in f.nodes) {
                    if (f.nodes.hasOwnProperty(key)) {
                        m.set(Number(key),getNodeWithJson(f.nodes[key]))
                    }
                }
                f.nodes = m;
            });
            projects.push(p);
        })
    }
    return state;
}