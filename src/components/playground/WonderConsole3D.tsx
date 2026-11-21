import { Float, RoundedBox } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Component, Suspense, useRef, type ReactNode } from 'react'
import type { Group, Mesh } from 'three'

export type ConsoleState = 'idle' | 'processing' | 'result'

function ResultObject({ variant, reduceMotion }: { variant: number; reduceMotion: boolean }) {
  const ref = useRef<Group>(null)
  useFrame((_, delta) => {
    if (ref.current && !reduceMotion) ref.current.rotation.y += delta * 0.65
  })
  return <Float speed={reduceMotion ? 0 : 2} rotationIntensity={reduceMotion ? 0 : .6} floatIntensity={reduceMotion ? 0 : .7}>
    <group ref={ref} position={[1.25, 1.4, 0]} scale={.62}>
      {variant % 3 === 0 && <mesh><icosahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#d9ff43" roughness={.25} metalness={.2} /></mesh>}
      {variant % 3 === 1 && <mesh><torusKnotGeometry args={[.7, .22, 90, 12]} /><meshStandardMaterial color="#c6d287" roughness={.3} /></mesh>}
      {variant % 3 === 2 && <mesh><octahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#eeeeea" roughness={.35} /></mesh>}
    </group>
  </Float>
}

function Machine({ state, resultIndex, reduceMotion }: { state: ConsoleState; resultIndex: number; reduceMotion: boolean }) {
  const light = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    if (light.current && state === 'processing' && !reduceMotion) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 9) * .16
      light.current.scale.setScalar(pulse)
    }
  })
  return <group rotation={[.08, -.2, 0]} position={[0, -.25, 0]}>
    <RoundedBox args={[4.5, .7, 2.6]} radius={.18} smoothness={3} position={[0, 0, 0]}><meshStandardMaterial color="#7e8175" roughness={.75} /></RoundedBox>
    <RoundedBox args={[4, .16, 2.15]} radius={.1} smoothness={2} position={[0, .42, 0]}><meshStandardMaterial color="#b7b7ad" roughness={.8} /></RoundedBox>
    <RoundedBox args={[1.55, .12, .75]} radius={.06} position={[-.9, .55, -.35]}><meshStandardMaterial color="#22261d" roughness={.45} /></RoundedBox>
    <mesh ref={light} position={[-1.25, .67, -.35]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[.1, 24]} /><meshStandardMaterial color={state === 'idle' ? '#77806a' : '#d9ff43'} emissive={state === 'idle' ? '#000000' : '#d9ff43'} emissiveIntensity={2} /></mesh>
    <mesh position={[.72, .72, .28]}><cylinderGeometry args={[.46, .52, .35, 32]} /><meshStandardMaterial color="#2b2d29" metalness={.35} roughness={.4} /></mesh>
    <mesh position={[.72, .93, .28]}><cylinderGeometry args={[.08, .08, .12, 20]} /><meshStandardMaterial color="#deded6" /></mesh>
    <mesh position={[-.82, .74, .55]}><cylinderGeometry args={[.4, .47, .38, 32]} /><meshStandardMaterial color={state === 'processing' ? '#e7ff86' : '#d9ff43'} roughness={.3} emissive={state === 'processing' ? '#d9ff43' : '#000000'} emissiveIntensity={.8} /></mesh>
    {state === 'result' && <ResultObject variant={resultIndex} reduceMotion={reduceMotion} />}
    {state === 'processing' && <group position={[1.25, 1.1, 0]}>{[0, 1, 2].map((i) => <mesh key={i} position={[(i - 1) * .42, Math.sin(i) * .14, 0]}><sphereGeometry args={[.09, 12, 12]} /><meshStandardMaterial color="#d9ff43" emissive="#d9ff43" emissiveIntensity={1.2} /></mesh>)}</group>}
  </group>
}

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

export function WonderConsole3D(props: { state: ConsoleState; resultIndex: number; reduceMotion: boolean; fallback: ReactNode }) {
  return <SceneBoundary fallback={props.fallback}><Canvas camera={{ position: [5.1, 4, 6.5], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} aria-label="Interactive 3D Wonder Console">
    <ambientLight intensity={1.8} /><directionalLight position={[4, 7, 5]} intensity={3.2} /><pointLight position={[-4, 2, 1]} color="#d9ff43" intensity={props.state === 'processing' ? 5 : 1.5} />
    <Suspense fallback={null}><Machine state={props.state} resultIndex={props.resultIndex} reduceMotion={props.reduceMotion} /></Suspense>
  </Canvas></SceneBoundary>
}
