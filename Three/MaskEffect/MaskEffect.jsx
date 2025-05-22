"use client";

import { useRef, useEffect } from "react";

export function MaskEffect({ children, revealText, className = "" }) {
  const maskId = useRef(`mask-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const updateMouse = (e) => {
      const mask = document.getElementById(maskId.current);
      if (mask) {
        const { clientX: x, clientY: y } = e;
        mask.setAttribute("cx", x);
        mask.setAttribute("cy", y);
      }
    };

    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* SVG mask */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <mask id={maskId.current}>
            <rect width="100%" height="100%" fill="white" />
            <circle id={maskId.current} r="150" fill="black" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="black" mask={`url(#${maskId.current})`} />
      </svg>

      {/* Text revealed by mask */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
        {revealText}
      </div>

      {/* Background content */}
      <div className="relative z-0">{children}</div>
    </div>
  );
}
