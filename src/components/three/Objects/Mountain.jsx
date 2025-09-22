import { clone } from 'three/examples/jsm/utils/SkeletonUtils'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useRef, useMemo } from 'react'
import { useLoader } from '@react-three/fiber'

function Mountain({
    url,
    scale = 1,
    position = [0, -2, 0],
    rotation = [0, 0, 0],
    ...props
}) {
    const group = useRef()
    const gltf = useLoader(GLTFLoader, url)

    const clonedScene = useMemo(() => clone(gltf.scene), [gltf.scene])

    return (
        <group
            ref={group}
            scale={scale}
            position={position}
            rotation={rotation}
            {...props}
        >
            <primitive object={clonedScene} />
        </group>
    )
}

export default Mountain;