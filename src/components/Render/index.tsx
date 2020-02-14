import * as React from 'react';
import { useEffect } from 'react';
import { initEngine,engine } from './state/engine';
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
    console.log(12)
    useEffect(()=>{
        const canvas = document.getElementById('webgl') as HTMLCanvasElement;
        initEngine(canvas);
        engine.api.callAPICallBack("test",{data:'hsh'},(data)=>{
            console.log(data)
        })
       
    })
    return (
        <canvas id="webgl" style={{float:"left"}} width={width} height={height}>
            浏览器不支持画布
        </canvas>
    )
}

export default Render;
