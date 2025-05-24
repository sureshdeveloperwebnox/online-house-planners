import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = () => {
  const { scene } = useGLTF("/models/whitehouse.glb");
  return <primitive object={scene} scale={0.1} />;
};

// 👇 This component moves the camera based on scroll position
const CameraController = () => {
  const { camera } = useThree();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    // Adjust Z position based on scroll (tweak the divisor to change sensitivity)
    camera.position.z = 5 - scrollY * 0.005;
    camera.updateProjectionMatrix();
  });

  return null;
};

export const TitleCard = () => {
  return (
    <section className="flex min-h-screen w-full items-center justify-between bg-white-200 px-8 py-24 text-black">
      <div className="flex-1">
        <FlipLink href="#">ONLINE</FlipLink>
        <FlipLink href="#">HOUSE</FlipLink>
        <FlipLink href="#">PLANNERS</FlipLink>
      </div>
      <div className="flex-1 h-[600px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Model />
          <CameraController /> {/* Add the camera scroll logic */}
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </section>
  );
};

// FlipLink stays unchanged
const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl w-full"
      style={{ lineHeight: 0.75 }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};
