import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Terminal as TerminalIcon,
  Brain,
  Globe,
  Code as CodeIcon,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  MapPin,
  Flame,
  FileCode,
} from "lucide-react";

import { identity, stats, skills, projects, timeline } from "./data";
import ShaderBackground from "./components/ShaderBackground";
import ThreeDBackground from "./components/ThreeDBackground";
import GlowCursor from "./components/GlowCursor";
import TiltCard from "./components/TiltCard";
import StatCounter from "./components/StatCounter";
import TerminalSimulator from "./components/TerminalSimulator";
import { RippleButton, TraceButton } from "./components/InteractiveButtons";
import ParallaxImage from "./components/ParallaxImage";
import Navbar from "./components/Navbar";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./components/ScrollReveal";

export default function App() {
  const [activeSheet, setActiveSheet] = useState("01");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  
  // Interactive Terminal Command Center States
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ text: string; isUser: boolean; type?: string }>>([
    { text: "Welcome to kishor-choudhary dynamic port authority terminal.", isUser: false },
    { text: "Type 'help' to see available system commands, or select a quick query below.", isUser: false },
  ]);

  // Section Tracking for Title Block (Sheet numbering)
  useEffect(() => {
    const sections = [
      { id: "hero", num: "01" },
      { id: "terminal-section", num: "02" },
      { id: "about", num: "03" },
      { id: "skills", num: "04" },
      { id: "projects", num: "05" },
      { id: "journey", num: "06" },
    ];

    const handleScroll = () => {
      let currentSection = "01";
      const scrollPos = window.scrollY + window.innerHeight * 0.4;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentSection = section.num;
            break;
          }
        }
      }
      setActiveSheet(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle terminal command execution
  const executeCommand = (cmd: string) => {
    const query = cmd.trim().toLowerCase();
    if (!query) return;

    const nextHistory = [...terminalHistory, { text: `user@kishor.os:~$ ${cmd}`, isUser: true }];
    
    let reply = "";
    let type = "output";

    switch (query) {
      case "help":
        reply = "Available commands: 'about', 'skills', 'projects', 'contact', 'dream', 'clear'";
        break;
      case "about":
        reply = `Kishor Choudhary - 16yo self-taught coder. Switched from accounting aspiration to coding in 8th grade due to Minecraft. Passionate about AI/ML.`;
        break;
      case "skills":
        reply = `Languages: HTML, C++, SQL, Python (learning). Platforms: Google AI Studio, Claude, Flask, SQLite.`;
        break;
      case "projects":
        reply = `Shipped projects: (1) Fresh Faces Salon Website with Face-shape Suggestion tool, (2) Akinator game, (3) SVIT college design. Type 'project <id>' to details (e.g. 'project P-01').`;
        break;
      case "project p-01":
        reply = `Fresh Faces Family Salon: Fully commercial web app featuring hairstyle ML suggestion tool powered by Google AI Studio.`;
        type = "success";
        break;
      case "project p-02":
        reply = `Akinator Character Guesser: Backed by Python & Flask and SQLite, has social media card exporter.`;
        type = "success";
        break;
      case "project p-03":
        reply = `SVIT Redesign: Visually polished revision of campus portal svispune.in for fun.`;
        type = "success";
        break;
      case "contact":
        reply = `Email: kishorchoudhary395395@gmail.com | Discord: kishor.dev | Location: Pune, Maharashtra.`;
        break;
      case "dream":
        reply = `My absolute ultimate dream is to build intelligent, autonomous agents that solve critical real-world friction and secure an internship in AI/ML.`;
        type = "success";
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      default:
        if (query.startsWith("project ")) {
          reply = "Project ID not recognized. Try 'project P-01', 'project P-02', or 'project P-03'.";
        } else {
          reply = `Command not found: '${cmd}'. Type 'help' to see valid nodes.`;
        }
    }

    setTerminalHistory([...nextHistory, { text: reply, isUser: false, type }]);
    setTerminalInput("");
  };

  return (
    <div className="min-h-screen bg-[#020205] text-[#e0e0e0] font-sans selection:bg-purple-500/30 selection:text-white overflow-x-hidden relative">
      
      {/* Immersive UI Background Glow Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* 1. Global Interactive WebGL background */}
      <ShaderBackground />

      {/* 2. Custom Spring Glow Cursor Trailer */}
      <GlowCursor />

      {/* 3. Global Header/Navbar */}
      <Navbar />

      {/* 4. Signature Floating Engineering Title Block (Bottom-Right on desktop) */}
      <div className="fixed right-6 bottom-6 z-40 hidden lg:block border border-white/10 bg-black/80 backdrop-blur-md font-mono text-[11px] text-zinc-400 w-64 shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-white/5 border-b border-white/10 px-3 py-2 font-bold text-purple-300 tracking-wider">
          SYSTEM STATUS PANEL
        </div>
        <div className="divide-y divide-purple-950/40">
          <div className="flex justify-between px-3 py-2">
            <span>NAME</span>
            <span className="font-bold text-white">Kishor Choudhary</span>
          </div>
          <div className="flex justify-between px-3 py-2">
            <span>ROLE</span>
            <span className="font-bold text-white">Aspiring AI/ML Eng</span>
          </div>
          <div className="flex justify-between px-3 py-2">
            <span>ACTIVE SHEET</span>
            <span className="font-bold text-purple-400">{activeSheet} / 06</span>
          </div>
          <div className="flex justify-between px-3 py-2">
            <span>STATUS</span>
            <span className="font-bold text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 md:px-12 text-center overflow-hidden border-b border-purple-950/20"
      >
        {/* Pulsing purple radial blobs in the background */}
        <motion.div
          animate={{
            x: [0, 50, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.12, 0.92, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 11,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-purple-600/5 rounded-full blur-[90px] pointer-events-none"
        />
        <motion.div
          animate={{
            x: [0, -40, 50, 0],
            y: [0, 40, -50, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 9,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none"
        />

        {/* 3D Interactive Crystal canvas frame */}
        <div className="relative w-full max-w-[320px] h-[320px] md:max-w-[420px] md:h-[420px] -mb-10 cursor-pointer">
          <ThreeDBackground />
        </div>

        {/* Staggered entrance animation for hero text */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-5">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-center gap-2"
          >
            <span className="h-px w-6 bg-purple-500/50" />
            <span className="font-mono text-xs text-purple-300 tracking-widest uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Sheet 01 — Introduction
            </span>
            <span className="h-px w-6 bg-purple-500/50" />
          </motion.div>

          {/* Headline with blur-to-sharp effect */}
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-display font-bold text-4xl md:text-6xl lg:text-7xl tracking-tighter text-white uppercase leading-tight text-glow-purple"
          >
            Building <span className="text-purple-300">Something New</span>
            <br />
            Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">AI / ML</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="font-sans text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed"
          >
            Hey, I'm Kishor. I'm a 10th-grade developer passionately diving into artificial intelligence, machine learning, and fully autonomous agent systems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="pt-4 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="#projects">
              <RippleButton>Explore Projects</RippleButton>
            </a>
            <a href="#contact">
              <TraceButton>Get In Touch</TraceButton>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================= STATS COUNTER ROW ================= */}
      <section className="border-y border-white/5 bg-white/5 backdrop-blur-md py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/5">
            {stats.map((stat, idx) => (
              <StaggerItem key={stat.label} className={`${idx > 1 ? "pt-6 lg:pt-0" : ""}`}>
                <div className="font-display text-4xl md:text-5xl font-bold text-white mb-1 text-glow-purple">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                  {stat.label}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ================= TERMINAL COMMAND CENTER ================= */}
      <section id="terminal-section" className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-b border-purple-950/20">
        <ScrollReveal className="text-center mb-12">
          <p className="font-mono text-xs text-purple-400 tracking-widest uppercase mb-1">
            Sheet 02 — Interactive Environment
          </p>
          <h3 className="font-display text-2xl md:text-4xl font-semibold text-white tracking-tight">
            Developer Command Center
          </h3>
          <p className="font-sans text-xs md:text-sm text-zinc-500 max-w-md mx-auto mt-2">
            Simulate a direct SSH link to my system. Run commands or query my intelligence nodes.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Static typing terminal */}
          <div className="lg:col-span-6">
            <ScrollReveal className="bg-white/5 backdrop-blur-xl border border-white/10 p-1 rounded-3xl shadow-xl">
              <TerminalSimulator />
            </ScrollReveal>
          </div>

          {/* Column 2: Interactive Terminal Playground */}
          <div className="lg:col-span-6">
            <ScrollReveal className="bg-black/60 border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col h-[300px] md:h-[340px] relative">
              <div className="flex items-center gap-1.5 border-b border-white/10 pb-2 mb-3">
                <TerminalIcon size={14} className="text-purple-400" />
                <span className="font-mono text-[11px] text-zinc-400">Interactive SSH Client (Guest Session)</span>
              </div>

              {/* History screen */}
              <div className="flex-1 overflow-y-auto space-y-1.5 font-mono text-xs mb-4 pr-1 text-left">
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className="leading-relaxed">
                    <span
                      className={
                        line.isUser
                          ? "text-purple-400"
                          : line.type === "success"
                          ? "text-green-400"
                          : "text-zinc-300 animate-fadeIn"
                      }
                    >
                      {line.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Form Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  executeCommand(terminalInput);
                }}
                className="flex items-center gap-2 border-t border-white/10 pt-3"
              >
                <span className="font-mono text-xs text-purple-400 font-bold select-none">guest@kishor.os:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type 'help'..."
                  className="flex-1 bg-transparent border-none text-xs text-white font-mono focus:outline-none focus:ring-0 p-0 placeholder-zinc-700"
                />
                <button
                  type="submit"
                  className="bg-purple-900/30 hover:bg-purple-800/50 border border-white/10 text-purple-300 font-mono text-[10px] uppercase px-3 py-1.5 rounded transition-all active:scale-95"
                >
                  RUN
                </button>
              </form>
            </ScrollReveal>

            {/* Quick Query Node Shortcuts */}
            <ScrollReveal delay={0.2} className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
              {["About", "Skills", "Projects", "Dream", "Contact"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeCommand(cmd)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-purple-300 text-[10px] font-mono px-3 py-1 rounded transition-all"
                >
                  &gt; {cmd}
                </button>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-b border-white/5">
        <ScrollReveal className="text-center mb-12">
          <p className="font-mono text-xs text-purple-400 tracking-widest uppercase mb-1">
            Sheet 03 — Personal Profile
          </p>
          <h3 className="font-display text-2xl md:text-4xl font-semibold text-white tracking-tight">
            About Kishor
          </h3>
          <p className="font-sans text-xs md:text-sm text-zinc-500 max-w-md mx-auto mt-2">
            The transition from potential accountant to deep-stack coding enthusiast.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-5 text-left text-zinc-300 font-sans leading-relaxed text-sm">
            <ScrollReveal>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-purple-400" />
                <span className="font-mono text-xs text-zinc-400">Based in: Pune, Maharashtra / Sirohi, Rajasthan</span>
              </div>
              <p>
                Until 8th grade, my sights were set on becoming a Chartered Accountant. But everything changed when I discovered Minecraft development. Investigating logic structures and hosting custom elements sparked a deep, permanent fascination with code.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p>
                From that point on, I began self-teaching the fundamentals. Guided by sheer curiosity, I learned HTML, basic Python, SQL schemas, and C++ workflows alongside my standard high school studies. I love understanding how systems operate under the hood and constructing projects that feel genuinely exciting.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p>
                Currently, as a Class 10 student, I focus on applying artificial intelligence and machine learning pipelines. By deploying smart models (Google AI Studio, Claude API, local open-source systems), I construct highly polished, real-world solutions. I am actively seeking remote collaborations or entry-level internships to expand my engineering expertise while completing high school.
              </p>
            </ScrollReveal>
          </div>

          {/* Blueprint-style Specification Table */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.3} className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl">
              <div className="bg-white/5 border-b border-white/10 px-4 py-3 font-mono text-xs text-purple-300 font-bold uppercase tracking-widest text-left">
                SYSTEM SPECIFICATIONS
              </div>
              <div className="divide-y divide-white/10 font-mono text-xs text-left">
                <div className="flex divide-x divide-white/10">
                  <div className="w-1/3 bg-white/5 px-4 py-3 text-purple-300 font-semibold">STATUS</div>
                  <div className="w-2/3 px-4 py-3 text-white">Class 10th Student</div>
                </div>
                <div className="flex divide-x divide-white/10">
                  <div className="w-1/3 bg-white/5 px-4 py-3 text-purple-300 font-semibold">FOCUS</div>
                  <div className="w-2/3 px-4 py-3 text-white">AI / ML Architectures</div>
                </div>
                <div className="flex divide-x divide-white/10">
                  <div className="w-1/3 bg-white/5 px-4 py-3 text-purple-300 font-semibold">LOOKING FOR</div>
                  <div className="w-2/3 px-4 py-3 text-white">Remote Projects & Mentorship</div>
                </div>
                <div className="flex divide-x divide-white/10">
                  <div className="w-1/3 bg-white/5 px-4 py-3 text-purple-300 font-semibold">BIO KEY</div>
                  <div className="w-2/3 px-4 py-3 text-white">Self-Taught via AI Platforms</div>
                </div>
                <div className="flex divide-x divide-white/10">
                  <div className="w-1/3 bg-white/5 px-4 py-3 text-purple-300 font-semibold">LOCATION</div>
                  <div className="w-2/3 px-4 py-3 text-white">Pune, Maharashtra</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= SKILLS SECTION ================= */}
      <section id="skills" className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-b border-white/5">
        <ScrollReveal className="text-center mb-12">
          <p className="font-mono text-xs text-purple-400 tracking-widest uppercase mb-1">
            Sheet 04 — Component Stack
          </p>
          <h3 className="font-display text-2xl md:text-4xl font-semibold text-white tracking-tight">
            The Architect's Toolkit
          </h3>
          <p className="font-sans text-xs md:text-sm text-zinc-500 max-w-md mx-auto mt-2">
            Diverse technologies, libraries, and AI systems mastered through focused self-study.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((cat, idx) => (
            <ScrollReveal
              key={cat.title}
              delay={idx * 0.1}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300 shadow-xl"
            >
              {/* Card top row */}
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-purple-300 shadow-inner">
                  {cat.icon === "code" && <CodeIcon size={22} />}
                  {cat.icon === "brain" && <Brain size={22} />}
                  {cat.icon === "globe" && <Globe size={22} />}
                </div>
                <span className="font-mono text-[10px] text-zinc-500 tracking-widest">
                  0{idx + 1} / STACK
                </span>
              </div>

              {/* Title */}
              <h4 className="font-display text-lg font-semibold text-white mb-2 text-left">
                {cat.title}
              </h4>
              <p className="font-sans text-xs text-zinc-500 mb-6 text-left">
                {cat.title === "Languages" && "Drafting core algorithms, data processing scripts, and structural code."}
                {cat.title === "AI Tools & Platforms" && "Leveraging powerful LLM agents, dynamic prompts, and vision analysis."}
                {cat.title === "Backend & Web" && "Configuring web endpoints, server logic, databases, and version controls."}
              </p>

              {/* Stack Chips */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ================= PROJECTS SECTION ================= */}
      <section id="projects" className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-b border-white/5">
        <ScrollReveal className="text-center mb-12">
          <p className="font-mono text-xs text-purple-400 tracking-widest uppercase mb-1">
            Sheet 05 — Product Build Logs
          </p>
          <h3 className="font-display text-2xl md:text-4xl font-semibold text-white tracking-tight">
            Selected Digital Architecture
          </h3>
          <p className="font-sans text-xs md:text-sm text-zinc-500 max-w-md mx-auto mt-2">
            Real products and designs built by combining web technologies and AI models.
          </p>
        </ScrollReveal>

        {/* Project grid using custom TiltCard wrapper and ParallaxImage inside */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <TiltCard className="flex flex-col h-full cursor-pointer" id={`card-${project.id}`}>
                <div onClick={() => setSelectedProject(project)}>
                  {/* Thumbnail container with Parallax Image */}
                  <div className="relative h-48 md:h-56 w-full rounded-lg overflow-hidden mb-5">
                    <ParallaxImage src={project.image} alt={project.title} />
                    
                    {/* Status Chip overlay */}
                    {project.status && (
                      <div className="absolute top-4 right-4 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-[10px] font-bold tracking-tighter uppercase px-3 py-1 rounded-md flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                        <span className="font-mono text-[10px] text-white font-semibold uppercase tracking-wider">
                          {project.status}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="text-left flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h4 className="font-display text-xl font-bold text-white mb-2 hover:text-purple-300 transition-colors">
                      {project.title}
                    </h4>
                    <p className="font-sans text-xs text-zinc-400 mb-6 flex-1 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Bottom controls */}
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                      <span className="text-purple-300 font-mono text-[10px] uppercase tracking-widest flex items-center gap-1 group-hover:text-white transition-colors">
                        Details
                        <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                      {project.github && project.github !== "#" && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-zinc-500 hover:text-purple-300 transition-colors p-1"
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ================= TIMELINE / JOURNEY SECTION ================= */}
      <section id="journey" className="py-20 px-6 max-w-3xl mx-auto relative z-10 border-b border-white/5">
        <ScrollReveal className="text-center mb-16">
          <p className="font-mono text-xs text-purple-400 tracking-widest uppercase mb-1">
            Sheet 06 — Historical Timeline
          </p>
          <h3 className="font-display text-2xl md:text-4xl font-semibold text-white tracking-tight">
            The Timeline Path
          </h3>
          <p className="font-sans text-xs md:text-sm text-zinc-500 max-w-sm mx-auto mt-2">
            A linear map tracking major coding pivots, studies, and engineering updates.
          </p>
        </ScrollReveal>

        {/* Timeline body with progressive scroll line */}
        <div className="relative border-l border-white/10 pl-8 space-y-12 text-left">
          {timeline.map((item, idx) => (
            <ScrollReveal key={item.period} delay={idx * 0.15} className="relative">
              {/* Little circle node indicator on the timeline bar */}
              <div className="absolute -left-[38px] top-1.5 w-4 h-4 rounded-full bg-[#020205] border-2 border-purple-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              </div>

              {/* Content box */}
              <div>
                <span className="font-mono text-xs text-purple-400 font-semibold tracking-wider">
                  {item.period}
                </span>
                <h4 className="font-display text-lg font-bold text-white mt-1 mb-2">
                  {item.title}
                </h4>
                <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-12">
          <p className="font-mono text-xs text-purple-400 tracking-widest uppercase mb-1">
            End Sheets — Get In Touch
          </p>
          <h3 className="font-display text-2xl md:text-4xl font-semibold text-white tracking-tight">
            Establish Connection
          </h3>
          <p className="font-sans text-xs md:text-sm text-zinc-500 max-w-md mx-auto mt-2">
            Currently looking for remote AI/ML mentorship, internships, or development collaborations.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          {/* Column 1: Info and direct links */}
          <div className="lg:col-span-5 text-left space-y-6">
            <ScrollReveal className="text-zinc-400 text-sm leading-relaxed font-sans">
              <p>
                Whether you have an interesting remote research proposal, want to collaborate on open-source AI projects, or are open to providing technical mentorship to a dedicated high schooler, I would love to talk!
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="space-y-3 font-mono text-xs">
              <a
                href={`mailto:${identity.email}`}
                className="flex justify-between items-center p-3 border border-white/10 rounded-xl hover:border-purple-500/30 bg-white/5 hover:bg-white/10 transition-all text-white group"
              >
                <span className="flex items-center gap-2">
                  <Mail size={14} className="text-purple-400" />
                  EMAIL
                </span>
                <span className="text-zinc-500 group-hover:text-purple-300 transition-colors">
                  {identity.email}
                </span>
              </a>

              <a
                href="https://github.com/kishor-choudhary"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center p-3 border border-white/10 rounded-xl hover:border-purple-500/30 bg-white/5 hover:bg-white/10 transition-all text-white group"
              >
                <span className="flex items-center gap-2">
                  <Github size={14} className="text-purple-400" />
                  GITHUB
                </span>
                <span className="text-zinc-500 group-hover:text-purple-300 transition-colors">
                  @kishor-choudhary
                </span>
              </a>

              <div className="flex justify-between items-center p-3 border border-white/10 rounded-xl bg-white/5 text-white">
                <span className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-purple-400" />
                  DISCORD
                </span>
                <span className="text-zinc-500 font-bold">{identity.discord}</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Column 2: Elegant micro-contact prompt */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.2} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-left">
              <div className="flex items-center gap-2 mb-4">
                <Flame size={16} className="text-purple-400 animate-pulse" />
                <span className="font-mono text-xs text-zinc-300 uppercase tracking-widest font-bold">Let's Build Something New!!</span>
              </div>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed mb-6">
                Feel free to directly send an email. I monitor my inbox closely and will respond as quickly as my Class 10 school timetable permits!
              </p>
              
              <a
                href={`mailto:${identity.email}?subject=Collaboration%20Proposal`}
                className="w-full inline-block"
              >
                <RippleButton className="w-full">
                  Shoot Collaboration Email <ArrowRight size={14} className="inline ml-1" />
                </RippleButton>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="w-full px-6 md:px-12 py-8 border-t border-white/5 bg-[#020205] relative z-10 text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <span>© 2026 Kishor Choudhary</span>
          <span>Sirohi to Pune • Built with code & coffee</span>
          <span>Discord: kishor.dev</span>
        </div>
      </footer>

      {/* ================= PROJECT MODAL DRAWER ================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 cursor-pointer"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#020205]/95 border border-white/10 rounded-3xl w-full max-w-2xl p-6 md:p-8 cursor-default shadow-2xl relative overflow-hidden text-left backdrop-blur-2xl"
            >
              {/* Glowing decorative purple leak */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* Large Image inside Detail Modal */}
              <div className="h-48 md:h-64 w-full rounded-xl overflow-hidden mb-6 border border-white/10">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Deep Details */}
              <div className="space-y-4 text-zinc-300 font-sans text-sm leading-relaxed max-h-[180px] overflow-y-auto pr-1">
                <p>{selectedProject.extendedDescription || selectedProject.description}</p>
              </div>

              {/* Footer CTA panel */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-white/10">
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCode size={14} className="text-purple-400" />
                  ID: {selectedProject.id}
                </span>

                <div className="flex gap-3">
                  <RippleButton onClick={() => setSelectedProject(null)}>
                    Done
                  </RippleButton>
                  {selectedProject.github && selectedProject.github !== "#" && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TraceButton>
                        <Github size={12} className="inline mr-1" /> Code repo
                      </TraceButton>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
