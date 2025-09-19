import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

import Scene   from "@/components/three/Scene";

function App() {

	return (
		<section className="h-screen w-full bg-black text-white">
			<Canvas camera={{ position: [0, 4, 6]} } shadows>
				<Suspense fallback={null} >
					<Scene />
					<OrbitControls />
				</Suspense>
			</Canvas>
		</section>
	)
}

export default App
