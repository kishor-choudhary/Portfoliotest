import { Project, SkillCategory, TimelineItem, StatItem } from "./types";

export const identity = {
  name: "Kishor Choudhary",
  tagline: "Building Something New!!",
  role: "Aspiring AI/ML Engineer",
  subRole: "Class 10th Student & Self-Taught Developer",
  location: "Pune, Maharashtra (originally from Sirohi, Rajasthan)",
  email: "kishorchoudhary395395@gmail.com",
  altEmail: "kishorchoudhary1573@gmail.com",
  github: "github.com/kishor-choudhary",
  linkedin: "Kishor Choudhary",
  discord: "kishor.dev",
  bio: "Went from wanting to be a Chartered Accountant to falling in love with code after discovering Minecraft development in 8th grade. Self-taught HTML, SQL, Python basics, and C++ through 10th grade. Loves understanding how things work under the hood and building things that feel genuinely cool. Currently focused on AI/ML, building real-world projects with AI-assisted tools, and looking to intern or collaborate remotely on AI/ML work while continuing school.",
};

export const stats: StatItem[] = [
  { label: "Projects Built", value: 4 },
  { label: "Languages Learned", value: 4 },
  { label: "Self-Study Hours", value: 850, suffix: "+" },
  { label: "Grade in School", value: 10, suffix: "th" },
];

export const skills: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["HTML", "C++", "SQL", "Python (Learning)"],
    icon: "code",
  },
  {
    title: "AI Tools & Platforms",
    skills: [
      "Google AI Studio",
      "Claude / Anthropic API",
      "Antigravity Agent",
      "Local / Offline Models",
    ],
    icon: "brain",
  },
  {
    title: "Backend & Web",
    skills: ["Flask", "SQLite", "TSX (React)", "Git & GitHub"],
    icon: "globe",
  },
];

export const projects: Project[] = [
  {
    id: "P-01",
    title: "Fresh Faces Family Salon",
    description:
      "Full salon website featuring an admin customizable board, an AI-based face-shape hairstyle analyzer, an interactive AI assistant, and a golden-black theme with haircutting animations.",
    extendedDescription:
      "A complete commercial website for a salon featuring an admin panel to customize every section. It includes an innovative AI-based face-shape analysis tool that suggests matching hairstyles, a fully custom-trained AI customer support assistant, integrated live Google reviews, and a premium dark-golden design with specialized tool animations.",
    github: "https://github.com/kishor-choudhary/freshfacesfamilysalon",
    tags: ["TSX", "Tailwind", "Google AI Studio", "GSAP"],
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
    status: "Live & Active",
  },
  {
    id: "P-02",
    title: "Akinator Character Guesser",
    description:
      "A character-guessing web game with an Instagram-style authentication system and automatic shareable result card generator.",
    extendedDescription:
      "A Python and Flask-backed guessing game utilizing SQLite for data storage. It features a modern, visually appealing login interface inspired by Instagram and triggers a customized, shareable result card showcasing correct guesses to social media.",
    github: "#", // Needs fixing as per brief
    tags: ["Python", "Flask", "SQLite", "Tailwind"],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
    status: "Completed",
  },
  {
    id: "P-03",
    title: "SVIT Pune Website Redesign",
    description:
      "A comprehensive visual and structural redesign of svispune.in, created for fun to demonstrate modern UI/UX paradigms.",
    extendedDescription:
      "A complete structural and visual overhaul of the official SVIT Pune institution website. Built for fun, it features fluid grid layouts, high-performance animations, optimized image loads, and an elegant professional navy-slate design schema.",
    github: "https://github.com/kishor-choudhary/svispuneredesign",
    tags: ["HTML", "CSS", "JS", "Redesign"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    status: "Fun Project",
  },
  {
    id: "P-04",
    title: "WhatsApp Mail Forwarder",
    description:
      "An automated assistant bot to forward emails directly to a WhatsApp contact, currently in active development.",
    extendedDescription:
      "A productivity automation bot that monitors incoming emails and forwards relevant updates to WhatsApp contacts. Built in Python, it is a work in progress that is being actively redesigned to improve connection reliability.",
    tags: ["Python", "Twilio API", "Automation", "WIP"],
    image: "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&q=80&w=800",
    status: "In Progress",
  },
];

export const timeline: TimelineItem[] = [
  {
    period: "8th Std (Minecraft Dev Spark)",
    title: "The Coding Spark",
    description:
      "Discovered Minecraft development, which changed everything. Switched aspiration from becoming a Chartered Accountant to learning how digital worlds are made.",
  },
  {
    period: "8th – 10th Std",
    title: "Building the Fundamentals",
    description:
      "Self-taught HTML, SQL, Python fundamentals, and C++ alongside standard school curriculum. Deepened understanding of logic flows and backend persistence.",
  },
  {
    period: "10th Std (Now)",
    title: "Shipping Real Projects with AI",
    description:
      "Leveraging advanced AI-assisted systems (Google AI Studio, Claude) to build and deploy actual web products like a salon commerce platform, Akinator game clone, and university redesign.",
  },
];
