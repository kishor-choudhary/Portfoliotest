import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ParallaxImage({ src, alt, className = "" }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Set up useScroll to track the scroll position of the wrapper container
  // relative to the viewport window.
  // "start end" -> when container's top enters the viewport bottom
  // "end start" -> when container's bottom leaves the viewport top
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform the vertical movement (Y) of the image.
  // To prevent showing edges of the translated image, the image is scaled (scale-115) 
  // and shifted slightly slower than the scroll rate.
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full h-full rounded-lg bg-zinc-900 ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        style={{
          y,
        }}
        className="w-full h-full object-cover scale-115 origin-center pointer-events-none"
      />
      {/* Soft overlay gradient to deepen contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
