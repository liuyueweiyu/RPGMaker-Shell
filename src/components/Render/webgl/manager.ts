import { Program, Uniform,Attribute } from './program';
import { UniformConfig, Shader, AttributeConfig } from './shaders/interface';
import { createProgramWithShaderObj, getWebGLContext, setUniformDataWithConfig } from './base';
import { WebGLData, FrameData, ImageInfor } from './drawData';
import { setUniformData, getRectangle } from './utils';
import { engine } from '../state/engine';
export default class WebglManager {
    private program : Map<string,Program> = new Map();
    private gl : WebGLRenderingContext | null = null;
    setCanvas(canvas:HTMLCanvasElement) {
        this.gl = getWebGLContext(canvas);
    }
    getGL() {
        return this.gl as WebGLRenderingContext;
    }
    creatProgram(name:string, shader: Shader,uniformConfig: Array<UniformConfig>,initUniformData:Array<WebGLData>,attributeConfig:Array<AttributeConfig>,images:Array<ImageInfor>) {
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
                attributes.set(a.name,{
                    name : a.name,
                    type : a.type,
                    entity : attribute
                })
            });
            const imageSrc : Map<string,HTMLImageElement> = new Map();
            if(images && images.length !== 0) {
                images.forEach(v=>{
                    imageSrc.set(v.name,v.image)
                    
                })
                
            }


            this.program.set(name,{
                program,
                uniforms,
                attributes,
                imageSrc 
            })
        }
    }

    runProgram(name:string,frameDatas:Array<FrameData>) {
        const gl = this.getGL()
        const programObj = this.program.get(name);
        const uniformMap = programObj?.uniforms;
        if(programObj) {
            gl.useProgram(programObj.program);
            frameDatas.forEach(frameData=>{
                frameData.attributes.forEach(a=>{
                    const attribute = programObj.attributes.get(a.name)?.entity
                    if(attribute !== undefined) {
                        const positionBuffer = gl.createBuffer();
                        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
                        gl.enableVertexAttribArray(attribute);
                        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
                        gl.vertexAttribPointer(attribute,2,gl.FLOAT,false,0,0);   
                        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(a.data),gl.STATIC_DRAW);
                    }    
                })
                frameData.uniforms.forEach(u=>{
                    const uniform = uniformMap?.get(u.name);
                    if(uniform) {
                        setUniformData(gl,uniform.entity,uniform.type,u.data);
                    }
                })
                if(frameData.texSrc) {
                    const image = engine.widgets.getCacheImage(frameData.texSrc);
                    if(image) {
                         var texture = gl.createTexture();
                        gl.bindTexture(gl.TEXTURE_2D,texture);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                    }
                }

                gl.drawArrays(gl.TRIANGLES,0,frameData.count);
            })
        }
    }


    // testTextureProgram(image:HTMLImageElement) {
    //     const gl = this.getGL()
    //     const programObj = this.program.get('initTexture');
    //     if(programObj?.program) {
    //         const program = programObj.program;
    //         var positionLocation = programObj.attributes.get('a_Position')?.entity;
    //         var texcoordLocation = programObj.attributes.get('a_texCoord')?.entity
    //         if(positionLocation !== undefined && texcoordLocation !== undefined) {
    //         var positionBuffer = gl.createBuffer();
    //         gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    //         const imagePostion = getRectangle(0, 0, image.width, image.height);
    //         gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(imagePostion),gl.STATIC_DRAW);
    //         var texcoordBuffer = gl.createBuffer();
    //         gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    //             0.0,  0.0,
    //             1.0,  0.0,
    //             0.0,  1.0,
    //             0.0,  1.0,
    //             1.0,  0.0,
    //             1.0,  1.0,
    //         ]), gl.STATIC_DRAW);
    //         var texture = gl.createTexture();
    //         gl.bindTexture(gl.TEXTURE_2D, texture);
    //         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    //         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    //         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    //         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    //         gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    //         var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    //         gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
          
    //         gl.useProgram(program);
          
    //         // Turn on the position attribute
    //         gl.enableVertexAttribArray(positionLocation);
          
    //         // Bind the position buffer.
    //         gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
          
    //         gl.vertexAttribPointer( positionLocation, 2, gl.FLOAT, false, 0, 0);
          
    //         // Turn on the teccord attribute
    //         gl.enableVertexAttribArray(texcoordLocation);
          
    //         // Bind the position buffer.
    //         gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
          
    //         gl.vertexAttribPointer( texcoordLocation, 2, gl.FLOAT, false, 0, 0);
          
    //         // set the resolution
    //         gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
          
    //         // Draw the rectangle.
    //         var primitiveType = gl.TRIANGLES;
    //         var offset = 0;
    //         var count = 6;
    //         gl.drawArrays(primitiveType, offset, count);
    //         }
    //     }
      
    // }
}