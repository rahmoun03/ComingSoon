function Scene() {

	const mountainProps = [
		{ position: [0, 0, 0], scale: 0.05, rotation: [0, 0, 0] },
		{ position: [80, 0, 0], scale: 0.05, rotation: [0, 0, 0] },
		{ position: [0, 0, -80], scale: 0.05, rotation: [0, 0, 0] },
		{ position: [80, 0, -80], scale: 0.05	, rotation: [0, 0, 0] },
	]

	return (
		<>
			<Lights />
			<LdsLogo pos={[0, 20, 0]} color='#9cd3ff' title='logo' />
			<Astronaut
				url={'/models/astronaut/source/Astronaut.glb'}
				initialAnimation="idle"
				position={[0, 1.2, -2]}
			/>

			<Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

			{mountainProps.map((props, index) => (
				<Mountain key={index} url={'3DModels/Mountain/f145306e65ac4498aa86db35231d7bf8_Textured.gltf'} {...props} />
			))}
		</>
	)
}

export default Scene;
