import { Canvas } from "@react-three/fiber";
import { ScrollControls, useProgress, OrbitControls } from "@react-three/drei";
import { useEffect, Suspense, useState } from "react";

import Loader from "@/components/three/Loader";
import Scene   from "@/components/three/Scene";
import { useLoadingStore } from "@/hooks/useLoadingStore";
import BackgroundAudio from "@/components/three/BackgroundAudio";

export function LoaderBridge() {
	const { progress } = useProgress();
	const setProgress = useLoadingStore((state) => state.setProgress);

	useEffect(() => {
		setProgress(progress);
	}, [progress, setProgress]);

	return null;
}

function App() {

	const [started, setStarted] = useState(false)

	return (
		<section className="h-screen w-full bg-black text-white no-scrollbar">
			{!started && <Loader onStart={() => setStarted(true)} />}

			<Canvas camera={{ position: [0, 2, -4]} } shadows>
				<Suspense fallback={null} >
					<LoaderBridge />
					<ScrollControls pages={6} damping={0.2}>
						<Scene />
						<BackgroundAudio url="/audio/Laedx_Jingle_v1.mp3" play={true} />
						{/* <OrbitControls /> */}
					</ScrollControls>
				</Suspense>
			</Canvas>
		</section>
	)
}

export default App
