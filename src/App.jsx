import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import { pointsInner, pointsOuter } from "../utils";
import { useRef } from "react";

const Point = ({ position, color }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.1}
        roughness={0.5}
      />
    </Sphere>
  );
};

const PointCircle = () => {
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

function App() {
  return (
    <div style={{ position: "relative" }}>
      <Canvas
        camera={{ position: [10, -7.5, -5] }}
        style={{ height: "100vh", backgroundColor: "#101010" }}
      >
        <OrbitControls maxDistance={40} minDistance={10} />
        <directionalLight />
        <pointLight position={[-30, 0, -30]} power={10.0} />
        <PointCircle />
      </Canvas>
    </div>
  );
}

export default App;
