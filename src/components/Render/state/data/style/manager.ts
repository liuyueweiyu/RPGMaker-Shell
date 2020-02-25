import { Style } from '.';
import { strToColor } from './util';
import { 
    STYLE_TYPE_NODE_DEFAULT,
    STYLE_TYPE_NODE_DEFAULT_HOVER,
    STYLE_TYPE_NODE_DEFAULT_ACTIVE
 } from './define';

interface Func {
    (x:number,y:number,w:number,h:number):any
}
class StyleManager {
    
    private styleMap:Map<string,Style> = new Map();
    constructor() {
        this.registerStyle();
    }
    registerStyle() {
        this.styleMap.set(STYLE_TYPE_NODE_DEFAULT,{
            backgound : strToColor("#A9CDA7"),
            borderColor : strToColor("#FFFFFF"),
            borderSize : undefined
        });
        this.styleMap.set(STYLE_TYPE_NODE_DEFAULT_HOVER,{
            backgound : strToColor("#A9CDA7"),
            borderColor : strToColor("#000000"),
            borderSize : undefined
        })
        this.styleMap.set(STYLE_TYPE_NODE_DEFAULT_ACTIVE,{
            backgound : strToColor("#A9CDA7"),
            borderColor : strToColor("#FF0000"),
            borderSize : undefined
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