import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface TerminalLine {
  text: string;
  type: "command" | "output" | "success" | "comment";
}

const lines: TerminalLine[] = [
  { text: "# Initialize developer workspace environment", type: "comment" },
  { text: "ssh kishor@dev.os -p 3000", type: "command" },
  { text: "Connecting to Pune/Sirohi central network node...", type: "output" },
  { text: "Access GRANTED. Kishor OS v10.4 initialized.", type: "success" },
  { text: "cat about_me.json", type: "command" },
  {
    text: `{ "name": "Kishor", "grade": 10, "target": "AI/ML Engineer" }`,
    type: "output",
  },
  { text: "python3 -m pip install google-genai claude-agent", type: "command" },
  { text: "Installing dependencies: [████████████████████] 100%", type: "success" },
  { text: "python3 launch_vision.py --mode=hairstyle-ai", type: "command" },
  { text: "Loading Fresh Faces Salon Hairstyle Suggestion Engine...", type: "output" },
  { text: "System online. Building something new!! 🚀", type: "success" },
];

export default function TerminalSimulator() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Restart typing on scroll into view
  useEffect(() => {
    if (isInView) {
      setVisibleLines([]);
      setCurrentLineIndex(0);
      setTypedText("");
      setIsTyping(true);
    }
  }, [isInView]);

  useEffect(() => {
    if (!isInView || currentLineIndex >= lines.length) {
      // Loop after all lines typed, wait 5 seconds before reset
      if (currentLineIndex >= lines.length && isTyping) {
        setIsTyping(false);
        const timer = setTimeout(() => {
          setVisibleLines([]);
          setCurrentLineIndex(0);
          setTypedText("");
          setIsTyping(true);
        }, 5000);
        return () => clearTimeout(timer);
      }
      return;
    }

    const currentLine = lines[currentLineIndex];
    let charIndex = 0;
    let typingSpeed = currentLine.type === "command" ? 40 : 15; // Commands type slower than fast outputs

    // For instant-feeling comments/small blocks
    if (currentLine.type === "comment") {
      typingSpeed = 10;
    }

    const interval = setInterval(() => {
      setTypedText((prev) => prev + currentLine.text[charIndex]);
      charIndex++;

      if (charIndex >= currentLine.text.length) {
        clearInterval(interval);

        // Wait a short bit, then commit this typed line to visible line list and advance index
        const pauseTimer = setTimeout(() => {
          setVisibleLines((prev) => [...prev, currentLine]);
          setTypedText("");
          setCurrentLineIndex((prev) => prev + 1);
        }, 600); // Delay between lines

        return () => clearTimeout(pauseTimer);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [currentLineIndex, isInView, isTyping]);

  return (
    <div
      ref={containerRef}
      className="w-full font-mono text-xs md:text-sm bg-black/60 border border-white/10 rounded-2xl p-4 shadow-2xl relative overflow-hidden"
    >
      {/* Top Header/Window control rail */}
      <div className="flex items-center justify-between border-b border-purple-950/40 pb-2 mb-3">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="text-[10px] text-purple-400/60 font-medium tracking-wide">
          bash — dev@kishor.os
        </div>
        <div className="w-10 h-2" />
      </div>

      {/* Code viewport body */}
      <div className="space-y-1.5 h-[240px] md:h-[280px] overflow-y-auto pr-1">
        {/* Render fully committed typed history lines */}
        {visibleLines.map((line, idx) => (
          <div key={idx} className="leading-relaxed">
            {line.type === "command" && (
              <span className="text-purple-400 mr-2 font-bold">kishor.os:~$</span>
            )}
            <span
              className={
                line.type === "comment"
                  ? "text-zinc-500 font-light"
                  : line.type === "success"
                  ? "text-green-400 font-semibold"
                  : line.type === "command"
                  ? "text-white"
                  : "text-zinc-300"
              }
            >
              {line.text}
            </span>
          </div>
        ))}

        {/* Render the actively typing line */}
        {currentLineIndex < lines.length && (
          <div className="leading-relaxed">
            {lines[currentLineIndex].type === "command" && (
              <span className="text-purple-400 mr-2 font-bold">kishor.os:~$</span>
            )}
            <span
              className={
                lines[currentLineIndex].type === "comment"
                  ? "text-zinc-500 font-light"
                  : lines[currentLineIndex].type === "success"
                  ? "text-green-400 font-semibold"
                  : lines[currentLineIndex].type === "command"
                  ? "text-white"
                  : "text-zinc-300"
              }
            >
              {typedText}
            </span>
            {/* Real-time typing cursor */}
            <span className="inline-block w-1.5 h-3.5 bg-purple-400 animate-pulse ml-0.5" />
          </div>
        )}

        {/* Blinking idle cursor shown when fully complete */}
        {currentLineIndex >= lines.length && (
          <div className="leading-relaxed">
            <span className="text-purple-400 mr-2 font-bold">kishor.os:~$</span>
            <span className="inline-block w-1.5 h-3.5 bg-purple-400 animate-[blink_1s_infinite] ml-0.5" />
          </div>
        )}
      </div>

      {/* Styled inline animation for the cursor blinking */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
