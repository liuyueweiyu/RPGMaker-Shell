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

export function dataToArrayBuffer(type:string, data:Array<any>) {
  switch (type) {
    case 'Float32Array':
      return new Float32Array(data);      
    default:
      break;
  }
  return new ArrayBuffer(0);
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