import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three';


function Flag({
	position,
	scale,
	rotation
}) {
	const flagRef = useRef();
	const {scene , animations, materials, nodes } = useGLTF('/models/morocco_flag.glb');
	const {mixer, actions} = useAnimations(animations, flagRef);

	useEffect(() => {
		if(animations && animations.length)
		{
			console.log('animation for flag: ', animations);
			actions[animations[0].name].play()
		}
		if (scene) {
			console.log('scene for flag: ', scene);
			console.log('materials for flag: ', materials);
			console.log('nodes for flag: ', nodes);
			materials['flag'].color = new THREE.Color('#FFF');
		}
	}, [animations]);

	useFrame(({ camera }) => {
		flagRef.current.children.forEach((child) => {
			const dist = camera.position.distanceTo(child.position)
			child.visible = dist < 50 // hide if further than 100 units
		})
	})
	  

	return (
		<group ref={flagRef} position={position} scale={scale} rotation={rotation} >
			<primitive object={scene} material={materials['flag']} />
		</group>
	);
}

export default Flag;
