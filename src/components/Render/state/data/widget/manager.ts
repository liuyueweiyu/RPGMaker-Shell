import Widget from './index';
import Node from '../node';
import definitions from './definition';
import { ImageSizeInfor } from './size';
class Manager {
    private widgets : Map<number,Widget> = new Map();
    private imagesMap : Map<string,HTMLImageElement> = new Map();
    private widgetToImageMap : Map<string,string> = new Map();      //key: widget+type value: imageName
    private imageToWidgetMap : Map<string,string> = new Map();      //key : imageName value: widget+type
    private widgetTypeSizeInfor : Map<string,ImageSizeInfor> = new Map(); // 存储每次widget的读取信息
    
    constructor() {
        this.init()
    }
    init() {
        try{
            definitions.forEach(async imgFile=>{
                const image = (await this.getImage(imgFile.src)) as HTMLImageElement;
                this.imagesMap.set(imgFile.src,image);
                imgFile.imgs.forEach(imgInfor=>{
                    this.widgetToImageMap.set(imgInfor.name,imgFile.src);
                    this.imageToWidgetMap.set(imgFile.src,imgInfor.name);
                    this.widgetTypeSizeInfor.set(imgInfor.name,{
                        x : imgInfor.x,
                        y : imgInfor.y,
                        w : 1 /imgFile.column,
                        h : 1 /imgFile.row
                    })
                })
            })
        } catch (err){
            console.log(err)
        }
    }



    addWidget(nextWidgets:Array<Array<string>>,nodes:Array<Array<Node>>) {
        
    }

    getWidgetByID(id: number){
        return this.widgets.get(id);
    }

    render() {

    }

    getImage(src : string) {
        return new Promise((resolve,reject)=>{
            const image = new Image();
            image.src = src;
            image.onload = ()=>{ resolve(image) };
            image.onerror = (err)=>{ reject(err) }; 
        })
    }
}


export default Manager