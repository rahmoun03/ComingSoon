import { useRef, useEffect } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import * as THREE from "three"

export default function Camera() {
  const cameraRef = useRef()
  const { set, size } = useThree()
  const scroll = useScroll()

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 2, -4),   // start
    new THREE.Vector3(-6.0, 0.8, -3),
    new THREE.Vector3(-6.5, 0.5, -2),
    new THREE.Vector3(-6.5, 0.5, -1),
    new THREE.Vector3(4, 1, 2),
    new THREE.Vector3(1, 3, 5),
    new THREE.Vector3(0, 40, 70),  // end
  ])

  useEffect(() => {
    const cam = new THREE.PerspectiveCamera(
      60,
      size.width / size.height,
      0.1,
      1000
    )
    cam.position.copy(curve.getPoint(0)) // start position
    cameraRef.current = cam
    set({ camera: cam })
  }, [set, size])

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.aspect = size.width / size.height
      cameraRef.current.updateProjectionMatrix()
    }
  }, [size])

  useFrame(() => {
    if (!cameraRef.current) return

    const t = scroll.offset
    const targetPos = curve.getPoint(t)

    cameraRef.current.position.lerp(targetPos, 0.08)
    const lookAtPoint = new THREE.Vector3(0, 3, -10);
    cameraRef.current.lookAt(lookAtPoint)
  })

  return null
}
