import Widget from './index';
import Node from '../node';
import definitions from './definition';
import { ImageSizeInfor } from './size';
import { engine } from '../../engine';
class Manager {
    private widgets : Map<number,Widget> = new Map();
    private imagesMap : Map<string,HTMLImageElement> = new Map();
    private widgetToImageMap : Map<string,string> = new Map();      //key: widgettype+status value: imageName
    private imageToWidgetMap : Map<string,string> = new Map();      //key : imageName value: widgettype+status
    private widgetTypeSizeInfor : Map<string,ImageSizeInfor> = new Map(); // 存储每次widget的读取信息
    
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
        nodes.forEach((list,i)=>{
            list.forEach((node,j)=>{
                const widgetType = nextWidgets[i][j];
                const [type,status] = widgetType.split("#");
                const w = new Widget(type,status,node.getId(),node.getX(),node.getY(),0,true);
                this.widgets.set(w.getID(),w);
                node.addWidget(w.getID(),w.getType(),w.getCanReach());
            })
        })
        return nodes;
    }

    setWidgets(w:Map<number,Widget>){
        this.widgets = w;
    }

    getWidgetByID(id: number){
        return this.widgets.get(id);
    }

    getCacheImage(src:string) {
        return this.imagesMap.get(src);
    }

    getWidgetInfor(widgetType:string) {
        return this.widgetTypeSizeInfor.get(widgetType);
    }

    getWidgetMapSortByImage() {
        const m : Map<string,Array<Widget>> = new Map();
        this.widgets.forEach((v)=>{
            const imageSrc = this.widgetToImageMap.get(v.getWidgetType())
            if(imageSrc){
                if(m.has(imageSrc)) {
                    m.get(imageSrc)?.push(v);
                } else{
                    m.set(imageSrc,[v]);
                }
            }
        });
        return m;
    }

    getWidgets() {
        return this.widgets;
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