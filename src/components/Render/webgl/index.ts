import { initShape } from './draw';
import { commonShape } from './shaders/shape';
import { getWebGLContext } from './base';
import { setRectangle,RGBA256toWebglColor } from './utils';

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