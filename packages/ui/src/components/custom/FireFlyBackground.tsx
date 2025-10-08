import { useEffect, useRef, useMemo } from "react";
import { cn } from "../../lib/utils";

export interface FireFlyBackgroundProps {
  particleCount?: number;
  minSize?: number;
  maxSize?: number;
  colors?: string[];
  blurRadius?: number;
  maxOpacity?: number;
  maxSpeed?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  velocityX: number;
  velocityY: number;
}

export function FireFlyBackground({
  particleCount = 15,
  minSize = 60,
  maxSize = 200,
  colors = [
    "#3b82f6", // blue
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#10b981", // green
    "#f59e0b", // amber
    "#06b6d4", // cyan
    "#6366f1", // indigo
    "#14b8a6", // teal
  ],
  blurRadius = 60,
  maxOpacity = 0.4,
  maxSpeed = 2.5,
  className,
}: FireFlyBackgroundProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const containerDimsRef = useRef({ width: 0, height: 0 });
  // Test comment for watch

  // Memoize colors array to prevent unnecessary re-initialization
  const memoizedColors = useMemo(() => colors, [colors.join(',')]);

  // Initialize particles only when necessary
  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Store container dimensions for animation loop
    containerDimsRef.current = { width, height };

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => {
      const size = minSize + Math.random() * (maxSize - minSize);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        color: memoizedColors[Math.floor(Math.random() * memoizedColors.length)],
        opacity: Math.random() * maxOpacity,
        velocityX: (Math.random() - 0.5) * maxSpeed,
        velocityY: (Math.random() - 0.5) * maxSpeed,
      };
    });

    // Render particles
    container.innerHTML = "";
    particlesRef.current.forEach((particle, index) => {
      const div = document.createElement("div");
      div.className = "firefly-particle absolute rounded-full pointer-events-none";
      div.style.width = `${particle.size}px`;
      div.style.height = `${particle.size}px`;
      div.style.backgroundColor = particle.color;
      div.style.opacity = String(particle.opacity);
      div.style.filter = `blur(${blurRadius}px)`;
      div.style.left = "0";
      div.style.top = "0";
      div.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
      div.style.willChange = "transform";
      div.dataset.index = String(index);
      container.appendChild(div);
    });
  }, [particleCount, minSize, maxSize, memoizedColors, blurRadius, maxOpacity, maxSpeed]);

  // Watch for container resize and update dimensions
  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        containerDimsRef.current = { width, height };
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Separate effect for animation loop - runs independently
  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;

    // Animation loop
    const animate = () => {
      const particles = particlesRef.current;
      const elements = container.querySelectorAll(".firefly-particle");
      const { width, height } = containerDimsRef.current;

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        // Wrap around edges
        if (particle.x < -particle.size) particle.x = width + particle.size;
        if (particle.x > width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = height + particle.size;
        if (particle.y > height + particle.size) particle.y = -particle.size;

        // Update DOM element using transform for smooth animation
        const element = elements[index] as HTMLElement;
        if (element) {
          element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // Empty deps - animation runs continuously

  return (
    <div
      ref={canvasRef}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-0",
        className
      )}
    />
  );
}
// Test
// Watch test
