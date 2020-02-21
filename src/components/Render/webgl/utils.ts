import { createTexture } from './base';
import { AttributeData, ViewData } from './drawData';
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
    case 'uniform4f':
      gl.uniform4f(uniform,data.x,data.y,data.z,data.w);
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

export function getBorderPoint(v:ViewData,w:number,h:number) {
    const border = v.style.borderSize;
    const arr = [];
    if(border) {
      if(border.top !== 0) {
        arr.push(...getQuadrilateralPoint(
          v.x,v.y,
          v.x+border.left,v.y+border.top,
          v.x+w,v.y,
          v.x+w-border.right,v.y+border.top
        ));
      }
      if(border.left !== 0) {
        arr.push(...getQuadrilateralPoint(
          v.x,v.y,
          v.x+border.left,v.y+border.top,
          v.x,v.y+h,
          v.x+border.left,v.y+h-border.bottom
        ));
      }
      if(border.right !== 0) {
        arr.push(...getQuadrilateralPoint(
          v.x + w,v.y,
          v.x+w-border.right,v.y+border.top,
          v.x + w,v.y + h,
          v.x+w-border.right,v.y+h -border.bottom
        ))
      }
      if(border.bottom !== 0) {
        arr.push(...getQuadrilateralPoint(
          v.x,v.y+h,
          v.x+border.left,v.y+h-border.bottom,
          v.x + w,v.y + h,
          v.x+w-border.right,v.y+h - border.bottom
        ))
      }
    }
    return arr;
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

export function RGBA256toWebglColor(colors:Array<number>) {
  return {
    x : (colors[0] || 0) / 256,
    y : (colors[1] || 1) / 256,
    z : (colors[2] || 2) / 256,
    w : (colors[3] === undefined ? 1 : colors[3])
  }
}

export function ColorToArray(color :Color) {
  return [
    color.r,
    color.g,
    color.b,
    color.a
  ]
}