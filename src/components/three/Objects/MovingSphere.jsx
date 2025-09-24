import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, useScroll, useTexture } from "@react-three/drei"
import * as THREE from "three"

export default function MovingSphere() {
  const meshRef = useRef()
  const scroll = useScroll()

  // Define path
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(10, 45, 85), // start
    new THREE.Vector3(12, 30, 80),
    new THREE.Vector3(8, 10, 75),
    new THREE.Vector3(5, 3, 70),
    new THREE.Vector3(-5, 4, 65), // hive
    new THREE.Vector3(-5, 3, 60),
    new THREE.Vector3(-5, 3, 40),
    new THREE.Vector3(-8, 2, 20),
    new THREE.Vector3(-4, 3, 15),
    new THREE.Vector3(-2, 2, 10),
    new THREE.Vector3(-1, 5, 3),
    new THREE.Vector3(0, 5, -2), // end
  ])


  useFrame(() => {
    if (!meshRef.current) return
    const t = scroll.offset // 0 → 1
    const pos = curve.getPoint(t)
    meshRef.current.position.lerp(pos, 0.08) // smooth follow
  })

  return (
    <group ref={meshRef} position={[10, 45, 85]}>
      <Sphere args={[0.3, 64, 64]}>
        <meshStandardMaterial
          emissive={"#FF5500"}
          emissiveIntensity={2}
          roughness={1}
          metalness={0} 
          color={"#ffffff"}
        />
      </Sphere>
      <pointLight position={[0, 0, 0]}  intensity={20} color={"#FF5500"} castShadow/>
    </group>
  )
}