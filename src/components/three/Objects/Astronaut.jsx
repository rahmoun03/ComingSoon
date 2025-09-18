import { useRef, useEffect } from "react";
import { useLoader, useAnimations } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Astronaut({
	url,
	scale = 1,
	position = [0, 0, 0],
	rotation = [0, 0, 0],
	initialAnimation,
	playOnLoad = true,
	...props
	}) {
	const group = useRef();
	const { scene, animations } = useLoader(GLTFLoader, url);
	const { actions } = useAnimations(animations, group);
	const [currentAnimation, setCurrentAnimation] = useRef(null);

	useEffect(() => {
		if (animations && animations.length) {
			if (initialAnimation) {
				setCurrentAnimation(initialAnimation);
			} else if (animations.length > 0) {
				setCurrentAnimation(animations[0]);
			}
		}
	}, [animations, initialAnimation]);

	useEffect(() => {
		if (currentAnimation && actions[currentAnimation]) {
			if (playOnLoad) {
				actions[currentAnimation].play();
			}
		}

		return () => {
			if (currentAnimation && actions[currentAnimation]) {
				actions[currentAnimation].stop();
			}
		};
	}, [currentAnimation, actions, playOnLoad]);

	return (
		<group ref={group} scale={scale} position={position} rotation={rotation} {...props}>
			<primitive object={scene} />
		</group>
	);
}

export default Astronaut;