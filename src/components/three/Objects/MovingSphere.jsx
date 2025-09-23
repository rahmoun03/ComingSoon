import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, useScroll } from "@react-three/drei"
import * as THREE from "three"

export default function MovingSphere() {
  const meshRef = useRef()
  const scroll = useScroll()

  // Define path
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(10, 45, 85),
    new THREE.Vector3(8, 30, 80),
    new THREE.Vector3(8, 10, 75),
    new THREE.Vector3(5, 4, 70),
    new THREE.Vector3(-5, 5, 65),
    new THREE.Vector3(-5, 3, 60),
    new THREE.Vector3(-5, 3, 40),
    new THREE.Vector3(-8, 2, 20),
    new THREE.Vector3(-4, 3, 15),
    new THREE.Vector3(-2, 2, 10),
    new THREE.Vector3(-1, 5, 3),
    new THREE.Vector3(0, 5, -2),
  ])

  useFrame(() => {
    if (!meshRef.current) return
    const t = scroll.offset // 0 → 1
    const pos = curve.getPoint(t)
    meshRef.current.position.lerp(pos, 0.08) // smooth follow
  })

  return (
    <group ref={meshRef} >
      <Sphere args={[0.3, 64, 64]}>
        <meshStandardMaterial
          emissive={"#ff0080"}
          emissiveIntensity={2}
          color={"#ffffff"}
          />
      </Sphere>
      <pointLight position={[0, 0, 0]}  intensity={20} color={"#ff0080"} castShadow/>
    </group>
  )
}