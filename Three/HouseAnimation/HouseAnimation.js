import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// 3D Model
const Model = () => {
    const { scene } = useGLTF("/models/white_modern_living_room.glb");
    return <primitive object={scene} scale={1} />;
};

// Main component
export const HouseAnimation = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-screen z-0"> {/* fixed positioning prevents scroll effects */}
            <Canvas camera={{ position: [0, 25, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Model />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
};
