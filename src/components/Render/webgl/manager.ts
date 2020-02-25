import { Program, Uniform,Attribute } from './program';
import { UniformConfig, Shader, AttributeConfig } from './shaders/interface';
import { createProgramWithShaderObj, getWebGLContext, setUniformDataWithConfig } from './base';
import { WebGLData, FrameData } from './drawData';
import { setUniformData } from './utils';
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

    runProgram(name:string,frameDatas:Array<FrameData>) {
        const gl = this.getGL()
        const programObj = this.program.get(name);
        const uniformMap = programObj?.uniforms;
        if(programObj) {
            frameDatas.forEach(frameData=>{
                let count = 0;
                frameData.attributes.forEach(a=>{
                    count += a.data.length || 0;
                    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(a.data),gl.STATIC_DRAW);
                })
                frameData.uniforms.forEach(u=>{
                    const uniform = uniformMap?.get(u.name);
                    if(uniform) {
                        setUniformData(gl,uniform.entity,uniform.type,{
                            x : Math.random(),
                            y : Math.random(),
                            z : Math.random(),
                            w : 1
                        });
                    }
                })
                gl.drawArrays(gl.TRIANGLES,0,count);
            })
        }
    }

}