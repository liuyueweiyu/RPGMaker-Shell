import { Program, Uniform,Attribute } from './program';
import { UniformConfig, Shader, AttributeConfig } from './shaders/interface';
import { createProgramWithShaderObj, getWebGLContext, drawArrays, setUniformDataWithConfig, setAttributeDataWithConfig } from './base';
import { WebGLData, DrawArrayData, ViewData } from './drawData';
import { setUniformData, setBufferData, setRectangle } from './utils';
import { commonShape } from './shaders/shape';
export default class WebglManager {
    private program : Map<string,Program> = new Map();
    private gl : WebGLRenderingContext | null = null;
    setCanvas(canvas:HTMLCanvasElement) {
        this.gl = getWebGLContext(canvas);
    }
    getGL() {
        return this.gl as WebGLRenderingContext;
    }
    creatProgram(name:string, shader: Shader,uniformConfig: Array<UniformConfig>,initUniformData:Array<WebGLData>,attributeConfig:Array<AttributeConfig>) {
        const gl = this.getGL()
        const program = createProgramWithShaderObj(gl ,shader);
        if(program) {
            gl.useProgram(program);
            const uniforms : Map<string,Uniform> = new Map();
            uniformConfig.forEach(u=>{
                const uniform = gl.getUniformLocation(program,u.name);
                uniforms.set(u.name,{
                    name : u.name,
                    type : u.type,
                    entity : uniform as WebGLUniformLocation
                });
            });
            setUniformDataWithConfig(gl,initUniformData,uniforms);
            const attributes: Map<string,Attribute> = new Map()
            attributeConfig.forEach(a=>{
                const attribute = gl.getAttribLocation(program,a.name);
                const positionBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
                gl.enableVertexAttribArray(attribute);
                gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
                gl.vertexAttribPointer(attribute,a.size,a.renderType,a.normalize,a.stride,a.offset);   
                attributes.set(a.name,{
                    name : a.name,
                    type : a.type,
                    entity : attribute
                })
            });
            this.program.set(name,{
                program,
                uniforms,
                attributes
            })
        }
    }


    test_runProgram(list:Array<ViewData>) {
        const gl = this.getGL()
        // const a_Position =
        // const
        const u_color = this.program.get('initBatchOfShape')?.uniforms.get('u_color');
        list.forEach(a=>{
            if(u_color) {
                console.log('sss')
            }
            gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(setRectangle(a.x,a.y,a.w,a.h)),gl.STATIC_DRAW);
            gl.uniform4f(u_color?.entity as WebGLUniformLocation, Math.random(), Math.random(), Math.random(), 1);
            var primitiveType = gl.TRIANGLES;
            var offset = 0;
            var count = 6;
            gl.drawArrays(primitiveType, offset, count);

        })
    }
    
    runProgram(name:string,uniformDatas:Array<WebGLData>,attributeDatas:Array<WebGLData>,data: DrawArrayData) {
        const gl = this.getGL()
        const programObj = this.program.get(name);
        if(programObj) {
            
            // console.log(uniformDatas[0].data.length,attributeDatas[0].data.length)
            // const u_color = this.program.get('initBatchOfShape')?.uniforms.get('u_color');
            // gl.uniform4f(u_color?.entity as WebGLUniformLocation, Math.random(), Math.random(), Math.random(), 1);
            // setUniformDataWithConfig(gl,uniformDatas,programObj.uniforms);
            // setAttributeDataWithConfig(gl,attributeDatas,programObj.attributes);
            // drawArrays(gl,data);
        }
    }

}