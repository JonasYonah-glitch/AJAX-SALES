"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"
import { MotionValue } from "framer-motion"

const vert = `
varying vec2 vUv;
varying vec3 vNormal;
void main() {
  vNormal = normal;
  vUv = uv;
  // Pula a câmera para renderizar um painel perfeito que enche o canvas
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const frag = `
#define NUM_OCTAVES 5
uniform vec2 resolution;
uniform vec3 color1;
uniform vec3 color0;
uniform float time;
uniform float uProgress;
varying vec2 vUv;
varying vec3 vNormal;

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u*u*(3.0-2.0*u);

  float res = mix(
    mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
    mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
  return res*res;
}

float fbm(vec2 x) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
  for (int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * noise(x);
    x = rot * x * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

vec3 rgbcol(float r, float g, float b) {
  return vec3(r/255.0,g/255.0,b/255.0);
}

float setOpacity(float r, float g, float b) {
  float tone = (r + g + b) / 3.0;
  // Em vez de corte seco (0.99), fazemos um fade suave que valoriza o Bloom
  return smoothstep(0.3, 0.8, tone);
}

void main() {
  // Map vUv (0 to 1) directly
  vec2 uv = vUv;
  
  // Fogo fica progressivamente agressivo na rolagem
  vec2 newUv = uv + vec2(0.0, -time * (0.3 + uProgress * 0.4));
  
  // Ao diminuir a Scale conforme a altura do fogo avança, as veias de fogo rasgam com chamas brutalmente grossas e maiores
  float scale = 4.0 - (uProgress * 1.8);
  vec2 p = newUv * scale;
  float noiseVal = fbm(p + fbm(p));

  // The user FBM calculates front and back colors
  vec4 backColor = vec4(1.0 - uv.y) + vec4(vec3(noiseVal * (1.1 - uv.y)), 1.0);
  float aback = setOpacity(backColor.r, backColor.g, backColor.b);
  backColor.a = aback;
  backColor.rgb = rgbcol(color1.r, color1.g, color1.b);

  vec4 frontColor = vec4(1.2 - uv.y) + vec4(vec3(noiseVal * (1.1 - uv.y)), 1.0);
  float afront = setOpacity(frontColor.r, frontColor.g, frontColor.b);
  frontColor.a = afront;
  frontColor.rgb = rgbcol(color0.r, color0.g, color0.b);

  frontColor.a -= backColor.a;

  vec4 finalColor;
  if (frontColor.a > 0.0) {
    finalColor = frontColor;
  } else {
    finalColor = backColor;
  }

  // Máscara controlando de baixo para cima baseado no uProgress
  // Aplicamos mais margem pra ter certeza que engole o layout até o teto
  float fireHeight = uProgress * 3.0; 
  float mask = smoothstep(uv.y - 0.7, uv.y + 0.2, fireHeight);
  
  float startMask = smoothstep(0.0, 0.05, uProgress);

  finalColor.a *= mask * startMask;
  finalColor.rgb *= finalColor.a; // Pré-multiplicação

  gl_FragColor = finalColor;
}
`;

const FireMaterial = ({ fireProgress }: { fireProgress: MotionValue<number> }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      time: { value: 0.0 },
      resolution: { value: new THREE.Vector2() },
      color0: { value: new THREE.Vector3(255, 30, 0) }, // Extremidade vermelha/borda
      color1: { value: new THREE.Vector3(255, 120, 0) }, // Centro amarelado/laranja
      uProgress: { value: 0.0 },
    }),
    []
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta;
      // Obter o valor calculado real do framer motion e mapear para a uniform
      materialRef.current.uniforms.uProgress.value = fireProgress.get();
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vert}
      fragmentShader={frag}
      uniforms={uniforms}
      transparent={true}
      blending={THREE.NormalBlending}
      depthWrite={false}
    />
  );
};

export function FireShader({ fireProgress }: { fireProgress: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none rounded-[inherit] overflow-hidden opacity-90 h-full w-full mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ alpha: true }}>
        <mesh>
          <planeGeometry args={[2, 2]} />
          <FireMaterial fireProgress={fireProgress} />
        </mesh>

        <EffectComposer disableNormalPass>
          <Bloom
            luminanceThreshold={0.0}
            luminanceSmoothing={0.4}
            intensity={2.8} // Intensidade forte de brasa como solicitado
            radius={0.8}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
