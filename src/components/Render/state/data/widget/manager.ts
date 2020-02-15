// import images from ;
import images from './definition';
import { drawImage } from '../../../webgl';

class Manager {
    constructor() {
    }
    async initSrc(canvas:HTMLCanvasElement) {
        try {
            images.forEach(async v=>{
                const image = (await this.getImage("./"+v.src)) as HTMLImageElement;   
                const width = 1/v.column,height = 1/v.row;
                v.imgs.forEach(img=>{
                    drawImage(canvas,0,0,100,100,img.x,img.y,width,height,image);
                })
            })
        } catch (error) {
            console.error(error)
        }

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