import { Program, Uniform,Attribute } from './program';
import { UniformConfig, Shader, AttributeConfig } from './shaders/interface';
import { createProgramWithShaderObj, getWebGLContext, drawArrays, setUniformDataWithConfig, setAttributeDataWithConfig } from './base';
import { WebGLData, DrawArrayData, ViewData } from './drawData';
import { setUniformData, setBufferData, setRectangle } from './utils';
export default class WebglManager {
    private program : Map<string,Program> = new Map();
    private canvas : HTMLCanvasElement| null = null;
    private gl : WebGLRenderingContext | null = null;
    setCanvas(canvas:HTMLCanvasElement) {
        this.canvas = canvas;
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

    private a_position : number = 0;
    private u_color : WebGLUniformLocation | null = null;
    private u_resolation : WebGLUniformLocation | null = null;

    test_creatProgram(name:string, shader: Shader,uniformConfig: Array<UniformConfig>,initUniformData:Array<WebGLData>,attributeConfig:Array<AttributeConfig>) {
        const gl = this.getGL()
        const program = createProgramWithShaderObj(gl ,shader);
        if(program) {
            gl.useProgram(program);
            this.a_position = gl.getAttribLocation(program,'a_Position');
            const positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(this.a_position);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(this.a_position,2,gl.FLOAT,false,0,0);   
            this.u_color = gl.getUniformLocation(program,'u_color');
            this.u_resolation = gl.getUniformLocation(program,'u_resolution');
            gl.uniform2f(this.u_resolation,gl.canvas.width,gl.canvas.height);
        }
    }

    test_runProgram(name:string,list:Array<ViewData>) {
        const gl = this.getGL()
        list.forEach(a=>{
            gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(setRectangle(a.x,a.y,a.w,a.h)),gl.STATIC_DRAW);
            // Set a random color.
            gl.uniform4f(this.u_color, Math.random(), Math.random(), Math.random(), 1);

            // Draw the rectangle.
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
            setUniformDataWithConfig(gl,uniformDatas,programObj.uniforms);
            setAttributeDataWithConfig(gl,attributeDatas,programObj.attributes);
            drawArrays(gl,data);
        }
    }

}