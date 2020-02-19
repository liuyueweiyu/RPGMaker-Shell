import { drawRectangle } from '../../../webgl';
import { engine } from '../../engine';
import { Style } from '.';
import { strToColor } from './util';
interface Func {
    (x:number,y:number,w:number,h:number):any
}



class StyleManager {
    
    private styleMap:Map<string,Style> = new Map();
    constructor() {
        this.registerStyle();
    }
    registerStyle() {
        this.styleMap.set("normal",{
            backgound : strToColor("#FFFF00"),
            borderColor : strToColor("#FF0000"),
            borderSize : 3
        })
        this.styleMap.set("err",{
            backgound : strToColor("#124567"),
            borderColor : strToColor("#000000"),
            borderSize : 0
        })
    }

    getStyle(name:string) {
        return this.styleMap.get(name);
    }

    renderStyle(name:string,x:number,y:number,w:number,h:number){
        if(this.styleMap.has(name)) {
            // @ts-ignore
            this.styleMap.get(name)(x,y,w,h)
        }
    }

}


export default StyleManager