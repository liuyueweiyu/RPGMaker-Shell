import * as React from 'react';
import { useEffect } from 'react';
import { init } from './helper/index';
export interface Props {
    width : number;
    height : number;
}

function Render({width,height} : Props) {
    useEffect(()=>{
        const canvas = document.getElementById('webgl') as HTMLCanvasElement;
        // console.log(canvas)
        init(canvas);
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
