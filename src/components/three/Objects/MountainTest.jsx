import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';

export default function Mountain({...props}){
    
    const { scene } = useGLTF('/models/Mountains/3d6af04513024a6d8be80c989c33aa73_Textured.gltf');
    
    return (
        <primitive object={scene}  {...props} />
    );
}