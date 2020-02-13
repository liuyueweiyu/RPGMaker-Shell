import * as React from 'react';
import { useEffect } from 'react';
// import {  commonShape } from './webgi-utils/shaders/shape';
import { commonTexture } from './webgi-utils/shaders/texture';
import { initTexture } from './webgi-utils/index';
import { getWebGLContext } from './webgi-utils/base';
import { setRectangle } from './webgi-utils/utils';
export interface Props {
    width : number|string;
    height : number|string;
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
            // initShape(canvas,commonShape,{
            //     attributes : [{
            //         name : 'a_Position',
            //         data : [
            //             10, 20,
            //             80, 20,
            //             10, 30,
            //             10, 30,
            //             80, 20,
            //             80, 30,
            //         ],
            //         dataType : 'Float32Array',
            //         normalize : false,
            //         size : 2,
            //         type : gl.FLOAT,
            //         stride : 0,
            //         offset : 0
            //     }],
            //     uniforms: [{
            //         name : 'u_resolution',
            //         type : 'uniform2f',
            //         data : {
            //             x : gl.canvas.width,
            //             y : gl.canvas.height
            //         }
            //     }],
            //     drawdata : {
            //         primitiveType:gl.TRIANGLES,
            //         offset:0,
            //         count:6
            //     }
            // })
            initTexture(canvas,commonTexture,image,{
                attributes : [{
                    name : 'a_position',
                    data :setRectangle(0,0,image.width,image.height),
                    dataType : 'Float32Array',
                    normalize : false,
                    size : 2,
                    type : gl.FLOAT,
                    stride : 0,
                    offset : 0
                },{
                    name : 'a_texCoord',
                    data : [
                        0.0,  0.0,
                        1.0,  0.0,
                        0.0,  1.0,
                        0.0,  1.0,
                        1.0,  0.0,
                        1.0,  1.0,
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
        }





    })
    return (
        <canvas id="webgl" style={{float:"left"}} width={width} height={height}>
            浏览器不支持画布
        </canvas>
    )
}

export default Render;
