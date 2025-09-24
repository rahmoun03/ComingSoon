import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { useMemo } from "react"

export default function RockPlanet({ rockCount = 200, radius = 15 }) {
  const { scene } = useGLTF("/models/small_rock.glb")

  // Generate rock positions once
  const rocks = useMemo(() => {
    const arr = []
    for (let i = 0; i < rockCount; i++) {
      // Pick random spherical coordinates
      const theta = Math.random() * Math.PI * 2 // around y axis
      const phi = Math.acos(2 * Math.random() - 1) // latitude

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      arr.push({
        position: [x, y, z],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: 0.3 + Math.random() * 0.7,
      })
    }
    return arr
  }, [rockCount, radius])

  return (
    <group>
      {rocks.map((rock, i) => (
        <primitive
          key={i}
          object={scene.clone()}
          position={rock.position}
          rotation={rock.rotation}
          scale={rock.scale}
        />
      ))}
    </group>
  )
}
