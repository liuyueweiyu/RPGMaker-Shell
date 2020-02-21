import * as React from 'react';
import { useEffect } from 'react';
import { initEngine, engine } from './state/engine';
export interface Props {
    width : number|string;
    height : number|string;
}

function Render({width,height} : Props) {
    console.log(12)
    useEffect(()=>{
        const canvas = document.getElementById('webgl') as HTMLCanvasElement;
        initEngine(canvas);
    })
    return (
        <canvas id="webgl" style={{float:"left"}} onClick={engine.event.OnClick} onMouseMove={engine.event.OnHover} width={width} height={height}>
            浏览器不支持画布
        </canvas>
    )
}

export default Render;
