import Shader from './shaders/interface';
import { DrawData, AttributeData, UniformData, ViewData } from './drawData';
import { setAttributes, createProgramWithShaderObj, createTexture ,getWebGLContext,setUniforms,drawArrays } from './base';
import { setRectangle, ColorToArray,RGBA256toWebglColor, getBorderPoint } from './utils';
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

export function initBatchOfShape(canvas: HTMLCanvasElement,shader: Shader, data: Array<ViewData>) {
    const gl = getWebGLContext(canvas);
    const program = createProgramWithShaderObj(gl ,shader);
    
    if(program) {
        // 绘制时
        gl.useProgram(program);
        // // 设置所有的缓冲和属性
        setUniforms(gl,program,[{
            name : 'u_resolution',
            type : 'uniform2f',
            data : {
                x : gl.canvas.width,
                y : gl.canvas.height
            }
        }]);
        data.forEach(v=>{
            const r = v.style.borderSize;
            const attribute :AttributeData = {
                name : 'a_Position',
                data : setRectangle(v.x + r,v.y + r,v.w - 2*r,v.h- 2*r),
                dataType : 'Float32Array',
                normalize : false,
                size : 2,
                type : gl.FLOAT,
                stride : 0,
                offset : 0
            }
            setAttributes(gl,program,[attribute]);
            const uniform :UniformData = {
                name : 'u_color',
                type : 'uniform4f',
                data : RGBA256toWebglColor(ColorToArray(v.style.backgound))
            }
            setUniforms(gl,program,[uniform]);
            // 绘制
            drawArrays(gl,{
                primitiveType:gl.TRIANGLES,
                offset:0,
                count:attribute.data.length / 2
            });
            // 绘制border
            if(r !== 0) {
                attribute.data = getBorderPoint(v.x,v.y,v.w,v.h,r);
                attribute.data = attribute.data.slice(0,30)              
                setAttributes(gl,program,[attribute]);
                uniform.data = RGBA256toWebglColor(ColorToArray(v.style.borderColor));
                setUniforms(gl,program,[uniform]);
                drawArrays(gl,{
                    primitiveType:gl.TRIANGLES,
                    offset:0,
                    count:attribute.data.length / 2
                });
            }
        })
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