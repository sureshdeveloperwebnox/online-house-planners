import React, { createRef, forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

// Utility functions
export function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

export function getDistance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

// Mouse position hook
export function useMousePosition(ref, callback) {
  React.useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { top, left } = ref.current?.getBoundingClientRect() || {
        top: 0,
        left: 0,
      };
      callback?.({ x: clientX - left, y: clientY - top });
    };

    const handleTouchMove = (event) => {
      const { clientX, clientY } = event.touches[0];
      const { top, left } = ref.current?.getBoundingClientRect() || {
        top: 0,
        left: 0,
      };
      callback?.({ x: clientX - left, y: clientY - top });
    };

    ref.current?.addEventListener("mousemove", handleMouseMove);
    ref.current?.addEventListener("touchmove", handleTouchMove);

    const nodeRef = ref.current;
    return () => {
      nodeRef?.removeEventListener("mousemove", handleMouseMove);
      nodeRef?.removeEventListener("touchmove", handleTouchMove);
    };
  }, [ref, callback]);
}

// Animated Image Component
const AnimatedImage = forwardRef(({ src }, ref) => {
  const controls = useAnimation();
  const isRunning = useRef(false);
  const imgRef = useRef(null);

  useImperativeHandle(ref, () => ({
    isActive: () => isRunning.current,
    show: async ({ x, y, newX, newY, zIndex }) => {
      const rect = imgRef.current?.getBoundingClientRect();
      if (!rect) return;

      const center = (posX, posY) => {
        return `translate(${posX - rect.width / 2}px, ${posY - rect.height / 2}px)`;
      };

      controls.stop();
      controls.set({
        opacity: isRunning.current ? 1 : 0.75,
        zIndex,
        transform: `${center(x, y)} scale(1)`,
        transition: { ease: "circOut" },
      });

      isRunning.current = true;

      await controls.start({
        opacity: 1,
        transform: `${center(newX, newY)} scale(1)`,
        transition: { duration: 0.9, ease: "circOut" },
      });

      await Promise.all([
        controls.start({
          transform: `${center(newX, newY)} scale(0.1)`,
          transition: { duration: 1, ease: "easeInOut" },
        }),
        controls.start({
          opacity: 0,
          transition: { duration: 1.1, ease: "easeOut" },
        }),
      ]);

      isRunning.current = false;
    },
  }));

  return (
    <motion.img
      ref={imgRef}
      initial={{ opacity: 0, scale: 1 }}
      animate={controls}
      src={src}
      alt="trail element"
      className="absolute h-56 w-44 object-cover"
    />
  );
});

AnimatedImage.displayName = "AnimatedImage";

// Image URLs
const images = [
  "/images/house/mousehouse1.avif",
  "/images/house/mousehouse2.jpg",
  "/images/house/mousehouse3.jpg",
//   "/images/house/mousehouse4.jpg",
//   "/images/house/mousehouse5.jpg",
//   "/images/house/mousehouse6.avif",
];

// Main Component
const TrailingImage = () => {
  const containerRef = useRef(null);
  const trailsRef = useRef(
    Array.from({ length: Math.max(20, images.length) }, (_, i) => ({
      id: `trail-${i}-${Math.random().toString(36).substr(2, 9)}`,
      ref: createRef()
    }))
  );

  const lastPosition = useRef({ x: 0, y: 0 });
  const cachedPosition = useRef({ x: 0, y: 0 });
  const imageIndex = useRef(0);
  const zIndex = useRef(1);

  const update = useCallback((cursor) => {
    const activeRefCount = trailsRef.current.filter(
      trail => trail.ref.current?.isActive()
    ).length;
    
    if (activeRefCount === 0) zIndex.current = 1;

    const distance = getDistance(
      cursor.x,
      cursor.y,
      lastPosition.current.x,
      lastPosition.current.y
    );

    const newCachePosition = {
      x: lerp(cachedPosition.current.x || cursor.x, cursor.x, 0.1),
      y: lerp(cachedPosition.current.y || cursor.y, cursor.y, 0.1),
    };
    cachedPosition.current = newCachePosition;

    if (distance > 50) {
      imageIndex.current = (imageIndex.current + 1) % trailsRef.current.length;
      zIndex.current += 1;
      lastPosition.current = cursor;
      trailsRef.current[imageIndex.current].ref.current?.show({
        x: newCachePosition.x,
        y: newCachePosition.y,
        zIndex: zIndex.current,
        newX: cursor.x,
        newY: cursor.y,
      });
    }
  }, []);

  useMousePosition(containerRef, update);

  return (
    <div ref={containerRef} className="storybook-fix relative flex min-h-200 w-full">
      {trailsRef.current.map((trail, index) => (
        <AnimatedImage
          key={trail.id}
          ref={trail.ref}
          src={images[index % images.length]}
        />
      ))}
      <div className="flex w-full flex-1 items-center justify-center p-4 text-center text-sm text-foreground md:text-3xl">
<div className="max-w-sm">Move your mouse to explore your Dream House Plan in style!</div>
      </div>
    </div>
  );
};

export default TrailingImage;