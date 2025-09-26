import { Canvas } from "@react-three/fiber";
import { useScroll, ScrollControls, useProgress, OrbitControls, Stats } from "@react-three/drei";
import { useEffect, Suspense, useState } from "react";
import { useFrame } from "@react-three/fiber";


import { useScrollStore } from "@/hooks/useScrollStore";
import { useLoadingStore } from "@/hooks/useLoadingStore";
// import Loader from "@/components/ui/Loader";
import LoadingPage from "@/components/ui/Loading";
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


export function ScrollBridge({ pages = 12 }) {
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
		<section className="h-screen w-full bg-black text-white ">
			{!started && <LoadingPage onStart={() => setStarted(true)} />}

			<Canvas camera={{ position: [10, 45, 87] }} >
				<Suspense fallback={null} >
					<LoaderBridge />
					<ScrollControls pages={12} damping={0.1}>
						<Scene />
						{/* <OrbitControls enableZoom={false} /> */}
						<ScrollBridge pages={12} />
						{/* <Stats /> */}
					</ScrollControls>
				</Suspense>
			</Canvas>

			{/* <ScrollUI pages={12} /> */}
		</section>
	)
}

export default App
