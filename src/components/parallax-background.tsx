
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export function ParallaxBackground() {
  const { theme } = useTheme();
  const [isProfessional, setIsProfessional] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsProfessional(theme === "professional");
  }, [theme]);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  useEffect(() => {
    if (isProfessional) {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [isProfessional, handleScroll, handleMouseMove]);

  if (!isProfessional) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 professional-mesh-bg" />
      
      {/* Floating geometric shapes */}
      <div
        className="parallax-layer"
        style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02 + scrollY * 0.1}px)` }}
      >
        <div className="professional-shape professional-shape-1" />
        <div className="professional-shape professional-shape-2" />
        <div className="professional-shape professional-shape-3" />
      </div>
      
      {/* Secondary layer with different movement */}
      <div
        className="parallax-layer"
        style={{ transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01 + scrollY * 0.2}px)` }}
      >
        <div className="professional-shape professional-shape-4" />
        <div className="professional-shape professional-shape-5" />
      </div>
      
      {/* Subtle grid overlay */}
      <div className="professional-grid" />
      
      {/* Animated light rays */}
      <div className="professional-rays">
        <div className="ray ray-1" />
        <div className="ray ray-2" />
        <div className="ray ray-3" />
      </div>
    </div>
  );
}
