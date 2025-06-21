// // components/LightBulbScene.tsx
// import React from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Float } from "@react-three/drei";
// import * as THREE from "three";

// const Rope = () => (
//   <mesh position={[0, 3, 0]}>
//     <cylinderBufferGeometry args={[0.02, 0.02, 6, 32]} />
//     <meshStandardMaterial color="#D2691E" />
//   </mesh>
// );

// const Bulb = () => (
//   <group position={[0, 0, 0]}>
//     {/* Bulb Glass */}
//     <mesh>
//       <sphereBufferGeometry args={[0.5, 32, 32]} />
//       <meshPhysicalMaterial
//         color="#FFD580"
//         transparent
//         roughness={0}
//         transmission={1}
//         thickness={0.2}
//         emissive="#ffcc88"
//         emissiveIntensity={0.6}
//       />
//     </mesh>

//     {/* Cap */}
//     <mesh position={[0, 0.7, 0]}>
//       <cylinderBufferGeometry args={[0.2, 0.2, 0.4, 32]} />
//       <meshStandardMaterial color="#CC6600" />
//     </mesh>

//     {/* Light Source */}
//     <pointLight
//       color="#FFD580"
//       intensity={1.5}
//       distance={5}
//       position={[0, 0, 0]}
//     />
//   </group>
// );

// const LightBulbScene = () => {
//   return (
//     <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
//       <ambientLight intensity={0.3} />
//       <directionalLight position={[2, 5, 2]} intensity={1} />
//       <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
//         <Bulb />
//       </Float>
//       <Rope />
//       <OrbitControls enableZoom={false} />
//     </Canvas>
//   );
// };

// export default LightBulbScene;
