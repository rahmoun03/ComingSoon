import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function RockPath({ rockCount = 500, spread = 10 }) {
	const { scene } = useGLTF("/models/small_rock.glb")
	const groupRef = useRef()

	// Define your path
	const curve = useMemo(
		() =>
			new THREE.CatmullRomCurve3([
				new THREE.Vector3(10, 45, 82), // start
				new THREE.Vector3(12, 30, 80),
				new THREE.Vector3(8, 10, 75),
				new THREE.Vector3(5, 3, 70),
				new THREE.Vector3(-5, 4, 65),
				new THREE.Vector3(-5, 3, 60),
				new THREE.Vector3(-5, 3, 40),
				new THREE.Vector3(-8, 2, 20),
				new THREE.Vector3(-4, 3, 15),
				new THREE.Vector3(-2, 2, 10),
				new THREE.Vector3(-1, 5, 3),
				new THREE.Vector3(0, 5, 2), // end
			]),
		[]
	)

	// Generate rocks
	const rocks = useMemo(() => {
		const arr = []
		for (let i = 0; i < rockCount; i++) {
			const t = Math.random()
			const point = curve.getPointAt(t)

			const offset = new THREE.Vector3(
				(Math.random() - 0.5) * 2 * spread,
				(Math.random() - 0.5) * 2 * spread,
				(Math.random() - 0.5) * 2 * spread
			)

			const pos = point.clone().add(offset)

			arr.push({
				position: pos.toArray(),
				rotation: [
					Math.random() * Math.PI,
					Math.random() * Math.PI,
					Math.random() * Math.PI,
				],
				scale: Math.random() * 0.7,
				float: pos.y > 3, // mark floating rocks
				speed: 0.5 + Math.random() * 1.5, // random float speed
				phase: Math.random() * Math.PI * 2, // start offset
			})
		}
		return arr
	}, [rockCount, spread, curve])

	// Floating animation
	useFrame((state) => {
		const time = state.clock.getElapsedTime()
		groupRef.current.children.forEach((child, i) => {
			const rock = rocks[i]
			if (rock.float) {
				child.position.y = rock.position[1] + Math.sin(time * rock.speed + rock.phase) * 0.3;
				child.rotation.y += 0.01;
				child.rotation.z += 0.005;
			}
		})
	})

	return (
		<group ref={groupRef}>
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
