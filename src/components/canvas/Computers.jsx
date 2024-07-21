import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CavasLoader from "./../Loader";

const Computers = ({ isMobile }) => {
	const computer = useGLTF("./desktop_pc/scene.gltf");
	console.log(isMobile);
	return (
		<mesh>
			<hemisphereLight
				intensity={Math.PI * (70 / 100)}
				groundColor={"black"}
			/>

			<pointLight intensity={1} />
			<spotLight
				position={[-20, 50, 10]}
				angle={Math.PI * (12 / 100)}
				penumbra={1}
				intensity={1}
				castShadow={true}
				shadow-mapSize={1024}
			/>
			<primitive
				object={computer.scene}
				scale={isMobile ? 0.7 : 0.75}
				position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
				rotation={[-0.01, -0.2, -0.1]}
			/>
		</mesh>
	);
};

const ComputerCanvas = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 500px)");
		setIsMobile(mediaQuery.matches);

		const handleMediaQuaryChange = (e) => {
			setIsMobile(e.matches);
		};

		mediaQuery.addEventListener("change", handleMediaQuaryChange);

		return () => {
			mediaQuery.removeEventListener("change", handleMediaQuaryChange);
		};
	}, []);
	return (
		<Canvas
			frameloop="demand "
			shadows
			camera={{ position: [25, 3, 5], fov: 25 }}
			gl={{ preserveDrawingBuffer: true }}
		>
			<Suspense fallback={<CavasLoader />}>
				<OrbitControls
					enableZoom={false}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
				/>
				<Computers isMobile={isMobile} />
			</Suspense>
			<Preload all />
		</Canvas>
	);
};

export default ComputerCanvas;
