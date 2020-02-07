import * as React from 'react';
import { useEffect } from 'react';
// import { init } from './helper/index';
// import { main,renderImage } from './webgi-utils/test';
import {  commonShape } from './webgi-utils/shaders/shape';
import { init } from './webgi-utils/index';
import { getWebGLContext } from './webgi-utils/base';
export interface Props {
    width : number;
    height : number;
}

function Render({width,height} : Props) {
    useEffect(()=>{
        const canvas = document.getElementById('webgl') as HTMLCanvasElement;
        const gl = getWebGLContext(canvas);
        // console.log(canvas)
        // init(canvas);
        var image = new Image();
        image.src = "/logo192.png";
        // image.src = "https://webglfundamentals.org/webgl/resources/leaves.jpg";  // 必须在同一域名下
        image.onload = function() {
            init(canvas,commonShape,{
                attributes : [{
                    name : 'a_Position',
                    data : [
                        10, 20,
                        80, 20,
                        10, 30,
                        10, 30,
                        80, 20,
                        80, 30,
                    ],
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
            //   render(image);
            // main(canvas);
            // renderImage(image,canvas)
            // console.log("images:",image);
        }





    })
    return (
        <div>
            <canvas id="webgl" width={width} height={height}>
                浏览器不支持画布
            </canvas>
        </div>
    )
}

export default Render;
