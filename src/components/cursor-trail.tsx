
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function CursorTrail() {
  const { theme } = useTheme();
  const [isGamer, setIsGamer] = useState(false);

  useEffect(() => {
    setIsGamer(theme === "gamer");
  }, [theme]);

  useEffect(() => {
    if (!isGamer) return;

    const trailCount = 20;
    const trailElements: HTMLElement[] = [];
    const positions: { x: number; y: number }[] = [];
    for (let i = 0; i < trailCount; i++) {
        positions.push({ x: 0, y: 0 });
    }

    for (let i = 0; i < trailCount; i++) {
      const el = document.createElement('div');
      el.className = 'cursor-trail';
      document.body.appendChild(el);
      trailElements.push(el);
    }

    const handleMouseMove = (e: MouseEvent) => {
        positions[0] = { x: e.clientX, y: e.clientY };
    };
    
    let animationFrameId: number;
    const animate = () => {
        for (let i = trailCount - 1; i > 0; i--) {
            positions[i].x = positions[i-1].x;
            positions[i].y = positions[i-1].y;
        }

        trailElements.forEach((el, i) => {
            const pos = positions[i];
            el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
            el.style.opacity = (1 - i / trailCount).toString();
        });

        animationFrameId = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      trailElements.forEach(el => {
        if (document.body.contains(el)) {
          document.body.removeChild(el);
        }
      });
    };
  }, [isGamer]);

  return null;
}
