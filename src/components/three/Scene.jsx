import { Stars } from '@react-three/drei';
import * as THREE from 'three';

import Lights from "./Lights";
import Mountain from "./Objects/Mountain";
import Astronaut from "./Objects/Astronaut";
import Flag from './Objects/Flag';
import ThreeText3D from './Objects/ThreeText3D';


function Ground () {

	console.log('ground called !!');
	
	return (
		<group rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
			<planeGeometry args={[100, 100]} />
			<meshStandardMaterial
				color={new THREE.Color('#FFF')} 
			/>
		</group>
	)
}


function Scene() {

	const mountainProps = [
		{ position: [0, -1.4, 0], scale: 0.05, rotation: [0, 0, 0] },
		{ position: [80, -1.4, 0], scale: 0.05, rotation: [0, 0, 0] },
		{ position: [0, -1.4, -80], scale: 0.05, rotation: [0, 0, 0] },
		{ position: [80, -1.4, -80], scale: 0.05	, rotation: [0, 0, 0] },
	]

	const textOptions = {
		fontSize: 3,
		fontColor: 'white',
		fillMaterial: 'meshNormalMaterial',
		bevelEnabled: true,
		bevelThickness: 0.1,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 1,
	}

	return (
		<>
			<Lights />
			<Astronaut
				url={'/models/astronaut/source/Astronaut.glb'}
				initialAnimation="wave"
				position={[2, 0, -1]}
			/>
			<ThreeText3D text="COMINGSOON" fontUrl="/fonts/Inter_Bold.json" />
			<Flag position={[0, 2, -10]} scale={[2, 2, 2]} rotation={[0, 0, 0]}/>

			{/* <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade /> */}

			{mountainProps.map((props, index) => (
				<Mountain key={index} url={'/models/Mountain/f145306e65ac4498aa86db35231d7bf8_Textured.gltf'} {...props} />
			))}
			{/* <Ground /> */}

			
		</>
	)
}

export default Scene;
