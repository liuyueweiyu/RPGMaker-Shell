export function init(canvas:HTMLCanvasElement) {
  // 获取webgl上下文
  const gl : WebGLRenderingContext | null = getWebGLContext(canvas);
  if (gl) {
    // 初始化着色器
    const program = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    // 初始化缓冲
    if (program) {
      const n = initBuffers(gl,program);
      // 清除背景色和颜色缓存
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      // 绘制
      gl.drawArrays(gl.POINTS, 0, n);
    }

  }

}

// 获取webgl上下文
function getWebGLContext(canvas:HTMLCanvasElement) : WebGLRenderingContext | null{
  let gl = null;
  try {
    // 如果没有webgl上下文，尝试实验版的webgl
    gl = (canvas.getContext('webgl') || canvas.getContext('exprimental-wegl')) as WebGLRenderingContext
  } catch {
    console.error("获取canvas上下文失败");
  }
  return gl;
}

// 顶点着色器
const VSHADER_SOURCE =
 `attribute vec4 a_Position;
  attribute vec4 a_Color;
  varying vec4 v_Color;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
    v_Color = a_Color;
  }`;

// 片段着色器
const FSHADER_SOURCE =
 `precision mediump float;
  varying vec4 v_Color;
  void main() {
    gl_FragColor = v_Color;
  }`;

  function initShaders(gl : WebGLRenderingContext, vshader : string, fshader : string) {
    // 分别加载顶点着色器和片段着色器
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  
    // 4.创建程序对象
    const program : WebGLProgram | null= gl.createProgram();
  
    if (program && vertexShader && fragmentShader) {
      // 5.编译过的着色器附加到程序对象中
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
    
      // 6.链接程序对象
      gl.linkProgram(program);
    
      // 7.调用程序对象
      gl.useProgram(program);
      // gl.program = program;
    }

  
    return program;
  }
  
function loadShader(gl : WebGLRenderingContext, type : number, source : string) {
  // 1.创建着色器对象
  const shader : WebGLShader | null= gl.createShader(type);

  if (shader) {
    // 2.把着色器代码载入到着色器对象
    gl.shaderSource(shader, source);
    
    // 3.编译着色器
    gl.compileShader(shader);
    
    // getShaderParameter 检查编译状态
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
      const error = gl.getShaderInfoLog(shader);
      console.log('Failed to compile shader: ' + error);
      gl.deleteShader(shader);
      return null;
    }
  }

  return shader;
}

function initBuffers(gl : WebGLRenderingContext,program :WebGLProgram) {
  // 定义顶点数据 x, y, r, g, b
  const vertices = new Float32Array([
    0.0,   0.5,   1.0,  0.0,  0.0,
    -0.5,  -0.5,  0.0,  1.0,  0.0,
    0.5,  -0.5,   0.0,  0.0,  1.0,
  ]);

  const n = 3;

  // 创建buffer对象
  const vertexBuffer = gl.createBuffer();

  // 创建buffer对象
  const FSIZE = vertices.BYTES_PER_ELEMENT;

  // 绑定buffer到缓冲对象上
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // 向缓冲对象写入数据
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // 从程序对象中获取相应属性
  const a_Position = gl.getAttribLocation(program, 'a_Position');
  const a_Color = gl.getAttribLocation(program, 'a_Color');

  // 向顶点写入缓冲数据
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);

  // 使用缓冲数据建立程序代码到着色器代码的联系
  gl.enableVertexAttribArray(a_Position);

  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
  gl.enableVertexAttribArray(a_Color);

  return n;
}