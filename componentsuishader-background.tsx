// components/ui/shader-background.tsx
// (Updated with oscilloscope sound-wave style for Next.js/React integration)

"use client";
import React, { useEffect, useRef } from 'react';

const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const vsSource = `
    attribute vec4 aVertexPosition;
    void main() {
      gl_Position = aVertexPosition;
    }
  `;

  const fsSource = `
    precision highp float;
    uniform vec2 iResolution;
    uniform float iTime;

    void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        vec2 p = uv * 2.0 - 1.0; 
        
        float time = iTime * 0.5;
        vec3 color = vec3(0.0);
        
        for(float i = 0.0; i < 4.0; i++) {
            float freq = 2.0 + i * 1.5;
            float amp = 0.2 + sin(time + i) * 0.1;
            
            float j = p.x + sin(time * 2.0 + p.y * 5.0) * 0.1;
            float wave = sin(j * freq + time * (1.0 + i * 0.5)) * amp;
            
            float thickness = 0.01 / abs(p.y - wave);
            
            vec3 c = vec3(0.2, 0.1, 0.5) * (i + 1.0);
            if (i == 3.0) c = vec3(0.8, 0.8, 1.0);
            
            color += c * thickness;
        }
        
        vec3 bg = mix(vec3(0.02, 0.02, 0.03), vec3(0.05, 0.0, 0.1), length(p));
        gl_FragColor = vec4(bg + color * 0.5, 1.0);
    }
  `;

  // ... [Standard WebGL init logic exactly matching the vanilla script.js function above] ...
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const loadShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if(!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if(!vertexShader || !fragmentShader) return;

    const shaderProgram = gl.createProgram();
    if(!shaderProgram) return;
    
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    const resUnif = gl.getUniformLocation(shaderProgram, 'iResolution');
    const timeUnif = gl.getUniformLocation(shaderProgram, 'iTime');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    let reqId: number;
    const start = Date.now();
    const render = () => {
      gl.clearColor(0,0,0,1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(shaderProgram);
      gl.uniform2f(resUnif, canvas.width, canvas.height);
      gl.uniform1f(timeUnif, (Date.now() - start) / 1000);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(posAttr);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      reqId = requestAnimationFrame(render);
    };
    render();

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(reqId); };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default ShaderBackground;
