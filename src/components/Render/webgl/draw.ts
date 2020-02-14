import Shader from './shaders/interface';
import { DrawData } from './drawData';
import { setAttributes, createProgramWithShaderObj, createTexture ,getWebGLContext,setUniforms,drawArrays } from './base';

export function initShape(canvas: HTMLCanvasElement, shader: Shader,data : DrawData) {
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
        // 绘制
        drawArrays(gl,data.drawdata);
    }
}

export function initTexture(canvas: HTMLCanvasElement, shader: Shader,image:HTMLImageElement,data : DrawData) {
    const gl = getWebGLContext(canvas);
    const program = createProgramWithShaderObj(gl ,shader);
    if(program) {
        // 绘制时
        gl.useProgram(program);
        // // 设置所有的缓冲和属性
        if(data.attributes) {
            setAttributes(gl,program,data.attributes);
        }
        createTexture(gl,image)
        if(data.uniforms) {
            setUniforms(gl,program,data.uniforms);
        }
        // 绘制
        drawArrays(gl,data.drawdata);
    }
}