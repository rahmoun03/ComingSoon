import { Canvas } from "@react-three/fiber";
import { ScrollControls, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

import Scene   from "@/components/three/Scene";

function App() {

	return (
		<section className="h-screen w-full bg-black text-white">
			<Canvas camera={{ position: [0, 2, -4]} } shadows>
				<Suspense fallback={null} >
					<ScrollControls pages={6} damping={0.2}>
						<Scene />
						{/* <OrbitControls /> */}
					</ScrollControls>
				</Suspense>
			</Canvas>
		</section>
	)
}

export default App
