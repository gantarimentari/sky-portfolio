import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { Group, Mesh } from 'three'
import { Suspense, useRef } from 'react'
import type { MotionValue } from 'motion/react'

interface SculptureSceneProps {
  progress: MotionValue<number>
  paused: boolean
  dragVelocity: React.MutableRefObject<{ x: number; y: number }>
  pointerTarget: React.MutableRefObject<{ x: number; y: number }>
  isDragging: React.MutableRefObject<boolean>
}

function KineticSculpture({
  progress,
  paused,
  dragVelocity,
  pointerTarget,
  isDragging,
}: SculptureSceneProps) {
  const mainGroup = useRef<Group>(null)
  const sculpture = useRef<Mesh>(null)
  const haloOne = useRef<Mesh>(null)
  const haloTwo = useRef<Mesh>(null)
  const orb = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!mainGroup.current || paused) return

    // Scroll parallax displacement
    const p = progress.get()
    mainGroup.current.position.y = -p * 0.45
    mainGroup.current.position.z = p * 0.25

    // Apply fluid drag inertia with gentle damping
    mainGroup.current.rotation.y += dragVelocity.current.y
    mainGroup.current.rotation.x += dragVelocity.current.x
    dragVelocity.current.x *= 0.94
    dragVelocity.current.y *= 0.94

    // Ethereal idle breathing motion
    if (sculpture.current) {
      sculpture.current.rotation.y += delta * 0.16
      sculpture.current.rotation.x += delta * 0.08
    }

    if (haloOne.current) {
      haloOne.current.rotation.z += delta * 0.12
      haloOne.current.rotation.x -= delta * 0.06
    }

    if (haloTwo.current) {
      haloTwo.current.rotation.z -= delta * 0.09
      haloTwo.current.rotation.y += delta * 0.08
    }

    if (orb.current) {
      orb.current.position.y = Math.sin(_.clock.elapsedTime * 1.5) * 0.15
    }

    // Soft, spring-like cursor tilt when idle
    if (!isDragging.current) {
      mainGroup.current.rotation.x += (pointerTarget.current.y * 0.45 - mainGroup.current.rotation.x) * 0.035
      mainGroup.current.rotation.z += (-pointerTarget.current.x * 0.35 - mainGroup.current.rotation.z) * 0.035
    }
  })

  return (
    <>
      {/* Studio Lighting Setup: Luminous, Multi-angle highlights */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 8, 5]} intensity={2.4} color="#fffcf5" />
      <pointLight position={[-5, -3, 3]} intensity={45} color="#d7ff45" distance={15} />
      <pointLight position={[4, -4, -2]} intensity={32} color="#ff7b6e" distance={14} />
      <pointLight position={[0, 5, -4]} intensity={28} color="#9ec5fe" distance={16} />

      {/* Floating Ethereal Dust */}
      <Sparkles count={45} scale={7} size={2.2} speed={0.25} opacity={0.45} color="#f5e8d3" />
      <Sparkles count={20} scale={5} size={3} speed={0.4} opacity={0.6} color="#d7ff45" />

      <Float speed={paused ? 0 : 1.6} rotationIntensity={0.25} floatIntensity={0.35}>
        <group ref={mainGroup} position={[0, 0, 0]}>
          {/* Main Organic Kinetic Sculpture */}
          <mesh ref={sculpture}>
            <torusKnotGeometry args={[1.28, 0.38, 220, 32, 2, 3]} />
            <meshPhysicalMaterial
              color="#e6e1d5"
              emissive="#0d2624"
              emissiveIntensity={0.25}
              roughness={0.14}
              metalness={0.88}
              clearcoat={1.0}
              clearcoatRoughness={0.08}
              reflectivity={0.95}
            />
          </mesh>

          {/* Delicate Outer Halo 1 */}
          <mesh ref={haloOne} rotation={[1.15, 0.4, 0.2]}>
            <torusGeometry args={[2.25, 0.012, 16, 140]} />
            <meshStandardMaterial color="#d7ff45" roughness={0.25} metalness={0.8} />
          </mesh>

          {/* Delicate Outer Halo 2 */}
          <mesh ref={haloTwo} rotation={[-0.85, 0.55, -0.3]}>
            <torusGeometry args={[2.55, 0.009, 16, 140]} />
            <meshStandardMaterial color="#f5e8d3" roughness={0.3} metalness={0.7} transparent opacity={0.65} />
          </mesh>

          {/* Floating Focal Satellite Light */}
          <mesh ref={orb} position={[1.9, 0.8, 0.2]}>
            <sphereGeometry args={[0.07, 24, 24]} />
            <meshBasicMaterial color="#d7ff45" />
          </mesh>
        </group>
      </Float>
    </>
  )
}

export default function HeroEclipse({
  progress,
  paused = false,
}: {
  progress: MotionValue<number>
  paused?: boolean
}) {
  const dragVelocity = useRef({ x: 0, y: 0 })
  const pointerTarget = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const lastPointer = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    lastPointer.current = { x: e.clientX, y: e.clientY }
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) {
      const dx = e.clientX - lastPointer.current.x
      const dy = e.clientY - lastPointer.current.y
      dragVelocity.current.y += dx * 0.0045
      dragVelocity.current.x += dy * 0.0045
      lastPointer.current = { x: e.clientX, y: e.clientY }
    } else if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const relX = (e.clientX - rect.left) / rect.width - 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5
      pointerTarget.current = { x: relX, y: relY }
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false
    try {
      ;(e.target as HTMLElement).releasePointerCapture?.(e.pointerId)
    } catch {
      // ignore
    }
  }

  return (
    <div
      ref={containerRef}
      className="hero-sculpture-stage"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      aria-label="Interactive 3D kinetic sculpture"
    >
      <Canvas
        className="hero-sculpture-canvas"
        camera={{ position: [0, 0, 5.4], fov: 44 }}
        dpr={[1, 1.5]}
        frameloop={paused ? 'demand' : 'always'}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <KineticSculpture
            progress={progress}
            paused={paused}
            dragVelocity={dragVelocity}
            pointerTarget={pointerTarget}
            isDragging={isDragging}
          />
        </Suspense>
      </Canvas>

      {/* Understated tactile caption for natural discovery */}
      <div className="sculpture-subtle-hint">
        <span className="hint-pill">
          <i className="hint-dot" />
          <span>Interactive kinetic form · Drag to rotate</span>
        </span>
      </div>
    </div>
  )
}
