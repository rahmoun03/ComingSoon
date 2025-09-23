import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from 'three';
import { useEffect } from "react";

export default function Zellij({...props}){
    const { scene, materials } = useGLTF('/models/Zellij/def519ee7079417c82130738dfa5aa4c_Textured.gltf');

    const baseColor = useTexture('/models/Zellij/32e78e3641c340029e12960038e89690_RGB_M_Zellij_T_1-1.jpeg');
    const roughness = useTexture('/models/Zellij/c7d70088e5fe451392340c159bf03f4e_R_Clay001_2K_Roughness.png');
    const normal = useTexture('/models/Zellij/a6a9be75ecd14f7a89c5c40ba8477fac_N_Clay001_2K_Normal.png');
    // const ao = useTexture('/models/Zellij/419b74f0418649fb862d7f53e29fe981_RGB_Clay001_2K_AO.png');
    // const metallic = useTexture('/models/Zellij/419b74f0418649fb862d7f53e29fe981_RGB_Clay001_2K_Metallic.png');

    // materials['Material'].map = baseColor;
    // materials['Material'].roughnessMap = roughness;
    // materials['Material'].normalMap = normal;
    // materials['Material'].aoMap = ao;
    // materials['Material'].metalnessMap = metallic;


    const myMaterial = new THREE.MeshPhysicalMaterial({
        map: baseColor,
        roughnessMap: roughness,
        normalMap: normal,
        // aoMap: ao,
        // metalnessMap: metallic,
    })

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material = myMaterial;
            }
        })
    }, [scene, myMaterial])

    return (
        <primitive object={scene} {...props} />
    );
}