
import { resizeCanvasToDisplaySize } from './utils';

export function main(canvas:HTMLCanvasElement) {
    const gl = (canvas.getContext('webgl') || canvas.getContext('exprimental-wegl')) as WebGLRenderingContext;
    const vertexShader = createShader(gl,gl.VERTEX_SHADER,VERTEX_SHADER_SOURCE);
    const fragmentShader = createShader(gl,gl.FRAGMENT_SHADER,FRAGMENT_SHADER_SOURCE);
    if(vertexShader && fragmentShader) {
        const program = createProgram(gl,vertexShader,fragmentShader);
        // var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        if (program) {
            const a_Position = gl.getAttribLocation(program,'a_Position');
            const u_resolution = gl.getUniformLocation(program, "u_resolution");
            const positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            const points = [
                10, 20,
                80, 20,
                10, 30,
                10, 30,
                80, 20,
                80, 30,
            ]
            gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(points),gl.STATIC_DRAW);
            resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement, 0);
            
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            // 告诉它用我们之前写好的着色程序（一个着色器对）

            

            gl.useProgram(program);
            
            gl.enableVertexAttribArray(a_Position);
            // 将绑定点绑定到缓冲数据（positionBuffer）
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            
            // 告诉属性怎么从positionBuffer中读取数据 (ARRAY_BUFFER)
            var size = 2;          // 每次迭代运行提取两个单位数据
            var type = gl.FLOAT;   // 每个单位的数据类型是32位浮点型
            var normalize = false; // 不需要归一化数据
            var stride = 0;        // 0 = 移动单位数量 * 每个单位占用内存（sizeof(type)）
                                // 每次迭代运行运动多少内存到下一个数据开始点
            var offset = 0;        // 从缓冲起始位置开始读取
            gl.vertexAttribPointer(
                a_Position, size, type, normalize, stride, offset)

            // 设置全局变量 分辨率
            gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height);
            // draw
            var primitiveType = gl.TRIANGLES;
            var count = 6;
            gl.drawArrays(primitiveType, offset, count);
        }
        
    }
}


export function renderImage(image: HTMLImageElement,canvas : HTMLCanvasElement) {
    const gl = (canvas.getContext('webgl') || canvas.getContext('exprimental-wegl')) as WebGLRenderingContext;
    const vertexShader = createShader(gl,gl.VERTEX_SHADER,VERTEX_SHADER_RENDER_SOURCE);
    const fragmentShader = createShader(gl,gl.FRAGMENT_SHADER,FRAGMENT_SHADER_RENDER_SOURCE);
    if(vertexShader && fragmentShader) {
        const program = createProgram(gl,vertexShader,fragmentShader);
        if (program) {
            var positionLocation = gl.getAttribLocation(program, "a_position");
            var texcoordLocation = gl.getAttribLocation(program, "a_texCoord");
            var positionBuffer = gl.createBuffer();

            // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            // Set a rectangle the same size as the image.
            setRectangle(gl, 0, 0, image.width, image.height);
          
            // provide texture coordinates for the rectangle.
            var texcoordBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                0.0,  0.0,
                1.0,  0.0,
                0.0,  1.0,
                0.0,  1.0,
                1.0,  0.0,
                1.0,  1.0,
            ]), gl.STATIC_DRAW);
          
            // Create a texture.
            var texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
          
            // Set the parameters so we can render any size image.
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
          
            // Upload the image into the texture.
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          
            // lookup uniforms
            var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
          
            // resizeCanvasToDisplaySize(gl.canvas);
          
            // Tell WebGL how to convert from clip space to pixels
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
          
            // Clear the canvas
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
          
            // Tell it to use our program (pair of shaders)
            gl.useProgram(program);
          
            // Turn on the position attribute
            gl.enableVertexAttribArray(positionLocation);
          
            // Bind the position buffer.
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
          
            // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
            var size = 2;          // 2 components per iteration
            var type = gl.FLOAT;   // the data is 32bit floats
            var normalize = false; // don't normalize the data
            var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
            var offset = 0;        // start at the beginning of the buffer
            gl.vertexAttribPointer(
                positionLocation, size, type, normalize, stride, offset);
          
            // Turn on the teccord attribute
            gl.enableVertexAttribArray(texcoordLocation);
          
            // Bind the position buffer.
            gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
          
            // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
            var size = 2;          // 2 components per iteration
            var type = gl.FLOAT;   // the data is 32bit floats
            var normalize = false; // don't normalize the data
            var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
            var offset = 0;        // start at the beginning of the buffer
            gl.vertexAttribPointer(
                texcoordLocation, size, type, normalize, stride, offset);
          
            // set the resolution
            gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
          
            // Draw the rectangle.
            var primitiveType = gl.TRIANGLES;
            var offset = 0;
            var count = 6;
            gl.drawArrays(primitiveType, offset, count);
        }
    }
}

const VERTEX_SHADER_RENDER_SOURCE = `
attribute vec2 a_position;
attribute vec2 a_texCoord;

uniform vec2 u_resolution;

varying vec2 v_texCoord;

void main() {
   // convert the rectangle from pixels to 0.0 to 1.0
   vec2 zeroToOne = a_position / u_resolution;

   // convert from 0->1 to 0->2
   vec2 zeroToTwo = zeroToOne * 2.0;

   // convert from 0->2 to -1->+1 (clipspace)
   vec2 clipSpace = zeroToTwo - 1.0;

   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

   // pass the texCoord to the fragment shader
   // The GPU will interpolate this value between points.
   v_texCoord = a_texCoord;
}
`;

const FRAGMENT_SHADER_RENDER_SOURCE = `
precision mediump float;

// our texture
uniform sampler2D u_image;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

void main() {
   gl_FragColor = texture2D(u_image, v_texCoord);
}
`;

const  VERTEX_SHADER_SOURCE = `
attribute vec2 a_Position;
uniform vec2 u_resolution;
void main() {
    vec2 resizeVec = a_Position / u_resolution;
    resizeVec = resizeVec * 2.0 - 1.0 ;
    
    gl_Position = vec4(resizeVec* vec2(1, -1),0,1);
}
`
const FRAGMENT_SHADER_SOURCE = `
// 片断着色器没有默认精度，所以我们需要设置一个精度
// mediump是一个不错的默认值，代表“medium precision”（中等精度）
precision mediump float;
 
void main() {
  // gl_FragColor是一个片断着色器主要设置的变量
  gl_FragColor = vec4(1, 0, 0.5, 1); // 返回“红紫色”
}`


function createProgram(gl:WebGLRenderingContext,vertexShader : WebGLShader,fragmentShader:WebGLShader) {
    const program = gl.createProgram();
    if(program) {
        gl.attachShader(program,vertexShader);
        gl.attachShader(program,fragmentShader);
        gl.linkProgram(program);
        if(gl.getProgramParameter(program,gl.LINK_STATUS)){
            return program;
        }
        console.error(gl.getProgramInfoLog(program))
    }
    gl.deleteProgram(program);
    return null;
}

function createShader(gl: WebGLRenderingContext, type : number, source : string) {
    const shader = gl.createShader(type);
    if ( shader) {
        gl.shaderSource(shader,source);
        gl.compileShader(shader);
        if(gl.getShaderParameter(shader,gl.COMPILE_STATUS)) {
            return shader;
        }
        console.error(gl.getShaderInfoLog(shader))
    }
    gl.deleteShader(shader);
    return null;
}

function setRectangle(gl:WebGLRenderingContext, x:number, y:number, width:number, height:number) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
       x1, y1,
       x2, y1,
       x1, y2,
       x1, y2,
       x2, y1,
       x2, y2,
    ]), gl.STATIC_DRAW);
  }