import React, { useState, useEffect, MouseEvent, useRef, ReactNode } from "react";
import { motion } from "motion/react";

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

// 1. Primary Button with Click Ripple Glow
export function RippleButton({ children, onClick, className = "", type = "button" }: ButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    
    // Ripple coordinates relative to button center/click bounds
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);
    if (onClick) onClick(e);
  };

  // Cleanup ripples
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600); // Matches the ripple animation duration
    return () => clearTimeout(timer);
  }, [ripples]);

  return (
    <button
      type={type}
      ref={buttonRef}
      onClick={handleClick}
      className={`relative overflow-hidden bg-purple-600 text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-lg font-bold shadow-[0_0_20px_rgba(109,40,217,0.3)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(109,40,217,0.7)] hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Expanding Ripple Elements */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-purple-300/30 pointer-events-none animate-ripple"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}

      <style>{`
        @keyframes ripple-anim {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple-anim 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
      `}</style>
    </button>
  );
}

// 2. Secondary Button with Perimeter Border Light Trace on Hover
export function TraceButton({ children, onClick, className = "", type = "button" }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLButtonElement | null>(null);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  // Dynamically calculate button dimensions for the SVG path
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setSvgSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const perimeter = (svgSize.width + svgSize.height) * 2;

  return (
    <button
      ref={containerRef}
      type={type}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-transparent text-purple-300 font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:text-white ${className}`}
    >
      {/* Static background and low-opacity border */}
      <span className="absolute inset-0 border border-purple-500/20 rounded-lg bg-zinc-950/20 pointer-events-none" />

      {/* Dynamic Animated Vector Stroke Overlay */}
      {svgSize.width > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ overflow: "visible" }}
        >
          <motion.rect
            x="0.5"
            y="0.5"
            width={svgSize.width - 1}
            height={svgSize.height - 1}
            rx="8" // Rounded borders
            fill="none"
            stroke="#a78bfa"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{
              strokeDasharray: `${perimeter / 4} ${perimeter * 2}`,
              strokeDashoffset: perimeter,
            }}
            animate={
              isHovered
                ? {
                    strokeDashoffset: 0,
                  }
                : {
                    strokeDashoffset: perimeter,
                  }
            }
            transition={{
              duration: 1.0,
              ease: "easeInOut",
              repeat: isHovered ? Infinity : 0,
            }}
            style={{
              filter: "drop-shadow(0px 0px 4px #a78bfa)",
            }}
          />
        </svg>
      )}

      <span className="relative z-10">{children}</span>
    </button>
  );
}
