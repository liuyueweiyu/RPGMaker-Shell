import * as React from 'react';
import { useEffect } from 'react';
import { initEngine } from './state/engine';
// import {  commonShape } from './webgi-utils/shaders/shape';
// import { commonTexture } from './webgi-utils/shaders/texture';
// import { initTexture } from './webgi-utils/index';
// import { getWebGLContext } from './webgi-utils/base';
// import { setRectangle } from './webgi-utils/utils';
export interface Props {
    width : number|string;
    height : number|string;
}

function Render({width,height} : Props) {
    useEffect(()=>{
        const canvas = document.getElementById('webgl') as HTMLCanvasElement;
        initEngine(canvas);

    })
    return (
        <canvas id="webgl" style={{float:"left"}} width={width} height={height}>
            浏览器不支持画布
        </canvas>
    )
}

export default Render;
