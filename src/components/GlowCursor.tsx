import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function GlowCursor() {
  // Use MotionValues to record the mouse's actual coordinate positions
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Apply spring-easing to create a natural trailing effect rather than instant following
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25, mass: 0.8 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Adjust offset so center of the glow matches the actual cursor tip
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Background ambient cursor trail blob (very blurred, huge) */}
      <motion.div
        className="fixed top-0 left-0 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[110px] pointer-events-none z-0 hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Tiny high-vibrancy focus glow node trailing slightly tighter */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-purple-400/20 border border-purple-300/30 rounded-full blur-[3px] pointer-events-none z-50 hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
