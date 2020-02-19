import { drawRectangle } from '../../../webgl';
import { engine } from '../../engine';
import { render } from '@testing-library/react';
import { stringify } from 'querystring';
interface Func {
    (x:number,y:number,w:number,h:number):any
}



class StyleManager {
    
    private styleMap:Map<string,Func> = new Map();
    constructor() {
        this.registerStyle();
    }
    registerStyle() {
        this.styleMap.set("narmal",(x:number,y:number,w:number,h:number)=>{
            drawRectangle(engine.canvas as HTMLCanvasElement,x,y,w,h,[242,221,170]);
        })
    }

    renderStyle(name:string,x:number,y:number,w:number,h:number){
        if(this.styleMap.has(name)) {
            // @ts-ignore
            this.styleMap.get(name)(x,y,w,h)
        }
    }

}


export default StyleManager