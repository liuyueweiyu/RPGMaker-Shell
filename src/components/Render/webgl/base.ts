import { Shader } from "./shaders/interface";
import { WebGLData } from './drawData';
import { setUniformData } from './utils';
import { Uniform } from "./program";
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

export function createTexture(gl:WebGLRenderingContext,image :HTMLImageElement) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D,texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  // Upload the image into the texture.
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  return texture;
}




export function setUniformDataWithConfig(gl:WebGLRenderingContext,data:Array<WebGLData>,config:Map<string,Uniform>) {
  data.forEach(v=>{
    const uniform = config.get(v.name);
    if(uniform){
      setUniformData(gl,uniform.entity,uniform.type,v.data);
    }
  })
}

// export function setAttributeDataWithConfig(gl:WebGLRenderingContext,data:Array<WebGLData>,config:Map<string,Attribute>) {
//   data.forEach(v=>{
//     const attribute = config.get(v.name)
//     if(attribute) {
//       const buffer = dataToArrayBuffer(attribute.type, v.data);
//       if(attribute.type !== 'image') {
//         gl.bufferData(gl.ARRAY_BUFFER, buffer ,gl.STATIC_DRAW);
//       } else {
//         createTexture(gl,v.data as HTMLImageElement);
//       }
//     }
//   })
// }