import { PointLight, SpotLight } from "@react-three/drei";

function Lights() {
    return (
        <>
            {/* <directionalLight  position={[0, 5, 5]} intensity={0.5} castShadow /> */}
            <PointLight position={[0, 10, 0]}  intensity={400} angle={0.75} penumbra={1}  castShadow/>
            <SpotLight position={[0, 20, 0]}  intensity={600} angle={0.25} penumbra={1}  castShadow/>

            {/* <ambientLight intensity={0.1} /> */}
        </>
    )
}

export default Lights;