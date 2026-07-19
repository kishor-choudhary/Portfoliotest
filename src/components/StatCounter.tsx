import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  duration?: number; // Duration in ms
}

export default function StatCounter({ value, suffix = "", duration = 1200 }: StatCounterProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Cubic ease-out curve: f(t) = 1 - (1-t)^3
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(easeOutProgress * value);

      setDisplayValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={containerRef} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}
