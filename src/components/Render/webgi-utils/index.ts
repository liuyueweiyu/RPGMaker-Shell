import Shader from './shaders/interface';
import { DrawData } from './drawData';
import { setAttributes, createProgramWithShaderObj ,getWebGLContext,setUniforms,drawArrays } from './base';

export function init(canvas: HTMLCanvasElement, shader: Shader,data : DrawData) {
    const gl = getWebGLContext(canvas);
    const program = createProgramWithShaderObj(gl ,shader);
    if(program) {
        // 绘制时
        gl.useProgram(program);
        // // 设置所有的缓冲和属性
        if(data.attributes) {
            setAttributes(gl,program,data.attributes);
        }
        if(data.uniforms) {
            setUniforms(gl,program,data.uniforms);
        }
        drawArrays(gl,data.drawdata);
        // webglUtils.setAttributes(attribSetters, attribs);
        
        // // 设置需要的全局变量和纹理
        // webglUtils.setUniforms(uniformSetters, uniforms);
        
        // gl.drawArrays(...);

    }
}