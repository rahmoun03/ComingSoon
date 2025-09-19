// ThreeText3D.jsx
import React, { useRef, useMemo } from 'react';
import { Text3D } from '@react-three/drei';

function ThreeText3D({
  text = 'COMINSOON',
  fontUrl = '/fonts/Inter_Bold.json',
  position = [0, 0, -3],
  letterSpacing = 0.1,
}) {

  const pos = [
    {x: -5,  y: -0.5, z: 0}, // C
    {x: -3.8,  y: -0.5, z: 0}, // O
    {x: -2.6,  y: -0.45, z: 0}, // M
    {x: -1.1,  y: -0.35, z: 0}, // I
    {x: -0.7,  y: -0.35, z: 0}, // N
    {x: 0.5,  y: -0.45, z: 0}, // G
    {x: 0,  y: 0, z: 0}, // S
    {x: 0,  y: 0, z: 0}, // O
    {x: 0,  y: 0, z: 0}, // O
    {x: 0,  y: 0, z: 0}, // N
  ];


  
  const groupRef = useRef();

  // geometry config
  const config = useMemo(() => ({
    size: 1.2,
    height: 0.35,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  }), []);

  return (
    <group ref={groupRef} position={position}>
      {text.split('').map((char, i) => (
        <Text3D
          key={i}
          font={fontUrl}
          {...config}
          position={[pos[i].x, pos[i].y, pos[i].z]}
        >
          {char}
          <meshStandardMaterial color="white" metalness={0.6} roughness={0.2} />
        </Text3D>
      ))}
    </group>
  );
}

export default ThreeText3D;
