import { Project } from "../../../../Project/project";
import Node from '../node/index';
import { getNodeWithJson } from "../node/util";
import { getWidgetWithJson } from "../widget/util";
import { MapFile } from "../../../../Project/file";
import { engine } from "../../engine";
import Widget from "../widget";
// export function StateToJson(state : any) {
//     const s = Object.assign({},state);
//     s.openedMapFile = 0;
//     s.openedProject = 0;
//     s.activeNodes = [[]];
//     s.hoverNodes = [[]];
//     const projects : Array<Project> = s.projects;
//     projects.forEach(p=>{
//         p.files.forEach(f=>{
//             const obj = {};
//             f.nodes.forEach((value,key)=>{
//                 // @ts-ignore
//                 obj[key] = value;
//             })
//             // @ts-ignore
//             f.nodes = obj;
//         })
//     })
//     return JSON.stringify(s);
// }

function MapToObj(m:Map<any,any>) {
    const obj = {};
    m.forEach((value,key)=>{
        // @ts-ignore
        obj[key] = value;
    })
    return obj;
}

function ObjToMap<T>(obj:Object,jsonToObj:(data:any)=>T) { 
    const m  : Map<number,T>= new Map();
    if(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                // @ts-ignore
                m.set(Number(key),jsonToObj(obj[key]))
            }
        }
    }
    return m;
}

export function saveMap(state: any) {
    const projects : Array<Project> = state.projects ;
    const openedMapFile : MapFile = state.openedMapFile ;
    projects.forEach(p=>{
        p.files.forEach(file=>{
            const f = Object.assign({},file);
            // @ts-ignore
            f.nodes = MapToObj(file.nodes)
            if(f.id === openedMapFile.id) {
                //@ts-ignore
                f.widgets = MapToObj(engine.widgets.getWidgets())
            } else {
                //@ts-ignore
                f.widgets = MapToObj(file.widgets);
            }
        })
    })
    return JSON.stringify({
        projects
    })
}

export function JsonToState(str: string) {
    const state = JSON.parse(str) || {};
    const projects : Array<Project> = [];
    if (state.projects) {
        state.projects.forEach((p:any)=>{
            p.files.forEach((f:any)=>{
                f.nodes = ObjToMap<Node>(f.nodes,getNodeWithJson);
                f.widgets = ObjToMap<Widget>(f.widgets,getWidgetWithJson);
            });
            projects.push(p);
        })
    }
    return state;
}