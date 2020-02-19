import { initShape,initTexture } from './draw';
import { commonShape } from './shaders/shape';
import { commonTexture } from './shaders/texture';
import { getWebGLContext } from './base';
import { setRectangle,RGBA256toWebglColor } from './utils';
import { RenderConfig } from '../state/data/bridge/index';

export function drawRectangle(canvas:HTMLCanvasElement,x:number,y:number,width:number,height:number,color:Array<number>) {
    const gl = getWebGLContext(canvas);
    initShape(canvas,commonShape,{
        attributes : [{
            name : 'a_Position',
            data : setRectangle(x,y,width,height),
            dataType : 'Float32Array',
            normalize : false,
            size : 2,
            type : gl.FLOAT,
            stride : 0,
            offset : 0
        }],
        uniforms: [{
            name : 'u_resolution',
            type : 'uniform2f',
            data : {
                x : gl.canvas.width,
                y : gl.canvas.height
            }
        },{
            name : 'u_color',
            type : 'uniform4f',
            data : RGBA256toWebglColor(color)
        }],
        drawdata : {
            primitiveType:gl.TRIANGLES,
            offset:0,
            count:6
        }
    });
}

export function drawRectangles(canvas:HTMLCanvasElement,list:Array<RenderConfig>,color:Array<number>){

    const data : Array<number>= [];
    list.forEach(v=>{

        data.push(...setRectangle(v.x,v.y,v.w,v.h));
    })
    const gl = getWebGLContext(canvas);
    initShape(canvas,commonShape,{
        attributes : [{
            name : 'a_Position',
            data : data,
            dataType : 'Float32Array',
            normalize : false,
            size : 2,
            type : gl.FLOAT,
            stride : 0,
            offset : 0
        }],
        uniforms: [{
            name : 'u_resolution',
            type : 'uniform2f',
            data : {
                x : gl.canvas.width,
                y : gl.canvas.height
            }
        },{
            name : 'u_color',
            type : 'uniform4f',
            data : RGBA256toWebglColor(color)
        }],
        drawdata : {
            primitiveType:gl.TRIANGLES,
            offset:0,
            count:data.length / 2
        }
    });
}

export function drawImage(canvas:HTMLCanvasElement,x:number,y:number,width:number,height:number,imageX:number,imageY:number,imageWidth:number,imageHeight:number,image:HTMLImageElement) {
    const gl = getWebGLContext(canvas);
    initTexture(canvas,commonTexture,image,{
        attributes : [{
            name : 'a_position',
            data :setRectangle(x,y,width,height),
            dataType : 'Float32Array',
            normalize : false,
            size : 2,
            type : gl.FLOAT,
            stride : 0,
            offset : 0
        },{
            name : 'a_texCoord',
            data : setRectangle(imageX,imageY,imageWidth,imageHeight),
            dataType : 'Float32Array',
            normalize : false,
            size : 2,
            type : gl.FLOAT,
            stride : 0,
            offset : 0
        }],
        uniforms: [{
            name : 'u_resolution',
            type : 'uniform2f',
            data : {
                x : gl.canvas.width,
                y : gl.canvas.height
            }
        }],                
        drawdata : {
            primitiveType:gl.TRIANGLES,
            offset:0,
            count:6
        }
    })
}