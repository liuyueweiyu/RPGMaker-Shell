import { ViewData } from './drawData';
import { Color } from '../state/data/style/color';
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


// export function setBufferData(gl:WebGLRenderingContext,v:AttributeData) {
//   const buffer = dataToArrayBuffer(v.dataType, v.data);
//   if(v.dataType !== 'image') {
//     gl.bufferData(gl.ARRAY_BUFFER, buffer ,gl.STATIC_DRAW);
//   } else {
//     createTexture(gl,v.data as HTMLImageElement);
//   }
// }

export function setUniformData(gl:WebGLRenderingContext,uniform:WebGLUniformLocation,type:string,data:any) {
  switch (type) {
    case 'uniform2f':
      gl.uniform2f(uniform,data.x,data.y);
      break;
    case 'uniform4f':
      gl.uniform4f(uniform,data.x,data.y,data.z,data.w);
      break;
    default:
      break;
  }
}

export function getRectangle(x:number, y:number, width:number, height:number) {
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

export function getQuadrilateralPoint(x1:number,y1:number,x2:number,y2:number,x3:number,y3:number,x4:number,y4:number){
    return [
      x1,y1,
      x2,y2,
      x3,y3,
      x2,y2,
      x3,y3,
      x4,y4
    ]
}

export function ColorToWebglColor(color:Color) {
  return {
    x : (color.r || 0) / 256,
    y : (color.g || 1) / 256,
    z : (color.b || 2) / 256,
    w : (color.a === undefined ? 1 : color.a)
  }
}