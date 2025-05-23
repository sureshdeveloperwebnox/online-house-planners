"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollReveal({ text, className }) {
  const containerRef = useRef(null);
  const characters = text.split("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div 
      ref={containerRef} 
      className={cn("relative h-[300vh] w-full", className)}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <p className="text-4xl font-bold max-w-2xl mx-auto text-center">
          {characters.map((char, i) => {
            const start = i / characters.length;
            const end = start + 0.05;
            
            return (
              <motion.span
                key={`char-${i}-${char}`}  // Unique key combining index and character
                style={{
                  opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
                  y: useTransform(scrollYProgress, [start, end], [30, 0]),
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
        </p>
      </div>
    </div>
  );
}

// Utility function
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}