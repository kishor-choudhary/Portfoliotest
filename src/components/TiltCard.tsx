import { useState, useRef, MouseEvent, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function TiltCard({ children, className = "", id }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const maxTilt = 8; // Max tilt rotation in degrees

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center (ranging from -0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    // Calculate rotation angles
    // Moving cursor right tilts around the Y-axis (rotateY positive)
    // Moving cursor down tilts around the X-axis (rotateX negative)
    const nextRotateY = relativeX * maxTilt * 2;
    const nextRotateX = -relativeY * maxTilt * 2;

    setRotateY(nextRotateY);
    setRotateX(nextRotateX);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset rotations smoothly
    setRotateX(0);
    setRotateY(0);
  };

  // Build the inline transform style with perspective
  const transformStyle = isHovered
    ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
    : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";

  return (
    <div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`glass-card relative rounded-3xl p-8 h-full flex flex-col overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 select-none ${className}`}
      style={{
        transform: transformStyle,
        transition: isHovered
          ? "transform 0.1s ease-out, border-color 0.3s, box-shadow 0.3s"
          : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.5s, box-shadow 0.5s",
        borderColor: isHovered ? "rgba(168, 85, 247, 0.5)" : "rgba(255, 255, 255, 0.1)",
        boxShadow: isHovered
          ? "0 15px 35px -10px rgba(168, 85, 247, 0.4), 0 0 15px rgba(168, 85, 247, 0.2)"
          : "0 4px 20px -12px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Light sweep reflecting cursor coordinate on the glass surface */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none opacity-40 z-0 bg-radial from-white/10 to-transparent"
          style={{
            background: `radial-gradient(circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(167, 139, 250, 0.15), transparent)`,
          }}
          ref={(el) => {
            if (!el || !cardRef.current) return;
            // Listen to coordinates to set custom CSS variables
            const card = cardRef.current;
            const updateGlow = (e: globalThis.MouseEvent) => {
              const r = card.getBoundingClientRect();
              const x = e.clientX - r.left;
              const y = e.clientY - r.top;
              el.style.setProperty("--mouse-x", `${x}px`);
              el.style.setProperty("--mouse-y", `${y}px`);
            };
            card.addEventListener("mousemove", updateGlow);
            return () => card.removeEventListener("mousemove", updateGlow);
          }}
        />
      )}
      <div className="relative z-10 flex-1 flex flex-col">{children}</div>
    </div>
  );
}
