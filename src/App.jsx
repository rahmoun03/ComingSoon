import { Canvas } from "@react-three/fiber";
import { useScroll, ScrollControls, useProgress, OrbitControls } from "@react-three/drei";
import { useEffect, Suspense, useState } from "react";
import { useFrame } from "@react-three/fiber";


import { useScrollStore } from "@/hooks/useScrollStore";
import { useLoadingStore } from "@/hooks/useLoadingStore";
import Loader from "@/components/ui/Loader";
import Scene   from "@/components/three/Scene";
import ScrollUI from "@/components/ui/ScrollUI";

export function LoaderBridge() {
	const { progress } = useProgress();
	const setProgress = useLoadingStore((state) => state.setProgress);

	useEffect(() => {
		setProgress(progress);
	}, [progress, setProgress]);

	return null;
}


export function ScrollBridge({ pages = 6 }) {
  const scroll = useScroll();
  const setScrollOffset = useScrollStore((state) => state.setScrollOffset);

  useFrame(() => {
	setScrollOffset(scroll.offset); // 0 → 1
  });

  return null;
}


function App() {

	const [started, setStarted] = useState(false)

	return (
		<section className="h-screen w-full bg-black text-white no-scrollbar">
			{!started && <Loader onStart={() => setStarted(true)} />}

			<Canvas camera={{ position: [10, 45, 90] }} shadows>
				<Suspense fallback={null} >
					<LoaderBridge />
					<ScrollControls pages={6} damping={0.1}>
						<Scene />
						<OrbitControls enableZoom={false} />
						<ScrollBridge pages={6} />
					</ScrollControls>
				</Suspense>
			</Canvas>

			<ScrollUI pages={6} />
		</section>
	)
}

export default App
