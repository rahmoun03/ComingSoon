import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

function Flag({
    position,
    scale,
    rotation
}) {
    const flagRef = useRef();
    const {scene , animations } = useGLTF('/models/morocco_flag.glb');
    const {mixer, actions} = useAnimations(animations, flagRef);

    useEffect(() => {
        if(animations && animations.length)
        {
            console.log('animation for flag: ', animations);
            actions[animations[0].name].play()
        }
    }, [animations]);

    return (
        <group ref={flagRef} position={position} scale={scale} rotation={rotation} >
            <primitive object={scene} />
        </group>
    );
}

export default Flag;
