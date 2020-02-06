import * as React from 'react';
import { useEffect } from 'react';
// import { init } from './helper/index';
import { main,renderImage } from './webgi-utils/test';
export interface Props {
    width : number;
    height : number;
}

function Render({width,height} : Props) {
    useEffect(()=>{
        const canvas = document.getElementById('webgl') as HTMLCanvasElement;
        // console.log(canvas)
        // init(canvas);
        var image = new Image();
        image.src = "/logo192.png";
        // image.src = "https://webglfundamentals.org/webgl/resources/leaves.jpg";  // 必须在同一域名下
        image.onload = function() {
            //   render(image);
            main(canvas);
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
