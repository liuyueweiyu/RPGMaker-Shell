import { createTexture } from './base';
import { AttributeData } from './drawData';
export function resizeCanvasToDisplaySize(canvas:HTMLCanvasElement, multiplier :number) {
    multiplier = multiplier || 1;
    const width  = canvas.clientWidth  * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width ||  canvas.height !== height) {
      canvas.width  = width;
      canvas.height = height;
      return true;
    }
    return false;
}

export function dataToArrayBuffer(type:string, data:any) {
  switch (type) {
    case 'Float32Array':
      return new Float32Array(data); 
    default:
      break;
  }
  return new ArrayBuffer(0);
}

export function setBufferData(gl:WebGLRenderingContext,v:AttributeData) {
  const buffer = dataToArrayBuffer(v.dataType, v.data);
  if(v.dataType !== 'image') {
    gl.bufferData(gl.ARRAY_BUFFER, buffer ,gl.STATIC_DRAW);
  } else {
    createTexture(gl,v.data as HTMLImageElement);
  }
}

export function setUniformData(gl:WebGLRenderingContext,uniform:WebGLUniformLocation,type:string,data:any) {
  switch (type) {
    case 'uniform2f':
      gl.uniform2f(uniform,data.x,data.y);
      break;
    default:
      break;
  }
}

export function setRectangle(x:number, y:number, width:number, height:number) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  return [
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2,
 ];
}