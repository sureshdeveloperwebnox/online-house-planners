"use client";

import CanvasWrapper from "@/Three/CanvasWrapper";
import { SmoothScrollHero } from "@/Three/Hero/Hero";
import { BoxRotationScene } from "@/Three/Scenes";
import { OrbitControls } from "@react-three/drei";


export default function Home() {
  return (
    <div className="w-full h-screen">
      <SmoothScrollHero/>
    </div>
  );
}
