import Shader from './interface';
const VERTEX_SHADER_COMMON_SHAPE_SOURCE = `
attribute vec2 a_Position;
uniform vec2 u_resolution;
void main() {
    vec2 resizeVec = a_Position / u_resolution;
    resizeVec = resizeVec * 2.0 - 1.0 ;
    
    gl_Position = vec4(resizeVec* vec2(1, -1),0,1);
}
`

const FRAGMENT_SHADER_COMMON_SHAPE_SOURCE = `
// 片断着色器没有默认精度，所以我们需要设置一个精度
// mediump是一个不错的默认值，代表“medium precision”（中等精度）
precision mediump float;
 
void main() {
  // gl_FragColor是一个片断着色器主要设置的变量
  gl_FragColor = vec4(1, 0, 0.5, 1); // 返回“红紫色”
}
`

export const commonShape :Shader = {
    vertexShader : VERTEX_SHADER_COMMON_SHAPE_SOURCE,
    fragmentShader : FRAGMENT_SHADER_COMMON_SHAPE_SOURCE
}