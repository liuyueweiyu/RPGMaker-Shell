import Shader from "./shaders/interface";
import { AttributeData, UniformData,DrawArrayData } from './drawData';
import { dataToArrayBuffer, setUniformData } from './utils';
export function getWebGLContext(canvas:HTMLCanvasElement) {
  return (canvas.getContext('webgl') || canvas.getContext('exprimental-wegl')) as WebGLRenderingContext
}


export function createProgram(gl:WebGLRenderingContext,vertexShader : WebGLShader,fragmentShader:WebGLShader) {
    const program = gl.createProgram();
    if(program) {
        gl.attachShader(program,vertexShader);
        gl.attachShader(program,fragmentShader);
        gl.linkProgram(program);
        if(gl.getProgramParameter(program,gl.LINK_STATUS)){
            return program;
        }
        console.error("createProgram-err:",gl.getProgramInfoLog(program))
    }
    gl.deleteProgram(program);
    return null;
}

export function createShader(gl: WebGLRenderingContext, type : number, source : string) {
    const shader = gl.createShader(type);
    if ( shader) {
        gl.shaderSource(shader,source);
        gl.compileShader(shader);
        if(gl.getShaderParameter(shader,gl.COMPILE_STATUS)) {
            return shader;
        }
        console.error("createShader-err:",gl.getShaderInfoLog(shader))
    }
    gl.deleteShader(shader);
    return null;
}

export function createProgramWithShaderObj(gl:WebGLRenderingContext, shader : Shader) {
  const vertexShader = createShader(gl,gl.VERTEX_SHADER,shader.vertexShader);
  const fragmentShader = createShader(gl,gl.FRAGMENT_SHADER,shader.fragmentShader);
  if(vertexShader && fragmentShader) {
    const program = createProgram(gl,vertexShader,fragmentShader);
    if(program) {
      return program;
    }
  }
  return null;
}

export function setAttributes(gl:WebGLRenderingContext,program : WebGLProgram,attributes: Array<AttributeData>) {
  attributes.forEach((v)=>{
    const attribute = gl.getAttribLocation(program,v.name);
    const positionBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, dataToArrayBuffer(v.dataType,v.data),gl.STATIC_DRAW);
    gl.enableVertexAttribArray(attribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  })
}

export function setUniforms(gl:WebGLRenderingContext,program : WebGLProgram,uniforms: Array<UniformData>) {
  uniforms.forEach(v=>{
    const uniform = gl.getUniformLocation(program,v.name);
    if(uniform) {
      setUniformData(gl,uniform,v.type,v.data);
    }
  });
}

export function drawArrays(gl:WebGLRenderingContext,data:DrawArrayData) {
  gl.drawArrays(data.primitiveType,data.offset,data.count);
}